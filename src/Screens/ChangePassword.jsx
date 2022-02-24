import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userverfyadnresetpasword } from "../actions/userActions";
import Toasty from "../utils/toast";
const ChangePassword = ({ history }) => {
  const dispatch = useDispatch();
  const [existingpassword, setexistingpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");
  const [showicon, setshowicon] = useState(true);
  const [showicon2, setshowicon2] = useState(true);
  const [showicon3, setshowicon3] = useState(true);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const submitHandler = async () => {
    console.log("submitHandler");
    console.log(
      "submitHandlerreqbody",
      existingpassword,
      newpassword,
      confirm_password
    );
    await dispatch(
      userverfyadnresetpasword(
        existingpassword,
        newpassword,
        confirm_password,
        userInfo?.email,
        history
      )
    );
    setexistingpassword("");
    setnewpassword("");
    setconfirm_password("");
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
                      
                        <h1 className="main-heading">
                        <Link to="/Profile"> <i style={{color:'black'}} className="fas fa-chevron-left" />    </Link>Change Password
                        </h1>
                   
                      <div className="row change-pwdd">
                        <div className="col-lg-6 mt-3 ">
                          <div className="form-group position-relative mb-1">
                            <label htmlFor className="f-p">
                              Current Password{" "}
                            </label>
                            <div className="position-relative">
                              <input
                                type={showicon ? "password" : "text"}
                                className="form-control w-100 enter-input"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Enter Password"
                                value={existingpassword}
                                onChange={(e) => {
                                  setexistingpassword(e.target.value);
                                }}
                              />
                              <i
                                onClick={() => setshowicon(!showicon)}
                                className={
                                  showicon
                                    ? "fa enter-icon-3 right-icon fa-eye-slash right-icon-90"
                                    : "fa enter-icon-3 right-icon fa-eye right-icon-90"
                                }
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 mt-lg-3 mt-1">
                          <div className="form-group position-relative mb-1">
                            <label htmlFor className="f-p">
                              New Password{" "}
                            </label>
                            <div className="position-relative">
                              <input
                                type={showicon2 ? "password" : "text"}
                                className="form-control w-100 enter-input-2"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Enter New Password"
                                value={newpassword}
                                onChange={(e) => {
                                  setnewpassword(e.target.value);
                                }}
                              />
                              <i
                                onClick={() => setshowicon2(!showicon2)}
                                className={
                                  showicon2
                                    ? "fa enter-icon-3 right-icon fa-eye-slash right-icon-90"
                                    : "fa enter-icon-3 right-icon fa-eye right-icon-90"
                                }
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 mt-1">
                          <div className="form-group position-relative mb-1">
                            <label htmlFor className="f-p">
                              Re-Enter New Password{" "}
                            </label>
                            <div className="position-relative">
                              <input
                                type={showicon3 ? "password" : "text"}
                                className="form-control w-100 enter-input-3"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Confirm Password"
                                value={confirm_password}
                                onChange={(e) => {
                                  setconfirm_password(e.target.value);
                                }}
                              />
                              <i
                                onClick={() => setshowicon3(!showicon3)}
                                className={
                                  showicon3
                                    ? "fa enter-icon-3 right-icon fa-eye-slash right-icon-90"
                                    : "fa enter-icon-3 right-icon fa-eye right-icon-90"
                                }
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row my-lg-5 my-3">
                        <div className="col-12 text-center">
                          <Link
                            to="#"
                            onClick={() =>
                              existingpassword?.length > 0 &&
                              confirm_password?.length > 0 &&
                              newpassword?.length > 0
                                ? submitHandler()
                                : Toasty(
                                    "error",
                                    `Please fill out all the required fields`
                                  )
                            }
                            className="green-btn"
                          >
                            Update
                          </Link>
                        </div>
                      </div>
                      <div className="clearfix" />
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

export default ChangePassword;
