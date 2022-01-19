import React, { useEffect, useState } from "react";
import { baseURL, imageURL } from "../utils/api";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import Pagination from "../components/Padgination";
import moment from "moment";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { LoaderName } from "react-awesome-loaders"

const RegistrationCourses = () => {
  let history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [registeredcourses, setregisteredcourses] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    handleGetQuizzes();
  }, [page, perPage, from, to, status, searchString]);

  const handleGetQuizzes = async () => {
    try {
      const res = await axios({
        url: `${baseURL}/registeredCourses/userRegisteredcourseslogs`,
        method: "GET",
        params: {
          userid: userInfo?._id,
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

      console.log("res", res);
      setregisteredcourses(res.data?.registeredcourses);
    } catch (err) {
      console.log("err", err);
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
                      <h1 className="main-heading">Registered Courses</h1>
                      <div className="clearfix" />
                      <div className="row mt-1">
                        <div className="col-lg-6 col-12">
                          <div className="d-flex align-items-center">
                            <p className="l-grey source f-20 d-lg-inline-block">
                              Sort By:
                            </p>
                            <div className="ml-2">
                              <div
                                role="wrapper"
                                className="gj-datepicker gj-datepicker-bootstrap gj-unselectable input-group"
                              >
                                <DatePicker
                                  selected={from}
                                  onChange={(from) => setFrom(from)}
                                  className="sort-date customdate form-control"
                                />
                              </div>
                            </div>
                            <div className="ml-2">
                              <div
                                role="wrapper"
                                className="gj-datepicker gj-datepicker-bootstrap gj-unselectable input-group"
                              >
                                <DatePicker
                                  selected={to}
                                  onChange={(to) => setTo(to)}
                                  className="sort-date customdate form-control"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="clearfix" />
                      <div className="maain-tabble">
                        <table className="table table-striped table-bordered ">
                          <thead>
                            <tr>
                              <th className="d-grey bold">S.No</th>
                              <th className="d-grey bold">Code</th>
                              <th className="d-grey bold">Course Title</th>
                              <th className="d-grey bold">Category</th>
                              <th className="d-grey bold">Date Registered</th>
                              <th className="d-grey bold">Valid Up To</th>
                              <th className="d-grey bold">Status</th>
                              <th className="d-grey bold">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {registeredcourses?.docs?.length > 0 &&
                              registeredcourses?.docs?.map((reg, index) => (
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>{reg?.courseid?.coursecode}</td>
                                  <td>{reg?.courseid?.coursetitle}</td>
                                  <td>{reg?.courseid?.coursetitle}</td>
                                  <td>
                                    {" "}
                                    {moment.utc(reg?.createdAt).format("LL")}
                                  </td>
                                  <td>
                                    {moment.utc(reg?.expiryDate).format("LL")}
                                  </td>
                                  <td>
                                    <p className="clr-orange">Pending</p>
                                  </td>
                                  <td>
                                    <p className="dark-blue">View Lectures</p>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
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
  );
};

export default RegistrationCourses;
