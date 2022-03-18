import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { baseURL } from "../utils/api";
import Toasty from "../utils/toast";
let appointmentidd = "";
const RescheduleAppointment = ({ match, history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [appointmentDetails, setappointmentDetails] = useState();
  const [notificationDetails, setnotificationDetails] = useState();
  const [loading, setloading] = useState(false);
  const [booking, setbooking] = useState();
  const [selectedtime, setselectedtime] = useState("");

  useEffect(() => {
    getNotificationDetails();
  }, []);

  const getNotificationDetails = async () => {
    console.log("courseid");
    try {
      const res = await axios({
        url: `${baseURL}/notification/notificationDetails/${match?.params?.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });
      console.log(
        "courseDetailsres",
        res,
        res?.data?.notification?.notifiableId
      );
      getAppointmentDetails(res?.data?.notification?.notifiableId);
      setnotificationDetails(res?.data?.notification?._id);
      setbooking(res?.data?.booking);
    } catch (error) {
      Toasty("error", `Something went wrong`);
    }
  };

  const getAppointmentDetails = async (id) => {
    console.log("courseid", id);
    try {
      const res = await axios({
        url: `${baseURL}/appointment/appointmentDetails/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });
      console.log("courseDetailsres", res);
      setappointmentDetails(res?.data?.appointment);
    } catch (error) {
      Toasty("error", `Something went wrong`);
    }
  };
  const rescheduleTimeHandler = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };
      setloading(true);
      console.log("beforehit");
      const res = await axios.post(
        `${baseURL}/appointment/updatetime`,
        {
          notificationid: notificationDetails,
          time: JSON.parse(selectedtime),
          appointmentid: appointmentDetails?._id
        },
        config
      );
      setloading(true);

      console.log("res", res);
      if (res?.status == 201) {
        Swal.fire({
          icon: "success",
          title: "",
          text: "Reschedule time updated successfully",
          showConfirmButton: false,
          timer: 1500
        });
        history?.push("/Profile");
      }
    } catch (error) {
      setloading(true);

      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Internal Server Error",
        showConfirmButton: false,
        timer: 1500
      });
    }
    setloading(true);
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
                            <Link to="/Profile">
                              <i
                                style={{ color: "black" }}
                                className="fas fa-chevron-left"
                              />{" "}
                            </Link>
                            Reschedule Appointment
                          </h1>

                          <div className="clearfix" />
                          <div className="dash-card-inner mt-4">
                            <form>
                              <div className="row ">
                                <div className="col-12 mt-2 userss">
                                  <label className="all-label2 mb-1">
                                    Course:
                                  </label>
                                  <p>
                                    {appointmentDetails?.courseid?.coursetitle}
                                  </p>
                                </div>
                              </div>
                              <div className="row ">
                                <div className="col-lg-6 mt-2">
                                  <label className="all-label2 mb-1">
                                    Date:
                                  </label>
                                  <p>
                                    {moment
                                      .utc(
                                        appointmentDetails?.courseid
                                          ?.appointmentdate
                                      )
                                      .format("LL")}
                                  </p>
                                </div>
                                <div className="col-lg-6 mt-2">
                                  <label className="all-label2 mb-1">
                                    Time:
                                  </label>
                                  <select
                                    name="time"
                                    id
                                    className="all-input w-100 mb-0"
                                    value={selectedtime}
                                    onChange={(event) =>
                                      setselectedtime(event.target.value)
                                    }
                                  >
                                    <option>select</option>
                                    {booking?.time?.length > 0 &&
                                      booking?.time?.map((bok) => (
                                        <option
                                          value={JSON.stringify(bok?.time)}
                                        >
                                          {bok?.time}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                              </div>

                              <div className="row ">
                                <div className="col-12 mt-2 userss">
                                  <label className="all-label2 mb-1 d-block">
                                    Appointment Type:
                                  </label>
                                  {appointmentDetails?.type}
                                </div>
                                <div className="col-12 mt-2 userss">
                                  <label className="all-label2 mb-1 d-block">
                                    Description:
                                  </label>
                                  <p>{appointmentDetails?.description}</p>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12 text-center mt-3">
                                  {!loading ? (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        selectedtime?.length > 0
                                          ? rescheduleTimeHandler()
                                          : Toasty(
                                              "error",
                                              `Please fill out all the required fields!`
                                            )
                                      }
                                      className="green-btn"
                                    >
                                      Submit
                                    </button>
                                  ) : (
                                    <i className="fas fa-spinner fa-pulse"></i>
                                  )}
                                </div>
                              </div>
                            </form>
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

export default RescheduleAppointment;
