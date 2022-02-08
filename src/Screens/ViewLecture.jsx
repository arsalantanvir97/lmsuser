import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseURL, imageURL } from "../utils/api";
import { useSelector, useDispatch } from "react-redux";
import Toasty from "../utils/toast";
let courseid;
const ViewLecture = () => {
  const [registeredCourses, setregisteredCourses] = useState();
  const [coursedetails, setcoursedetails] = useState();
  const [lecturedetails, setlecturedetails] = useState();
  const [vidindex, setvidindex] = useState(0);
  const [showbutton, setshowbutton] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    getttingReisteredCourses();
  }, []);

  const getttingReisteredCourses = async () => {
    const res = await axios.post(
      `${baseURL}/registeredCourses/getallResgisteredCoursesofUser`,
      {
        id: userInfo?._id
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      }
    );
    console.log("res", res);
    setregisteredCourses(res?.data?.registeredcourses);
  };
  useEffect(() => {
    console.log("courseid", courseid);
  }, [courseid]);

  const courseDetails = async () => {
    console.log("courseid");
    try {
      const res = await axios({
        url: `${baseURL}/registeredCourses/registeredcoursesDetails/${courseid}`,
        params:{userid:userInfo?._id},
        method: "GET",
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });
      console.log("courseDetailsres", res);
      setcoursedetails(res?.data?.registeredCourse);
      lectureDetails();
    } catch (error) {
      Toasty("error", `Something went wrong`);
    }
  };

  const lectureDetails = async () => {
    console.log("courseid");
    try {
      const res = await axios({
        url: `${baseURL}/lecture/lectureDetailsbyCourseid/${courseid}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });
      console.log("setlecturedetails", res);
      setlecturedetails(res?.data?.lecture);
    } catch (error) {
      Toasty("error", `Something went wrong`);
    }
  };
  const myCallback = () => {
    console.log("Video has ended");
    setshowbutton(true);
  };
  useEffect(() => {
    console.log("vidindex", vidindex);
  }, [vidindex]);

  return (
    <div className="app-content content">
      <div className="content-wrapper">
        <div className="content-body">
          {/* Basic form layout section start */}
          <section id="configuration">
            <div className="row">
              <div className="col-12">
                <div className="card user-management">
                  <div className="card-content collapse show">
                    <div className="card-body table-responsive card-dashboard">
                      <h1 className="main-heading">Lectures</h1>
                      <div className="row my-2 ">
                        <div className="col-lg-3 userss">
                          <p className="label-value mb-1">Course</p>
                          <select
                            name
                            id
                            className="form-control"
                            value={courseid}
                            onChange={(e) => {
                              courseid = e.target.value;
                              courseDetails();
                            }}
                          >
                            <option value>select</option>
                            {registeredCourses?.length > 0 &&
                              registeredCourses?.map((reg) => (
                                <option value={reg?.courseid?._id}>
                                  {reg?.courseid?.coursetitle}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                      <div className="clearfix" />
                      {coursedetails?.createdAt?.length > 0 && (
                        <>
                          <div className="row">
                            <div className="col-12">
                              <h3 className="course-dtl">Course Details</h3>
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div className="col-lg-4">
                              <label htmlFor className="course-lbll mt-1">
                                Course Title:
                              </label>
                              <p className="course-vlue mt-1">
                                {coursedetails?.courseid?.coursetitle}
                              </p>
                            </div>
                            <div className="col-lg-4">
                              <label htmlFor className="course-lbll mt-1">
                                Charges:
                              </label>
                              <p className="course-vlue mt-1">
                                ${coursedetails?.cost}
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-4">
                              <label htmlFor className="course-lbll mt-1">
                                Duration:
                              </label>
                              <p className="course-vlue mt-1">
                                {coursedetails?.duration} Months
                              </p>
                            </div>
                            <div className="col-lg-4">
                              <label htmlFor className="course-lbll mt-1">
                                Category:
                              </label>
                              <p className="course-vlue mt-1">
                                {coursedetails?.courseid?.coursecategory?.name}{" "}
                                Category
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 mt-4">
                              <h3 className="course-dtl">Lecture Details</h3>
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div className="col-lg-4">
                              <label htmlFor className="course-lbll mt-1">
                                Lecture No:
                              </label>
                              <p className="course-vlue mt-1">
                                {lecturedetails?.length > 0 &&
                                  lecturedetails[0]?.lecturecode}
                              </p>
                            </div>
                            <div className="col-lg-4">
                              <label htmlFor className="course-lbll mt-1">
                                Lecture Title:
                              </label>
                              <p className="course-vlue mt-1">
                                {lecturedetails?.length > 0 &&
                                  lecturedetails[0]?.lecturetitle}
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-4">
                              <label htmlFor className="course-lbll mt-1">
                                Lecture Duration:
                              </label>
                              <p className="course-vlue mt-1">
                                {lecturedetails?.length > 0 &&
                                  lecturedetails[0]?.videoduration}{" "}
                                Mins
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 mt-2">
                              {lecturedetails?.length > 0 &&
                                lecturedetails[0]?.ad_video?.length > 0 && (
                                  <video
                                    onEnded={() => myCallback()}
                                    width="100%vw"
                                    height="440"
                                    controls
                                    src={`${imageURL}${
                                      lecturedetails?.length > 0 &&
                                      lecturedetails[vidindex]?.ad_video
                                    }`}
                                  >
                                    {/* <source
                                     
                                      type="video/ogg"
                                    /> */}
                                  </video>
                                )}
                            </div>
                          </div>
                          <div className="row">
                            {showbutton && (
                              <div className="col-lg-4 mt-2">
                                <Link
                                  to="#"
                                  onClick={() => {
                                    setvidindex(
                                      vidindex == 0 ? 0 : vidindex - 1
                                    );
                                    setshowbutton(vidindex == 0 ? true : false);
                                  }}
                                  className="gren-btn d-inline-block"
                                >
                                  Previous
                                </Link>
                              </div>
                            )}
                            {vidindex == lecturedetails?.length - 1 ?  showbutton &&(
                              <div className="col-lg-4 mt-2 text-lg-center">
                                <Link
                                  to={`/TakeQuiz${coursedetails?.courseid?._id}`}
                                  className={
                                    vidindex == lecturedetails?.length - 1
                                      ? "-btn-2 d-inline-block"
                                      : "disabled-btn-2 d-inline-block"
                                  }
                                >
                                  Take Quiz
                                </Link>
                              </div>
                            ):null}
                            {showbutton && (
                              <div className="col-lg-4 mt-2 text-lg-right">
                                <Link
                                  to="#"
                                  onClick={() => {
                                    setvidindex(
                                      vidindex == lecturedetails?.length - 1
                                        ? vidindex
                                        : vidindex + 1
                                    );
                                    setshowbutton(
                                      vidindex == lecturedetails?.length - 1
                                        ? true
                                        : false
                                    );
                                  }}
                                  className="gren-btn d-inline-block"
                                >
                                  Next
                                </Link>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                      {coursedetails?.createdAt?.length > 0 ? null : (
                        <div className="main-heading text-lg-center">
                          Please Select A Course
                        </div>
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
  );
};

export default ViewLecture;
