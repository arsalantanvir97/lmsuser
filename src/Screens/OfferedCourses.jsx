import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL, imageURL } from "../utils/api";
import moment from "moment";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
let coursesss = [];

const OfferedCourses = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [groupedCourses, setgroupedCourses] = useState([]);
  const [groupedcoursedata, setgroupedcoursedata] = useState([]);
  const [registeredCourses, setregisteredCourses] = useState([]);

  useEffect(() => {
    handleGetGroupedCourses();
    handleGetRegisteredCourses();
  }, []);

  const handleGetGroupedCourses = async () => {
    try {
      const res = await axios({
        url: `${baseURL}/course/groupedCourses`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });
      console.log("res", res);
      setgroupedCourses(res?.data?.categoryCourses);
      setgroupedcoursedata(res?.data?.categoryCourses);
    } catch (err) {
      console.log(err);
    }
  };
  const handleGetRegisteredCourses = async () => {
    try {
      const res = await axios({
        url: `${baseURL}/registeredCourses/getallResgisteredCoursesofUser`,
        method: "POST",
        data: { id: userInfo?._id },
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });
      console.log("res", res);
      setregisteredCourses(res?.data?.registeredcourses);
      res?.data?.registeredcourses?.length > 0 &&
        res?.data?.registeredcourses?.map(async (regis) => {
          coursesss.push(regis?.courseid?._id);
        });
      console.log("coursesss", coursesss);
    } catch (err) {
      console.log(err);
    }
  };

  const checkAlreadyRegisteredHandler = async (id) => {
    console.log("checkAlreadyRegisteredHandler");

    if (coursesss?.includes(id)) {
      await Swal.fire({
        icon: "info",
        title: "",
        text: `Course Already Registered`,
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      history?.push(`/CourseDetails${id}`);
    }
    // else if (regis?.courseid?._id !== id) {
    //   console.log("pushblock");
    //   history?.push(`/CourseDetails${id}`);
    // }
  };
  const categoryFilterHandler = async (id) => {
    try {
      const res = await axios({
        url: `${baseURL}/course/categoryfiltergroupedCourses/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });
      console.log("res", res);
      setgroupedCourses(res?.data?.categoryCourses);
    } catch (err) {
      console.log(err);
    }
  };
  return (
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
                        <h1 className="main-heading">Offered Courses</h1>
                        <div className="clearfix" />
                        <div className="mt-2">
                          <select
                            name
                            id
                            size={2}

                            className="genaral-select"
                            onChange={(e) => {
                              categoryFilterHandler(e.target.value);
                            }}
                          >
                            <option value>select</option>
                            {/* <option value>All</option> */}
                            {groupedcoursedata?.length > 0 &&
                              groupedcoursedata?.map((reg) => (
                                <option value={reg?.category?._id}>
                                  {reg?.category?.name}
                                </option>
                              ))}
                          </select>
                        </div>
                        {groupedCourses?.map((group) => (
                          <div className="dash-card-inner ">
                            <div className="row">
                              <div className="col-lg-6 mb-3 mt-lg-5 mt-2">
                                <h2 className="course-heading">
                                  {" "}
                                  {group?.category?.name}
                                </h2>
                              </div>
                            </div>
                            <div className="row">
                              {group?.groupedata?.map((groupdata) => (
                                <div className="col-lg-4 mt-2">
                                  <Link
                                    onClick={() => {
                                      checkAlreadyRegisteredHandler(
                                        groupdata?._id
                                      );
                                    }}
                                    to="#"
                                    // to={`/CourseDetails${groupdata?._id}`}
                                  >
                                    <img
                                      src={
                                        groupdata?.images?.length > 0
                                          ? `${imageURL}${groupdata?.images?.[0]}`
                                          : "images/course-3.png"
                                      }
                                      alt=""
                                      className="course-thumbnail w-100 img-fluid"
                                    />{" "}
                                  </Link>
                                  <h3 className="course-title">
                                    {" "}
                                    {groupdata?.coursetitle}
                                  </h3>
                                  <p className="course-description">
                                    {groupdata?.coursedescription}
                                  </p>
                                </div>
                              ))}
                            </div>
                            {/* <div className="row">
                              <div className="col-12 text-center mt-lg-5 mt-3">
                                <a
                                  href="course-detail.php"
                                  className="d-inline-block gren-btn"
                                >
                                  View More
                                </a>
                              </div>
                            </div> */}
                          </div>
                        ))}
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
  );
};

export default OfferedCourses;
