import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import CreditCardInput from "react-credit-card-input"
import { baseURL, imageURL } from "../utils/api"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import moment from "moment"
import StripeCheckout from "react-stripe-checkout"
import Swal from "sweetalert2"
import { handleChange } from "../utils/InputNumberValidation"

const CoursePayment = (props) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const [course, setcourse] = useState()
  const [amountinnum, setamountinnum] = useState()
  const [loading, setloading] = useState(false)

  useEffect(() => {
    handleGetCourse()
    setamountinnum(Number(props?.location?.state?.amount?.amount))
  }, [])
  useEffect(() => {
    console.log("props?.location?.state", props)
  }, [props])
  const handleGetCourse = async () => {
    try {
      const res = await axios({
        url: `${baseURL}/course/courseDetails/${props?.location?.state?.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })

      console.log("res", res)
      setcourse(res?.data?.course)
    } catch (err) {
      console.log(err)
    }
  }
  const [email, setemail] = useState("")
  const [phone, setphone] = useState("")
  const [cardholdername, setcardholdername] = useState("")
  const [cardNumber, setcardNumber] = useState("")
  const [expiry, setexpiry] = useState("")
  const [cvc, setcvc] = useState("")

  const [username, setusername] = useState("")
  const [toggleform, settoggleform] = useState(0)

  const emptyfunc = async () => {}

  // async function handleToken(token) {
  //   setloading(true)
  //   console.log("handleToken")
  //   const config = {
  //     header: {
  //       Authorization: "Bearer sk_test_OVw01bpmRN2wBK2ggwaPwC5500SKtEYy9V",
  //     },
  //   }
  //   const response = await axios.post(
  //     `${baseURL}/checkout`,
  //     { token, product: amountinnum },
  //     config
  //   )
  //   console.log("response", response)
  //   const { status } = response.data

  //   console.log(
  //     "res",
  //     response.data.id,
  //     response.data.status,
  //     response.headers.date,
  //     response.data.receipt_email
  //   )
  //   const res = await axios.post(
  //     `${baseURL}/registeredCourses/createregisteredCourses`,
  //     {
  //       userid: userInfo?._id,
  //       courseid: course?._id,
  //       duration: props?.location?.state?.amount?.month,
  //       cost: amountinnum,
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${userInfo.token}`,
  //       },
  //     }
  //   )
  //   if (res?.status == 201) {
  //     props?.history?.push("/RegistrationCourses")
  //     setloading(false)
  //   }
  // }
  const handleFunc = async () => {
    setloading(true)

    const res = await axios.post(
      `${baseURL}/registeredCourses/createregisteredCourses`,
      {
        userid: userInfo?._id,
        courseid: course?._id,
        duration: props?.location?.state?.amount?.month,
        cost: amountinnum,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    )
    if (res?.status == 201) {
      props?.history?.push("/RegistrationCourses")
      setloading(false)
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
            zIndex: 1111111111111,
          }}
        ></div>
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
                            <Link to="/PaymentLogs">
                              <i
                                style={{ color: "black" }}
                                className="fas fa-chevron-left"
                              />{" "}
                            </Link>{" "}
                            Payments
                          </h1>

                          <div className="clearfix" />
                          <div className="dash-card-inner mt-4">
                            <section className>
                              <div className="container">
                                <div className="row justify-content-center">
                                  <div className="col-lg-8 col-12">
                                    <>
                                      {/* progressbar */}
                                      {/* <ul id="progressbar" className="pl-0">
                                        <li
                                          className={
                                            toggleform == 0 ? "active" : null
                                          }
                                        >
                                          <h3 className="medium">Address</h3>
                                          <i className="user-card" />
                                        </li>
                                        <li
                                          className={
                                            toggleform == 1 ? "active" : null
                                          }
                                        >
                                          <h3 className="medium">Payment</h3>
                                          <i className="payment" />
                                        </li>
                                        <li
                                          className={
                                            toggleform == 2 ? "active" : null
                                          }
                                        >
                                          <h3 className="medium">Confirm</h3>
                                          <i className="check" />
                                        </li>
                                      </ul> */}
                                      {/* fieldsets */}
                                      {/* {toggleform == 0 ? (
                                        <fieldset>
                                          <div className="row">
                                            <div className="col-md-6 col-sm-12">
                                              <div className="form-field">
                                                <label
                                                  htmlFor
                                                  className="all-label2 mb-1"
                                                >
                                                  Email Address
                                                </label>
                                                <input
                                                  type="email"
                                                  placeholder="Enter Email Address"
                                                  className="site-input"
                                                  value={email}
                                                  onChange={(e) => {
                                                    setemail(e.target.value);
                                                  }}
                                                />
                                              </div>
                                            </div>
                                            <div className="col-md-6 col-sm-12">
                                              <div className="form-field">
                                                <label
                                                  htmlFor
                                                  className="all-label2 mb-1"
                                                >
                                                  Phone
                                                </label>
                                                <input
                                                  placeholder="Enter phone number"
                                                  value={phone}
                                                  className="site-input"
                                                  onChange={(e) => {
                                                    handleChange(e, setphone);
                                                  }}
                                                  type="number"
                                                  min={0}
                                                />
                                              </div>
                                            </div>

                                            <div className="col-md-6 col-sm-12">
                                              <div className="form-field">
                                                <label
                                                  htmlFor
                                                  className="all-label2 mb-1"
                                                >
                                                  User Name
                                                </label>
                                                <input
                                                  type="text"
                                                  name="name"
                                                  className="site-input"
                                                  placeholder="Enter User Name"
                                                  value={username}
                                                  onChange={(e) => {
                                                    setusername(e.target.value);
                                                  }}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </fieldset>
                                      ) : toggleform == 1 ? (
                                        <fieldset>
                                          <div className="row">
                                            <div className="col-md-6 col-sm-12">
                                              <div className="form-field">
                                                <label
                                                  htmlFor
                                                  className="all-label2 mb-1"
                                                >
                                                  Card Holder's Name:
                                                </label>
                                                <input
                                                  type="email"
                                                  placeholder="Enter Card Holder Name"
                                                  className="site-input"
                                                  value={cardholdername}
                                                  onChange={(e) => {
                                                    setcardholdername(
                                                      e.target.value
                                                    );
                                                  }}
                                                />
                                              </div>
                                            </div>
                                            <div className="col-md-6 col-sm-12">
                                              <div className="form-field">
                                                <label
                                                  htmlFor
                                                  className="all-label2 mb-1"
                                                >
                                                  Card Details:
                                                </label>
                                                <CreditCardInput
                                                  cardCVCInputRenderer={({
                                                    handleCardCVCChange,
                                                    props
                                                  }) => (
                                                    <input
                                                      {...props}
                                                      onChange={handleCardCVCChange(
                                                        (e) =>
                                                          setcvc(e.target.value)
                                                      )}
                                                    />
                                                  )}
                                                  cardExpiryInputRenderer={({
                                                    handleCardExpiryChange,
                                                    props
                                                  }) => (
                                                    <input
                                                      {...props}
                                                      onChange={handleCardExpiryChange(
                                                        (e) =>
                                                          setexpiry(
                                                            e.target.value
                                                          )
                                                      )}
                                                    />
                                                  )}
                                                  cardNumberInputRenderer={({
                                                    handleCardNumberChange,
                                                    props
                                                  }) => (
                                                    <input
                                                      {...props}
                                                      onChange={handleCardNumberChange(
                                                        (e) =>
                                                          setcardNumber(
                                                            e.target.value
                                                          )
                                                      )}
                                                    />
                                                  )}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </fieldset> */}

                                      <div className="table-responsive right">
                                        <table className="table shopping-cart-wrap cart m-0">
                                          <tbody>
                                            <tr>
                                              <td className="step-td-hading">
                                                Course Details
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>
                                                <div className="img-wrap">
                                                  <img
                                                    src={
                                                      course?.images?.length > 0
                                                        ? `${imageURL}${course?.images?.[0]}`
                                                        : ""
                                                    }
                                                    className="img-fluid step-form-img w-100"
                                                    alt=""
                                                  />
                                                </div>
                                              </td>
                                              <td className="align-middle">
                                                <div className="row">
                                                  <div className="col-6 ">
                                                    <p className="step-table-p">
                                                      Course Code:
                                                    </p>
                                                    <p className="step-table-p">
                                                      Cost
                                                    </p>
                                                    <p className="step-table-p">
                                                      Start Date
                                                    </p>
                                                  </div>
                                                  <div className="col-6">
                                                    <p className="step-table-p-value ml-3">
                                                      {course?.coursecode}
                                                    </p>
                                                    <p className="step-table-p-value ml-3">
                                                      ${amountinnum}
                                                    </p>
                                                    <p className="step-table-p-value ml-3">
                                                      {moment
                                                        .utc(new Date())
                                                        .format("YYYY-MM-DD")}
                                                    </p>
                                                  </div>
                                                </div>
                                              </td>
                                              <td className="align-middle">
                                                <div className="row">
                                                  <div className="col-6">
                                                    <p className="step-table-p ml-5">
                                                      Course Title:
                                                    </p>
                                                    <p className="step-table-p ml-5">
                                                      Duartion
                                                    </p>
                                                    <p className="step-table-p ml-5">
                                                      Ending Date
                                                    </p>
                                                  </div>
                                                  <div className="col-6">
                                                    <p className="step-table-p-value ml-5">
                                                      {course?.coursetitle}
                                                    </p>
                                                    <p className="step-table-p-value ml-5">
                                                      {
                                                        props?.location?.state
                                                          ?.amount?.month
                                                      }{" "}
                                                      Months
                                                    </p>
                                                    <p className="step-table-p-value ml-5">
                                                      {moment(course?.createdAt)
                                                        .add(
                                                          props?.location?.state
                                                            ?.amount?.month,
                                                          "M"
                                                        )
                                                        .format("YYYY-MM-DD")}
                                                    </p>
                                                  </div>
                                                </div>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>

                                      <div className="text-center mt-2">
                                        <button
                                          type="button"
                                          class="green-btn mr-1"
                                          onClick={() =>
                                            settoggleform(toggleform - 1)
                                          }
                                        >
                                          Previous
                                        </button>
                                        <button
                                          type="button"
                                          class="green-btn mr-1"
                                          onClick={() => handleFunc()}
                                        >
                                          Register
                                        </button>

                                        {/* <StripeCheckout
                                          stripeKey="pk_test_IdCqGO7sona7aWZqqiXTs3MN00vl1vkEQa"
                                          token={handleToken}
                                          amount={amountinnum * 100}
                                          email={email}
                                        ></StripeCheckout> */}
                                      </div>
                                    </>
                                  </div>
                                </div>
                              </div>
                            </section>
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
      <div
        className="modal fade"
        id="enrolled-course"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered " role="document">
          <div className="modal-content">
            <button
              type="button"
              className="close text-right mr-1 mt-1"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
            <div className="pt-1 pb-5 text-center">
              <img src="images/green-check.png" alt="" className="img-fluid" />
              <p className="modalpp">
                Your are successfully
                <br />
                enrolled in ABC Course
                <br />
              </p>
              <div className="text-center">
                <a
                  href="#_"
                  data-dismiss="modal"
                  aria-label="Close"
                  className="modal-btn"
                >
                  OK
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="invalid-card"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered " role="document">
          <div className="modal-content">
            <button
              type="button"
              className="close text-right mr-1 mt-1"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
            <div className="pt-1 pb-5 text-center">
              <img src="images/question.png" alt="" className="img-fluid" />
              <p className="modalpp">
                Please provide valid
                <br />
                card details
                <br />
              </p>
              <div className="text-center">
                <a
                  href="#_"
                  data-dismiss="modal"
                  aria-label="Close"
                  className="modal-btn"
                >
                  OK
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="no-balance"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered " role="document">
          <div className="modal-content">
            <button
              type="button"
              className="close text-right mr-1 mt-1"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
            <div className="pt-1 pb-5 text-center">
              <img src="images/question.png" alt="" className="img-fluid" />
              <p className="modalpp">
                There isn't enough amount <br />
                in your card.
                <br />
                Please try another card.
              </p>
              <div className="text-center">
                <a
                  href="#_"
                  data-dismiss="modal"
                  aria-label="Close"
                  className="modal-btn"
                >
                  OK
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CoursePayment
