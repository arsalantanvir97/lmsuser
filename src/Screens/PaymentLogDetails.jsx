import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { baseURL } from "../utils/api";

const PaymentLogDetails = (props) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [paymentdetails, setpaymentdetails] = useState();

  useEffect(() => {
    handleGetPaymentDetails();
    console.log(props?.match?.params?.id);
  }, []);

  const handleGetPaymentDetails = async () => {
    try {
      const res = await axios({
        url: `${baseURL}/payment/paymentDetails/${props?.match?.params?.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });
      console.log("res", res);
      setpaymentdetails(res?.data?.payment);
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
                        <div className="row">
                          <div className="col-12 text-right mt-2">
                            <Link to="#" className="pending-btn">
                              Paid
                            </Link>
                          </div>
                        </div>
                      
                          <h1 className="main-heading">
                          <Link to="/PaymentLogs"> <i style={{color:'black'}} className="fas fa-chevron-left" /> </Link> Payment Log
                            Details
                          </h1>
                       
                        <div className="clearfix" />
                        <div className="dash-card-inner mt-4">
                          <div className="row">
                            <div className="col-12">
                              <img
                                src="images/payment-log.png"
                                alt=""
                                className="w-100 img-fluid"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="row ">
                                <div className="col-lg-6 mt-2">
                                  <label className="all-label22">
                                    Course Code:
                                  </label>
                                </div>
                                <div className="col-lg-6 mt-2">
                                  <p className="label-value22">
                                    {paymentdetails?.courseid?.coursecode}
                                  </p>
                                </div>
                                <div className="col-lg-6 mt-2">
                                  <label className="all-label22">
                                    Course Title:
                                  </label>
                                </div>
                                <div className="col-lg-6 mt-2">
                                  <p className="label-value22">
                                    {paymentdetails?.courseid?.coursetitle}
                                  </p>
                                </div>
                                {!paymentdetails?.appointmentid && (
                                  <>
                                <div className="col-lg-6 mt-2">
                                  <label className="all-label22">
                                    Duration:
                                  </label>
                                </div>
                                <div className="col-lg-6 mt-2">
                                  <p className="label-value22">
                                    {" "}
                                    {paymentdetails?.duration}
                                  </p>
                                </div></>)}
                                <div className="col-lg-6 mt-2">
                                  <label className="all-label22">
                                    Valid Upto:
                                  </label>
                                </div>
                                <div className="col-lg-6 mt-2">
                                  <p className="label-value22">{moment.utc(paymentdetails?.expirydate).format("LL")}</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="row ">
                                <div className="col-lg-6 mt-2">
                                  <label className="all-label22">
                                    Category:
                                  </label>
                                </div>
                                <div className="col-lg-6 mt-2">
                                  <p className="label-value22">{paymentdetails?.courseid?.coursecategory?.name}</p>
                                </div>
                                <div className="col-lg-6 mt-2">
                                  <label className="all-label22">Cost:</label>
                                </div>
                                <div className="col-lg-6 mt-2">
                                  <p className="label-value22">${paymentdetails?.cost}</p>
                                </div>
                                <div className="col-lg-6 mt-2">
                                  <label className="all-label22">
                                    Date Registered:
                                  </label>
                                </div>
                                <div className="col-lg-6 mt-2">
                                  <p className="label-value22">{moment.utc(paymentdetails?.createdAt).format("LL")}</p>
                                </div>
                                <div className="col-lg-6 mt-2">
                                  <label className="all-label22">
                                    Payment Date:
                                  </label>
                                </div>
                                <div className="col-lg-6 mt-2">
                                  <p className="label-value22">{moment.utc(paymentdetails?.createdAt).format("LL")}</p>
                                </div>
                                {paymentdetails?.appointmentid && (
                                  <>
                                    <div className="col-lg-6 mt-2">
                                      <label className="all-label22">
                                        Date &amp; Time:
                                      </label>
                                    </div>
                                    <div className="col-lg-6 mt-2">
                                      <p className="label-value22">
                                        {paymentdetails?.appointmentid
                                          ?.appointmentdate +
                                          ", " +
                                          paymentdetails?.appointmentid
                                            ?.appointmenttime}
                                      </p>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="row ">
                                {paymentdetails?.appointmentid && (
                                  <>
                                    <div className="col-lg-6 mt-2">
                                      <label className="all-label22">
                                        Appointment Type:
                                      </label>
                                    </div>
                                    <div className="col-lg-6 mt-2">
                                      <p className="label-value22">
                                        {paymentdetails?.appointmentid?.type}
                                      </p>
                                    </div>
                                  </>
                                )}
                                <div className="col-lg-6 mt-2">
                                  <label className="all-label22">Cost:</label>
                                </div>
                                <div className="col-lg-6 mt-2">
                                  <p className="label-value22">
                                    ${paymentdetails?.cost}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            {paymentdetails?.appointmentid && (
                              <>
                                <div className="col-lg-3 mt-2">
                                  <label className="all-label22">
                                    Description:
                                  </label>
                                </div>
                                <div className="col-lg-9 mt-2">
                                  <p className="label-value22">
                                    {paymentdetails?.appointmentid?.description}
                                  </p>
                                </div>
                              </>
                            )}
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
  );
};

export default PaymentLogDetails;
