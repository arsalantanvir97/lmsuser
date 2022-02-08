import React, { useEffect, useState } from "react";
import { baseURL, imageURL } from "../utils/api";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import Pagination from "../components/Padgination";
import moment from "moment";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { LoaderName } from "react-awesome-loaders";
import { createCall } from "../config/vox";

const Appointments = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [userappointments, setuserappointments] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    handleGetUserAppointments();
  }, [page, perPage, from, to, status, searchString]);

  const handleGetUserAppointments = async () => {
    try {
      const res = await axios({
        url: `${baseURL}/appointment/userAppointmentlogs`,
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
      setuserappointments(res.data?.appointment);
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
                      <h1 className="main-heading">Appointments</h1>
                      <div className="clearfix" />
                      <div className="row">
                        <div className="col-12 text-right my-2">
                          <Link
                            to="/RequestNewAppointment"
                            className="green-btn"
                          >
                            Request New Appointment
                          </Link>
                        </div>
                      </div>
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
                              <th className="d-grey bold">Course Code</th>
                              <th className="d-grey bold">Course Title</th>
                              <th className="d-grey bold">Date</th>
                              <th className="d-grey bold">Appointment Time</th>
                              <th className="d-grey bold">Cost</th>
                              <th className="d-grey bold">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userappointments?.docs?.length > 0 &&
                              userappointments?.docs?.map((userapp, index) => (
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>{userapp?.courseid?.coursecode}</td>
                                  <td>{userapp?.courseid?.coursetitle}</td>
                                  <td> {userapp?.appointmentdate}</td>
                                  <td>{userapp?.appointmenttime}</td>
                                  <td>${userapp?.cost}</td>
                                  <td>
                                    <Link
                                      to={
                                        userapp?.status == "Pending"
                                          ? null
                                          : userapp?.type == "chat"
                                          ? "/ChatScreen"
                                          :   userapp?.type == "videocall"
                                          ? null:null
                                      }
                                    >
                                      <p className="accepted">
                                        {" "}
                                        {userapp?.status == "Pending"
                                          ? "Pending"
                                          : userapp?.status ==
                                            "Reschedule Request"
                                          ? "Reschedule Request"
                                          : userapp?.type == "audiocall"
                                          ? "Join Audio Call"
                                          : userapp?.type == "videocall"
                                          ? "Join Video Call"
                                          : userapp?.type == "chat"
                                          ? "Join Chat"
                                          : null}
                                      </p>
                                    </Link>
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

export default Appointments;
