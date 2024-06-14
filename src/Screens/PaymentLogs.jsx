import React, { useEffect, useState } from "react"
import { baseURL, imageURL } from "../utils/api"
import axios from "axios"
import { Link, useHistory } from "react-router-dom"
import DatePicker from "react-datepicker"
import Pagination from "../components/Padgination"
import moment from "moment"
import Swal from "sweetalert2"
import { useSelector } from "react-redux"
import Calender from "../components/Calender"

const PaymentLogs = () => {
  let history = useHistory()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const [registeredcourses, setregisteredcourses] = useState([])
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [searchString, setSearchString] = useState("")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [status, setStatus] = useState("")
  const [type, settype] = useState("")

  useEffect(() => {
    handleGetPayments()
  }, [page, perPage, from, to, status, searchString, type])

  const handleGetPayments = async () => {
    try {
      const res = await axios({
        url: `${baseURL}/payment/userPaymentlogs`,
        method: "GET",
        params: {
          userid: userInfo?._id,
          page,
          perPage,
          searchString,
          from,
          to,
          status,
          type,
        },
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })

      console.log("res", res)
      setregisteredcourses(res.data?.payment)
    } catch (err) {
      console.log("err", err)
    }
  }
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
                      <h1 className="main-heading mb-1">Payment Logs</h1>
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
                        <div className="col-lg-6 text-right mb-3">
                          <select
                            name
                            id
                            className="genaral-select"
                            value={type}
                            onChange={(e) => {
                              settype(e.target.value)
                            }}
                          >
                            <option value>Select</option>
                            <option value={""}>All</option>
                            <option value={"Purchased Course"}>
                              Purchased Course
                            </option>
                            <option value={"Appointment Booked"}>
                              Appointment Booked
                            </option>
                          </select>
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
                              <th className="d-grey bold">Type</th>
                              <th className="d-grey bold">Cost</th>
                              <th className="d-grey bold">Date</th>
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
                                  <td>{reg?.type}</td>
                                  <td>${reg?.cost}</td>
                                  <td>
                                    {" "}
                                    {moment.utc(reg?.createdAt).format("LL")}
                                  </td>
                                  <td>
                                    <div className="btn-group mr-1 mb-1">
                                      <button
                                        type="button"
                                        className="btn btn-drop-table btn-sm"
                                        data-toggle="dropdown"
                                      >
                                        <i className="fa fa-ellipsis-v" />
                                      </button>
                                      <div className="dropdown-menu">
                                        <Link
                                          className="dropdown-item"
                                          to={`/PaymentLogDetails${reg?._id}`}
                                        >
                                          <i className="fa fa-eye" />
                                          View{" "}
                                        </Link>
                                      </div>
                                    </div>
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
  )
}

export default PaymentLogs
