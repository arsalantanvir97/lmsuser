import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseURL, imageURL } from "../utils/api";
import { useSelector } from "react-redux";
import Toasty from "../utils/toast";
import Pagination from "../components/Padgination";

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

  useEffect(() => {
    getQuizHandler();
  }, [page, perPage, from, to, status, searchString]);

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
    } catch (error) {
      Toasty("error", `Something went wrong`);
    }
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
                                   {quiz?.quizinfo?.length>0 && quiz?.quizinfo?.map(quizzz=>(
                                    <div className="row mt-2 mx-0 pb-2">
                                      <div className="col-12 mt-2">
                                        <div className="d-flex">
                                          <label htmlFor className="question">
                                            Q3:
                                          </label>
                                          <div className="ml-1">
                                            <p className="question">
                                             {quizzz?.quizquestion}
                                            </p>
                                            <div className="mt-3">
                                              <p className="mt-1">
                                                <input
                                                  type="radio"
                                                  id="test10"
                                                  name="radio-group"
                                                />
                                                <label
                                                  htmlFor="test10"
                                                  className="question-label"
                                                >
                                                  Option A
                                                </label>
                                              </p>
                                              <p className="mt-1">
                                                <input
                                                  type="radio"
                                                  id="test11"
                                                  name="radio-group"
                                                />
                                                <label
                                                  htmlFor="test11"
                                                  className="question-label"
                                                >
                                                  Option C
                                                </label>
                                              </p>
                                              <p className="mt-1">
                                                <input
                                                  type="radio"
                                                  id="test12"
                                                  name="radio-group"
                                                />
                                                <label
                                                  htmlFor="test12"
                                                  className="question-label"
                                                >
                                                  Option C
                                                </label>
                                              </p>
                                              <p className="mt-1">
                                                <input
                                                  type="radio"
                                                  id="test13"
                                                  name="radio-group"
                                                />
                                                <label
                                                  htmlFor="test13"
                                                  className="question-label"
                                                >
                                                  Option D
                                                </label>
                                              </p>
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
                                          data-toggle="modal"
                                          data-target="#correct-quiz"
                                        >
                                          Submit
                                        </button>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </>
                            ))}
                          {quizzes?.docs?.length > 0 && (
                            <Pagination
                              totalDocs={quizzes?.totalDocs}
                              totalPages={quizzes?.totalPages}
                              currentPage={quizzes?.page}
                              setPage={setPage}
                              hasNextPage={quizzes?.hasNextPage}
                              hasPrevPage={quizzes?.hasPrevPage}
                            />
                          )}
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

      <div
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
      </div>
    </>
  );
};

export default TakeQuiz;
