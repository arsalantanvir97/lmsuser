import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../utils/api";
import { useSelector, useDispatch } from "react-redux";
import Toasty from "../utils/toast";
let courseid;
const Lectures = () => {
  const [registeredCourses, setregisteredCourses] = useState();
  const [coursedetails, setcoursedetails] = useState();

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
        method: "GET",
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });
      console.log("courseDetailsres", res);
      setcoursedetails(res?.data?.registeredCourse);
    } catch (error) {
      Toasty("error", `Something went wrong`);
    }
  };
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

                        <div className="col-lg-9 text-right">
                          {coursedetails?.createdAt?.length > 0 && (
                            <Link
                              to={`/ViewLecture/${coursedetails?._id}`}
                              className="gren-btn d-inline-block"
                            >
                              View Lectures
                            </Link>
                          )}
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
                                {coursedetails?.courseid?.coursecategory?.name}
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 mt-4">
                              <ul
                                className="nav nav-pills mb-3"
                                id="pills-tab"
                                role="tablist"
                              >
                                <li className="nav-item" role="presentation">
                                  <a
                                    className="nav-link active"
                                    id="pills-overview-tab"
                                    data-toggle="pill"
                                    href="#pills-overview"
                                    role="tab"
                                    aria-controls="pills-overview"
                                    aria-selected="true"
                                  >
                                    Course Overview
                                  </a>
                                </li>
                                <li className="nav-item" role="presentation">
                                  <a
                                    className="nav-link"
                                    id="pills-lectures-tab"
                                    data-toggle="pill"
                                    href="#pills-lectures"
                                    role="tab"
                                    aria-controls="pills-lectures"
                                    aria-selected="false"
                                  >
                                    Lectures
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <div
                                className="tab-content"
                                id="pills-tabContent"
                              >
                                <div
                                  className="tab-pane fade show active"
                                  id="pills-overview"
                                  role="tabpanel"
                                  aria-labelledby="pills-overview-tab"
                                >
                                  <div className="row">
                                    <div className="col-12">
                                      <h3 className="course-heading-3 mt-2">
                                        Description
                                      </h3>
                                      <p className="details-p">
                                        {
                                          coursedetails?.courseid
                                            ?.coursedescription
                                        }
                                      </p>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-12">
                                      <h3 className="course-heading-3">
                                        Features of Course
                                      </h3>
                                      <p className="details-p">
                                        {coursedetails?.courseid?.coursefeature}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-12 text-center mt-5">
                                      <a
                                        href="#_"
                                        className="gren-btn d-inline-block"
                                      >
                                        Generate Certificate
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    {coursedetails?.createdAt?.length > 0 ? null : (
                      <div className="main-heading text-lg-center">
                        Please Select A Course
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Lectures;
