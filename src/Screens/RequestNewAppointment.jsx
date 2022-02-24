import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { baseURL } from "../utils/api";
import DatePicker from "react-datepicker";
import Toasty from "../utils/toast";
import moment from "moment";
import Swal from "sweetalert2";
import StripeCheckout from "react-stripe-checkout";
import { SunspotLoader } from "react-awesome-loaders";

const RequestNewAppointment = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [allofcourses, setallofcourses] = useState([]);
  const [adminBooking, setadminBooking] = useState();
  const [requesttime, setrequesttime] = useState("");
  const [courseid, setcourseid] = useState("");
  const [type, settype] = useState("");
  const [requestdate, setrequestdate] = useState(null);
  const [costsetting, setcostsetting] = useState("");
  const [cost, setcost] = useState("");
  const [description, setdescription] = useState("");
  const [alreadyBooked, setalreadyBooked] = useState(true);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    handleGetCourses();
    handleGetAdminBooking();
    handleGetCostSetting();
  }, []);

  const handleGetCourses = async () => {
    try {
      const res = await axios({
        url: `${baseURL}/course/allCourses`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });
      console.log("res", res);
      setallofcourses(res?.data?.allCourses);
    } catch (err) {
      console.log(err);
    }
  };
  const handleGetAdminBooking = async () => {
    try {
      const res = await axios({
        url: `${baseURL}/booking/getBooking`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });
      console.log("res", res);
      setadminBooking(res?.data?.booking);
    } catch (err) {
      console.log(err);
    }
  };
  const handleGetCostSetting = async () => {
    try {
      const res = await axios({
        url: `${baseURL}/costsetting/getCostSetting`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });
      console.log("res", res);
      setcostsetting(res?.data?.costSetting);
    } catch (err) {
      console.log(err);
    }
  };

  const updateCostHandler = async (value) => {
    settype(value);
    setcost(
      value == "audiocall"
        ? costsetting?.audiocall
        : value == "chat"
        ? costsetting?.chat
        : value == "videocall"
        ? costsetting?.videocall
        : null
    );
  };
  useEffect(() => {
    console.log("requestdate", requestdate);
  }, [requestdate]);

  const onSubmitHandler = async () => {
    const res = await axios.post(
      `${baseURL}/booking/checkAlreadyBooked`,
      {
        requestdate: requestdate,
        requesttime
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      }
    );
    console.log("res", res);
    if (res?.status == 202) {
      Swal.fire({
        icon: "error",
        title: "",
        text: `${requesttime} is already booked. Please select another time.`,
        showConfirmButton: false,
        timer: 1500
      });
    } else if (res?.status == 201) {
      setalreadyBooked(false);
      Swal.fire({
        icon: "success",
        title: "",
        text: `Please pay to have an appointment booked with Admin`,
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  async function handleToken(token) {
    setloading(true);
    console.log("handleToken");
    const config = {
      header: {
        Authorization: "Bearer sk_test_OVw01bpmRN2wBK2ggwaPwC5500SKtEYy9V"
      }
    };
    const response = await axios.post(
      `${baseURL}/checkout`,
      { token, product: cost },
      config
    );
    console.log("response", response);
    const { status } = response.data;

    console.log(
      "res",
      response.data.id,
      response.data.status,
      response.headers.date,
      response.data.receipt_email
    );
    const res = await axios.post(
      `${baseURL}/appointment/createAppointment`,
      {
        userid: userInfo?._id,
        courseid,
        cost,
        appointmentdate: moment(requestdate).format("DD/MM/YYYY"),
        appointmenttime: requesttime,
        description,
        type
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      }
    );
    if (res?.status == 201) {
      setloading(false);
      Swal.fire({
        icon: "success",
        title: "",
        text: `Appointment made with Admin Succesfully`,
        showConfirmButton: false,
        timer: 1500
      });
      history.push("/Appointments");
    }
  }

  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-30%, -60%)",
            zIndex: 1111111111111
          }}
        >
          <SunspotLoader
            gradientColors={["#000"]}
            shadowColor={"#FFF"}
            desktopSize={"50px"}
            mobileSize={"35px"}
          />
        </div>
      )}
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
                          <Link to="/Appointments">
                              <i style={{color:'black'}}  className="fas fa-chevron-left" />  </Link> Request New
                              Appointment
                            </h1>
                        
                          <div className="clearfix" />
                          <div className="dash-card-inner mt-4">
                            <form>
                              <div className="row ">
                                <div className="col-12 mt-2 userss">
                                  <label className="all-label2 mb-1">
                                    Course:
                                  </label>
                                  <select
                                    name
                                    id
                                    className="all-input w-100 mb-0"
                                    value={courseid}
                                    onChange={(e) => {
                                      setcourseid(e.target.value);
                                    }}
                                  >
                                    <option value>Select</option>
                                    {allofcourses?.length > 0 &&
                                      allofcourses?.map((cours) => (
                                        <option value={cours?._id}>
                                          {cours?.coursetitle}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                              </div>
                              <div className="row ">
                                <div className="col-lg-6 mt-2">
                                  <label className="all-label2 mb-1">
                                    Date:
                                  </label>
                                  <DatePicker
                                    selected={requestdate}
                                    minDate={new Date()}
                                    placeholderText='Select a date'
                                    onChange={(requestdate) =>
                                      setrequestdate(requestdate)
                                    }
                                    className="sort-date customdate form-control"
                                  />
                                  <i
                                    className="fa enter-icon right-icon fas fa-calendar-alt"
                                    aria-hidden="true"
                                  />
                                  <p className="note-booking">
                                    <span>Note:</span>{" "}
                                    {(adminBooking?.days?.length > 0 &&
                                      adminBooking?.days[5] !== null) ||
                                    adminBooking?.days[6] !== null
                                      ? "No Bookings on "
                                      : null}
                                    {adminBooking?.days?.length > 0 &&
                                    adminBooking?.days[5] !== null
                                      ? "Saturday"
                                      : adminBooking?.days[6] !== null
                                      ? "Sunday"
                                      : null}
                                  </p>
                                </div>
                                <div className="form-group position-relative mt-1 ml-5 userss">
                                  <label htmlFor className="modal-label">
                                    Select
                                  </label>
                                  <select
                                    name="time"
                                    id
                                    className="all-input w-100 mb-0"
                                    value={requesttime}
                                    onChange={(e) =>
                                      setrequesttime(e.target.value)
                                    }
                                  >
                                    <option>select</option>
                                    <option value={"9-10 AM"}>9-10 AM</option>
                                    <option value={"10-11 AM"}>10-11 AM</option>
                                    <option value={"11-12 AM"}>11-12 AM</option>
                                    <option value={"12-1 PM"}>12-1 PM</option>
                                    <option value={"1-2 PM"}>1-2 PM</option>
                                    <option value={"2-3 PM"}>
                                      2-3 PM
                                    </option>{" "}
                                    <option value={"3-4 PM"}>3-4 PM</option>
                                    <option value={"4-5 PM"}>4-5 PM</option>
                                    <option value={"5-6 PM"}>5-6 PM</option>
                                    <option value={"6-7 PM"}>6-7 PM</option>
                                    <option value={"7-8 PM"}>7-8 PM</option>
                                    <option value={"8-9 PM"}>8-9 PM</option>
                                    <option value={"9-10 PM"}>9-10 PM</option>
                                    <option value={"10-11 PM"}>10-11 PM</option>
                                  </select>
                                </div>
                              </div>
                              <div className="row ">
                                <div className="col-lg-6 mt-2">
                                  <p className="mt-1 d-inline-block mr-3">
                                    <input
                                      type="radio"
                                      id="test1"
                                      name="radio-group"
                                      value={type}
                                      onClick={() => {
                                        updateCostHandler("chat");
                                      }}
                                    />
                                    <label
                                      htmlFor="test1"
                                      className="question-label"
                                    >
                                      Text
                                    </label>
                                  </p>
                                  <p className="mt-1 d-inline-block mr-3">
                                    <input
                                      type="radio"
                                      id="test2"
                                      name="radio-group"
                                      value={type}
                                      onClick={() => {
                                        updateCostHandler("audiocall");
                                      }}
                                    />
                                    <label
                                      htmlFor="test2"
                                      className="question-label"
                                    >
                                      Audio Call
                                    </label>
                                  </p>
                                  <p className="mt-1 d-inline-block mr-3">
                                    <input
                                      type="radio"
                                      id="test3"
                                      name="radio-group"
                                      value={type}
                                      onClick={() => {
                                        updateCostHandler("videocall");
                                      }}
                                    />
                                    <label
                                      htmlFor="test3"
                                      className="question-label"
                                    >
                                      Video Call
                                    </label>
                                  </p>
                                </div>
                                <div className="col-lg-6 mt-2">
                                  <label htmlFor className="course-label">
                                    Cost:
                                  </label>
                                  <p htmlFor className="question-label mt-1">
                                    ${cost}
                                  </p>
                                </div>
                              </div>
                              <div className="row ">
                                <div className="col-12 mt-2 userss">
                                  <label className="all-label2 mb-1 d-block">
                                    Description:
                                  </label>
                                  <textarea
                                    name
                                    id
                                    rows={8}
                                    className="w-100 all-input-textarea"
                                    placeholder="Enter Description"
                                    value={description}
                                    onChange={(e) => {
                                      setdescription(e.target.value);
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12 text-center mt-3">
                                  {alreadyBooked && (
                                    <button
                                      type="button"
                                      className="green-btn"
                                      onClick={() => {
                                        courseid?.length > 0 &&
                                        requestdate !== null &&
                                        requesttime?.length > 0 &&
                                        type?.length > 0 &&
                                        description?.length > 0
                                          ? onSubmitHandler()
                                          : Toasty(
                                              "error",
                                              `Please fill out all the required fields`
                                            );
                                      }}
                                    >
                                      Next
                                    </button>
                                  )}
                                </div>
                              </div>
                            </form>
                            {!alreadyBooked && (
                              <StripeCheckout
                                stripeKey="pk_test_IdCqGO7sona7aWZqqiXTs3MN00vl1vkEQa"
                                token={handleToken}
                                amount={cost * 100}
                                email={userInfo?.email}
                              ></StripeCheckout>
                            )}
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

export default RequestNewAppointment;
