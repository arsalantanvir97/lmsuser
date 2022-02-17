import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { baseURL } from '../utils/api';
import DatePicker from "react-datepicker";
import moment from 'moment';
import { Link } from 'react-router-dom';
import Pagination from '../components/Padgination';
import Calender from '../components/Calender';

const Certificate = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [userregisteredcourse, setuserregisteredcourse] = useState(
    []
  );
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    handleGetEmployeesofEnterprise();
  }, [page, perPage, from, to, status, searchString]);

  const handleGetEmployeesofEnterprise = async () => {
    try {
      const res = await axios({
        url: `${baseURL}/registeredCourses/userRegisteredcourseslogsforcertificate`,
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
      setuserregisteredcourse(res.data?.registeredcourses);
    } catch (err) {
      console.log("err", err);
    }
  };
  const generateCertificateHandler = async (reg) => {
    console.log("generateCertificateHandler");
    try {
      if (reg?.certificategenerated == true) {
        await Swal.fire({
          icon: "info",
          title: "",
          text: `Certificate Already Generated`,
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        const res = await axios.post(
          `${baseURL}/user/generateCertificate`,
          {
            email: reg?.userid?.email,
            reg: reg
          },
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`
            }
          }
        );
        console.log("res", res);
        Swal.fire({
          icon: "success",
          title: "",
          text: `Certificate has been sent been sent to ${reg?.userid?.email} email`,
          showConfirmButton: false,
          timer: 1500
        });
      }
      handleGetEmployeesofEnterprise();
    } catch (error) {
      console.log("err", error);
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
                        <h1 className="main-heading mb-1">Certificates</h1>
                        <div className="clearfix" />
                        <div className="row mb-1">
                          <div className="col-lg-6 col-12">
                          <Calender from={from}setFrom={setFrom}to={to}setTo={setTo}/>
                          </div>
                        </div>
                        <div className="clearfix" />
                        <div className="maain-tabble">
                          <table className="table table-striped  ">
                            <thead>
                              <tr>
                                <th className="d-grey bold">S.No</th>
                                <th className="d-grey bold">Code</th>
                                <th className="d-grey bold">Course Title</th>
                                <th className="d-grey bold">Completion Date</th>
                                <th className="d-grey bold">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {userregisteredcourse?.docs?.length > 0 &&
                                userregisteredcourse?.docs?.map(
                                  (ent, index) => (
                           
                                    <tr>
                                      <td>{index + 1}</td>
                                      <td>{ent?.courseid?.coursecode}</td>
                                      <td>{ent?.courseid?.coursetitle}</td>
                                     
                                      <td>
                                        {moment
                                          .utc(ent?.completiondate)
                                          .format("LL")}
                                      </td>
                                      <td>
                                        <Link
                                          to="#"
                                          className="accepted"
                                          onClick={() => {
                                            generateCertificateHandler(ent);
                                          }}
                                        >
                                          Generate Certificate
                                        </Link>
                                      </td>
                              
                                    
                              </tr>))}
                            </tbody>
                          </table>
                        </div>
                         {userregisteredcourse?.docs?.length > 0 && (
                          <Pagination
                            totalDocs={userregisteredcourse?.totalDocs}
                            totalPages={userregisteredcourse?.totalPages}
                            currentPage={userregisteredcourse?.page}
                            setPage={setPage}
                            hasNextPage={userregisteredcourse?.hasNextPage}
                            hasPrevPage={userregisteredcourse?.hasPrevPage}
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

export default Certificate
