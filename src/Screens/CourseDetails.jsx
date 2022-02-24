import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../utils/api";
import { useSelector, useDispatch } from "react-redux";
import Toasty from "../utils/toast";
import { useHistory } from "react-router-dom";

const CourseDetails = (props) => {
  let history = useHistory();
  const [course, setcourse] = useState();
  const [coursemonth, setcoursemonth] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    handleGetCourse();
  }, []);

  const handleGetCourse = async () => {
    try {
      const res = await axios({
        url: `${baseURL}/course/courseDetails/${props?.match?.params?.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });

      console.log("res", res);
      setcourse(res?.data?.course);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log("coursemonth", coursemonth);
  }, [coursemonth]);
  const redirectHandler = async () => {
    await history.push({
      pathname: "/CoursePayment",
      state: {
        id: course?._id,
        amount: coursemonth
      }
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
                            <h1 className="main-heading">
                          <Link to="/OfferedCourses">
                              <i style={{color:'black'}} className="fas fa-chevron-left mr-1" /> </Link>
                              Course Details
                            </h1>
                         
                          <div className="clearfix" />
                          <div className="dash-card-inner mt-4">
                            <p className="details-p">
                              {course?.coursedescription}
                            </p>
                            <div className="row">
                              <div className="col-12">
                                <h3 className="course-heading-3">
                                  Course Details
                                </h3>
                              </div>
                              <div className="col-lg-8">
                                <div className="row">
                                  <div className="col-lg-6 mt-2">
                                    <label htmlFor className="course-label">
                                      Course Title:
                                    </label>
                                    <p
                                      htmlFor
                                      className="d-inline-block course-label"
                                    >
                                      {course?.coursetitle}
                                    </p>
                                  </div>
                                  <div className="col-lg-6 mt-2">
                                    <label htmlFor className="course-label">
                                      Category:
                                    </label>
                                    <p
                                      htmlFor
                                      className="d-inline-block course-label"
                                    >
                                      {course?.coursecategory?.name}
                                    </p>
                                  </div>
                                </div>
                                <div className="row ">
                                  <div className="col-lg-6 mt-2">
                                    <label htmlFor className="course-label">
                                      Duration:
                                    </label>
                                    {course?.courseduration?.length > 0 &&
                                      course?.courseduration?.map(
                                        (course, index) => (
                                          <p className="mt-1 d-inline-block mr-3">
                                            <input
                                              type="radio"
                                              id={`test1${index}`}
                                              name="radio-group"
                                              value={JSON.stringify(
                                                coursemonth
                                              )}
                                              onChange={(e) => {
                                                setcoursemonth(course);
                                              }}
                                            />
                                            <label
                                              htmlFor={`test1${index}`}
                                              className="question-label"
                                            >
                                              {course?.month} month
                                            </label>
                                          </p>
                                        )
                                      )}
                                  </div>
                                  <div className="col-lg-6 mt-2">
                                    <label htmlFor className="course-label">
                                      Cost:
                                    </label>
                                    <p htmlFor className="question-label mt-1">
                                      ${coursemonth?.amount}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12">
                                <h3 className="course-heading-3">
                                  Description
                                </h3>
                                <p className="details-p">
                                  {course?.coursedescription}
                                </p>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12">
                                <h3 className="course-heading-3">
                                  Features of Course
                                </h3>
                                <p className="details-p">
                                  {course?.coursefeature}
                                </p>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12 text-center mt-5">
                                <button
                                  type="button"
                                  onClick={() =>
                                    coursemonth?.amount > 0
                                      ? redirectHandler()
                                      : Toasty(
                                          "error",
                                          `Please select course duration`
                                        )
                                  }
                                  className="gren-btn d-inline-block"
                                >
                                  Register Now
                                </button>
                              </div>
                            </div>
                          </div>
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
    </>
  );
};

export default CourseDetails;
