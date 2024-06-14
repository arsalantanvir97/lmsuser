import React, { useEffect, useState } from "react"
import { baseURL, imageURL } from "../utils/api"
import axios from "axios"
import { Link, useHistory } from "react-router-dom"
import DatePicker from "react-datepicker"
import Pagination from "../components/Padgination"
import moment from "moment"
import Swal from "sweetalert2"
import { useSelector } from "react-redux"
import StripeCheckout from "react-stripe-checkout"
import { closeModals } from "../utils/closeModals"
import Calender from "../components/Calender"

const RegistrationCourses = () => {
  let history = useHistory()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const [registeredcourses, setregisteredcourses] = useState([])
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [reregisterdata, setreregisterdata] = useState()
  const [searchString, setSearchString] = useState("")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [status, setStatus] = useState("")
  const [loading, setloading] = useState(false)

  useEffect(() => {
    handleGetQuizzes()
  }, [page, perPage, from, to, status, searchString])

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
          status,
        },
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })

      console.log("res", res)
      setregisteredcourses(res.data?.registeredcourses)
    } catch (err) {
      console.log("err", err)
    }
  }
  const redirectHandler = (id) => {
    history?.push(`/RegisteredCourseLecture${id}`)
  }
  async function handleToken(token) {
    closeModals()
    setloading(true)
    console.log("handleToken")
    const config = {
      header: {
        Authorization: "Bearer sk_test_OVw01bpmRN2wBK2ggwaPwC5500SKtEYy9V",
      },
    }
    const response = await axios.post(
      `${baseURL}/checkout`,
      { token, product: reregisterdata?.cost },
      config
    )
    console.log("response", response)
    const { status } = response.data

    console.log(
      "res",
      response.data.id,
      response.data.status,
      response.headers.date,
      response.data.receipt_email
    )
    console.log("reregisterdata?.courseid", reregisterdata?.courseid)
    const res = await axios.post(
      `${baseURL}/registeredCourses/reregisterCourse`,
      {
        id: reregisterdata?._id,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    )
    if (res?.status == 201) {
      setloading(false)
      Swal.fire({
        icon: "success",
        title: "",
        text: `Course Registered Successfully`,
        showConfirmButton: false,
        timer: 1500,
      })
    }
    handleGetQuizzes()
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
                        <h1 className="main-heading mb-1">
                          Registered Courses
                        </h1>
                        <div className="clearfix" />
                        <div className="row mb-1">
                          <div className="col-lg-6 col-12">
                            <Calender
                              from={from}
                              setFrom={setFrom}
                              to={to}
                              setTo={setTo}
                            />
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
                                      {moment.utc(reg?.expirydate).format("LL")}
                                    </td>
                                    <td>
                                      <p className="clr-orange">
                                        {" "}
                                        {reg?.expired == true
                                          ? "Expired"
                                          : "Valid"}
                                      </p>
                                    </td>
                                    <td>
                                      <Link
                                        to="#"
                                        onClick={() =>
                                          reg?.expired == true
                                            ? setreregisterdata({
                                                cost: reg?.cost,
                                                _id: reg?._id,
                                              })
                                            : redirectHandler(
                                                reg?.courseid?._id
                                              )
                                        }
                                        data-dismiss={
                                          reg?.expired == true ? "modal" : null
                                        }
                                        data-toggle={
                                          reg?.expired == true ? "modal" : null
                                        }
                                        data-target={
                                          reg?.expired == true ? "#upld" : null
                                        }
                                        className="dark-blue"
                                      >
                                        {reg?.expired == true
                                          ? "Register Again"
                                          : "View Lectures"}
                                      </Link>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                        {registeredcourses?.docs?.length > 0 && (
                          <Pagination
                            totalDocs={registeredcourses?.totalDocs}
                            totalPages={registeredcourses?.totalPages}
                            currentPage={registeredcourses?.page}
                            setPage={setPage}
                            hasNextPage={registeredcourses?.hasNextPage}
                            hasPrevPage={registeredcourses?.hasPrevPage}
                          />
                        )}
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

      {/* <div
        className="modal fade off-pop"
        id="delt"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body text-center py-4">
              <h2 className="for-head-h6 text-center pb-4 ">Register Again</h2>
              <div className="row">
                <div className="col-lg-12 ">
                  <div className="fields">
                    <div style={{ width: "100%", textAlign: "center" }}>
                      <StripeCheckout
                        data-dismiss="modal"
                        aria-label="Close"
                        stripeKey="pk_test_IdCqGO7sona7aWZqqiXTs3MN00vl1vkEQa"
                        token={handleToken}
                        amount={reregisterdata?.cost * 100}
                        email={userInfo?.email}
                      ></StripeCheckout>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div
        className="modal fade off-pop"
        id="upld"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body text-center py-4">
              <h2 className="for-head-h6 text-center pb-4 ">Register Again</h2>
              <div className="row">
                <div className="col-lg-12 ">
                  <div className="fields">
                    <div style={{ width: "100%", textAlign: "center" }}>
                      <StripeCheckout
                        stripeKey="pk_test_IdCqGO7sona7aWZqqiXTs3MN00vl1vkEQa"
                        token={handleToken}
                        amount={reregisterdata?.cost * 100}
                        email={userInfo?.email}
                      ></StripeCheckout>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegistrationCourses
