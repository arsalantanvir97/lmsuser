import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../utils/api";
import { useSelector, useDispatch } from "react-redux";
import Toasty from "../utils/toast";
import templateHTML from "../utils/templateHTML";
import Swal from "sweetalert2";
let courseid = "";
const Lectures = () => {
  const [registeredCourses, setregisteredCourses] = useState();
  const [coursedetails, setcoursedetails] = useState();
  const [loading, setloading] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    courseid = "";
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
        params: { userid: userInfo?._id },
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
  const generateCertificateHandler = async (reg) => {
    console.log("generateCertificateHandler");
    try {
      if (reg?.certificategenerated == true) {
        await Swal.fire({
          icon: "info",
          title: "",
          text: `Certificate Already Generated`,
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        setloading(true);
        const res = await axios.post(
          `${baseURL}/user/generateCertificate`,
          {
            email: reg?.userid?.email,
            reg: reg
          },
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`
            }
          }
        );
        setloading(false);

        console.log("res", res);
        Swal.fire({
          icon: "success",
          title: "",
          text: `Certificate has been sent been sent to ${reg?.userid?.email} email`,
          showConfirmButton: false,
          timer: 1500
        });
      }
      setloading(false);

      window?.location?.reload();
    } catch (error) {
      setloading(false);

      console.log("err", error);
    }
    setloading(false);
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
                            size={2}
                            // style={{minWidth:'100%'}}
                            className="form-control"
                            value={courseid}
                            onChange={(e) => {
                              courseid = e.target.value;
                              courseDetails();
                            }}
                          >
                            <option>select</option>
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
                              to={`/ViewLecture${coursedetails?.courseid?._id}`}
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
                                  <Link
                                    className="nav-link"
                                    id="pills-lectures-tab"
                                    data-toggle="pill"
                                    to={`/ViewLecture${coursedetails?.courseid?._id}`}
                                    role="tab"
                                    aria-controls="pills-lectures"
                                    aria-selected="false"
                                  >
                                    Lectures
                                  </Link>
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
                                  {coursedetails?.certificate == true &&
                                  coursedetails?.certificategenerated ==
                                    false ? (
                                    <div className="row">
                                      <div className="col-12 text-center mt-5">
                                        {!loading ? (
                                          <Link
                                            to="#"
                                            onClick={() => {
                                              generateCertificateHandler(
                                                coursedetails
                                              );
                                            }}
                                            className="gren-btn d-inline-block"
                                          >
                                            Generate Certificate
                                          </Link>
                                        ) : (
                                          <i className="fas fa-spinner fa-pulse"></i>
                                        )}
                                      </div>
                                    </div>
                                  ) : null}
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
