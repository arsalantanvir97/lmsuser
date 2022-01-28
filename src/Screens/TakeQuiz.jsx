import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseURL, imageURL } from "../utils/api";
import { useSelector } from "react-redux";
import Toasty from "../utils/toast";
import Pagination from "../components/Padgination";
import Swal from "sweetalert2";
import QuizItem from "./QuizItem";
import QuizPagination from "../components/QuizPagination";
let correctmarks = 0;
let countdown;
const TakeQuiz = ({ match }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [quizzes, setquizzes] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(1);
  const [searchString, setSearchString] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState("");
  const [enable, setenable] = useState(false);
  const [enablenextque, setenablenextque] = useState(false);

  const [inputfields, setInputfields] = useState([]);

  useEffect(() => {
    getQuizHandler();
  }, [page, perPage, from, to, status, searchString]);
  function countDownHandler2() {
    setenable(true);
    Swal.fire({
      icon: "info",
      title: "",
      text: "You ran out of time, Retake the Quiz",
      showConfirmButton: false,
      timer: 1500
    });
  }
  function countDownHandler() {
    setTimeout(countDownHandler2, countdown);
  }
  const getQuizHandler = async () => {
    console.log("courseid");
    try {
      const res = await axios({
        url: `${baseURL}/quiz/quizzCourseid/${match?.params?.id}`,
        method: "GET",
        params: {
          page,
          perPage,
          searchString,
          from,
          to,
          status
        },
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });
      console.log("setlecturedetails", res);
      setquizzes(res?.data?.quiz);
      countdown = res?.data?.quiz?.docs?.[0]?.quizduration * 60000;
      correctmarks=0
      countDownHandler();
    } catch (error) {
      Toasty("error", `Something went wrong`);
    }
  };
  const handlechangeinput = (index, event, value) => {
    console.log("event.target.value", event.target.value, value);
    const values = [...inputfields];
    values[index] = value;

    setInputfields(values);
  };
  useEffect(() => {
    console.log("inputfields", inputfields);
  }, [inputfields]);

  const submitQuizHandler = async () => {
    console.log("submitQuizHandler", quizzes?.docs?.[0]?.quizinfo?.length);

    quizzes?.docs?.[0]?.quizinfo?.length > 0 &&
      quizzes?.docs?.[0]?.quizinfo?.map((quizz, index) => {
        console.log("quizz", quizz, inputfields[index]);
        if (quizz?.correctanswer == inputfields[index]) {
          console.log("insideblock", index);
          correctmarks = correctmarks + quizz?.quizmarks;
          console.log("correctmarks", correctmarks);
        }
      });
    if (correctmarks >= quizzes?.docs?.[0]?.passingmarks) {
      setenablenextque(true);
      Swal.fire({
        icon: "success",
        title: "",
        text: `You have successfully cleared the quiz. You scored ${correctmarks} out of ${quizzes?.docs?.[0]?.totalmarks}`,
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      setenablenextque(false);
      await Swal.fire({
        icon: "error",
        title: "",
        text: `You did not clear the quiz. You scored ${correctmarks} out of ${quizzes?.docs?.[0]?.passingmarks}. Sorry! Please retake quiz`,
        showConfirmButton: false,
        timer: 1500
      });
     
    }
    setInputfields([]);
  };
  const alertHandler = () => {
    Swal.fire({
      icon: "info",
      title: "",
      text: "You have to clear this quiz to be attempt the next one",
      showConfirmButton: false,
      timer: 1500
    });
  };
  return (
    <>
      <section className="admin-profile">
        <div className="app-content content">
          <div className="content-wrapper">
            <div className="content-body">
              {/* Basic form layout section start */}
              <section id="configuration user-management">
                <div className="row">
                  <div className="col-12">
                    <div className="card jost pad-20 pb-5 px-lg-4 px-2">
                      <div className="card-content collapse show">
                        <div className="card-body table-responsive card-dashboard">
                          <div className="row">
                            <div className="col-12 text-center">
                              <h1 className="main-heading">Quiz</h1>
                            </div>
                          </div>
                          {quizzes?.docs?.length > 0 &&
                            quizzes?.docs?.map((quiz, index) => (
                              <>
                                <div className="row">
                                  <div className="col-12">
                                    <div className="passing-marks-div">
                                      <label htmlFor>Time:</label>
                                      <p className="d-inline-block mr-3">
                                        {quiz?.quizduration} Mins
                                      </p>
                                      <label htmlFor>Passing Marks:</label>
                                      <p className="d-inline-block">
                                        {quiz?.passingmarks}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="clearfix" />
                                <div className="dash-card-inner mt-4">
                                  <form>
                                    {quiz?.quizinfo?.length > 0 &&
                                      quiz?.quizinfo?.map((quizzz, index) => (
                                        <div className="row mt-2 mx-0 pb-2">
                                          <div className="col-12 mt-2">
                                            <div className="d-flex">
                                              <label
                                                htmlFor
                                                className="question"
                                              >
                                                Q{index + 1}:
                                              </label>
                                              <div className="ml-1">
                                                <p className="question">
                                                  {quizzz?.quizquestion}
                                                </p>
                                                <div className="mt-3">
                                                  <p className="mt-1">
                                                    <input
                                                      type="radio"
                                                      id={`test${
                                                        quizzz?.quizquestion + 1
                                                      }`}
                                                      checked={
                                                        inputfields[index] == 1
                                                          ? true
                                                          : false
                                                      }
                                                      name={`radio-group${quiz?.quizinfo?.length}`}
                                                      onChange={(event) =>
                                                        handlechangeinput(
                                                          index,
                                                          event,
                                                          1
                                                        )
                                                      }
                                                    />
                                                    <label
                                                      htmlFor={`test${
                                                        quizzz?.quizquestion + 1
                                                      }`}
                                                      className="question-label"
                                                    >
                                                      {quizzz?.quizoption1}
                                                    </label>
                                                  </p>
                                                  <p className="mt-1">
                                                    <input
                                                      type="radio"
                                                      id={`test${
                                                        quizzz?.quizquestion + 2
                                                      }`}
                                                      checked={
                                                        inputfields[index] == 2
                                                          ? true
                                                          : false
                                                      }
                                                      name={`radio-group${quiz?.quizinfo?.length}`}
                                                      onChange={(event) =>
                                                        handlechangeinput(
                                                          index,
                                                          event,
                                                          2
                                                        )
                                                      }
                                                    />
                                                    <label
                                                      htmlFor={`test${
                                                        quizzz?.quizquestion + 2
                                                      }`}
                                                      className="question-label"
                                                    >
                                                      {quizzz?.quizoption2}
                                                    </label>
                                                  </p>
                                                  <p className="mt-1">
                                                    <input
                                                      type="radio"
                                                      checked={
                                                        inputfields[index] == 3
                                                          ? true
                                                          : false
                                                      }
                                                      id={`test${
                                                        quizzz?.quizquestion + 3
                                                      }`}
                                                      name={`radio-group${quiz?.quizinfo?.length}`}
                                                      onChange={(event) =>
                                                        handlechangeinput(
                                                          index,
                                                          event,
                                                          3
                                                        )
                                                      }
                                                    />
                                                    <label
                                                      htmlFor={`test${
                                                        quizzz?.quizquestion + 3
                                                      }`}
                                                      className="question-label"
                                                    >
                                                      {quizzz?.quizoption3}
                                                    </label>
                                                  </p>
                                                  <p className="mt-1">
                                                    <input
                                                      type="radio"
                                                      checked={
                                                        inputfields[index] == 4
                                                          ? true
                                                          : false
                                                      }
                                                      id={`test${
                                                        quizzz?.quizquestion + 4
                                                      }`}
                                                      name={`radio-group${quiz?.quizinfo?.length}`}
                                                      onChange={(event) =>
                                                        handlechangeinput(
                                                          index,
                                                          event,
                                                          4
                                                        )
                                                      }
                                                    />
                                                    <label
                                                      htmlFor={`test${
                                                        quizzz?.quizquestion + 4
                                                      }`}
                                                      className="question-label"
                                                    >
                                                      {quizzz?.quizoption4}
                                                    </label>
                                                  </p>

                                                  {/* <QuizItem quizzz={quizzz} handlechangeinput={handlechangeinput} index={index}/> */}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    <div className="row">
                                      <div className="col-12 text-center mt-3">
                                        <button
                                          type="button"
                                          className="green-btn"
                                          disabled={enable ? true : false}
                                          onClick={() =>
                                            inputfields?.length ==
                                            quizzes?.docs?.[0]?.quizinfo?.length
                                              ? submitQuizHandler()
                                              : Toasty(
                                                  "error",
                                                  `Please answer all questions`
                                                )
                                          }
                                        >
                                          Submit
                                        </button>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </>
                            ))}
                            <QuizPagination
                              totalDocs={quizzes?.totalDocs}
                              totalPages={quizzes?.totalPages}
                              currentPage={quizzes?.page}
                              setPage={setPage}
                              enablenextque={enablenextque}
                              setenablenextque={setenablenextque}
                              alertHandler={alertHandler}
                              
                              hasNextPage={quizzes?.hasNextPage}
                              hasPrevPage={quizzes?.hasPrevPage}
                            />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* // Basic form layout section end */}
            </div>
          </div>
        </div>
      </section>

      {/* <div
        className="modal fade"
        id="retake-quiz"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered " role="document">
          <div className="modal-content">
            <button
              type="button"
              className="close text-right mr-1 mt-1"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
            <div className="pt-1 pb-5 text-center">
              <h2 className="modal-result">Result</h2>
              <h3 className="modal-correct">
                Correct Answers: <span className="ml-2">04</span> Out of 10
              </h3>
              <img src="images/retake.png" alt="" className="img-fluid" />
              <p className="modal-result">Sorry! Please retake quiz</p>
              <div className="text-center">
                <a
                  href="#_"
                  aria-label="Close"
                  data-dismiss="modal"
                  className="modal-btn"
                >
                  Retake Quiz
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="correct-quiz"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered " role="document">
          <div className="modal-content">
            <button
              type="button"
              className="close text-right mr-1 mt-1"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
            <div className="pt-1 pb-5 text-center">
              <h2 className="modal-result">Result</h2>
              <h3 className="modal-correct">
                Correct Answers: <span className="ml-2 correct-span">07</span>{" "}
                Out of 10
              </h3>
              <img src="images/correct.png" alt="" className="img-fluid" />
              <p className="modal-result">
                You have successfully <br />
                cleared the quiz
              </p>
              <div className="text-center">
                <a href="next-lecture.php" className="modal-btn">
                  Watch Next Video
                </a>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default TakeQuiz;
