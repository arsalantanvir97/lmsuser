import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL, imageURL } from "../utils/api";
import moment from "moment";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const OfferedCourses = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [groupedCourses, setgroupedCourses] = useState([]);

  useEffect(() => {
    handleGetGroupedCourses();
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
                          <select name id className="genaral-select">
                            <option value>Select</option>
                            <option value>Category A</option>
                            <option value>Category B</option>
                          </select>
                        </div>
                        {groupedCourses?.map((group) => (
                          <div className="dash-card-inner ">
                            <div className="row">
                              <div className="col-lg-6 mb-3 mt-lg-5 mt-2">
                                <h2 className="course-heading">Category B</h2>
                              </div>
                            </div>
                            {group?.groupedata?.map((groupdata) => (
                              <div className="row">
                                <div className="col-lg-4 mt-2">
                                  <Link to={`/CourseDetails${groupdata?._id}`}>
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
                              </div>
                            ))}
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
