import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  userLoginAction,
  userResetPasswordAction
} from "../actions/userActions";
import Swal from "sweetalert2";
import api from "../utils/api";
import Toasty from "../utils/toast";
import { handleChange } from "../utils/InputNumberValidation";
import { validateEmail } from "../utils/ValidateEmail";
import InputNumber from "../components/InputNumber";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const [confirm_password, setconfirm_password] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [code, setcode] = useState();
  const [new_password, setnew_password] = useState();
  const [forgotpasswordModal, setforgotpasswordModal] = useState(0);
  const [showicon, setshowicon] = useState(true);
  const [showicon2, setshowicon2] = useState(true);
  const [showicon3, setshowicon3] = useState(true);
  const [showicon4, setshowicon4] = useState(true);
  const [loading, setloading] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (userInfo) {
      history.replace("/Profile");
    }
  }, [userInfo]);

  const loginHandler = async () => {
    const emailvalidation = validateEmail(email);
    console.log("emmmm", emailvalidation);
    console.log("addEmployeeHandler");
    if (emailvalidation == true) {
      setloading(true);

      console.log("submitHandler");
      await dispatch(
        userLoginAction(email, password, confirm_password, history)
      );
      setloading(false);

      setemail("");
      setpassword("");
      setconfirm_password("");
    } else {
      Toasty("error", `Please enter a valid email`);
      setloading(false);
    }
    setloading(false);
  };

  const forgotpasswordHandler = async (e) => {
    if (email?.length > 0) {
      const emailvalidation = validateEmail(email);
      console.log("emmmm", emailvalidation);
      console.log("addEmployeeHandler");
      if (emailvalidation == true) {
        setloading(true);
        const body = { email };
        console.log("TEST");
        try {
          const res = await api.post("/user/userRecoverPassword", body);
          setloading(false);

          console.log("res", res);
          if (res?.status == 201) {
            Swal.fire({
              icon: "success",
              title: "SUCCESS",
              text: "Verification Code Sent to your mail",
              showConfirmButton: false,
              timer: 1500
            });
            setforgotpasswordModal(1);
          }
          setloading(false);
        } catch (error) {
          setloading(false);

          setforgotpasswordModal(0);

          console.log("IN HERE");
          console.log(error?.response?.data);
          Toasty("error", `🦄 Invalid Email!`);
        }
        setloading(false);
      } else {
        setloading(false);

        Toasty("error", `Please enter a valid email`);
      }
    } else {
      Toasty("error", `Please fill out all the required fields`);
    }
    setloading(false);
  };

  const verificationCodeHandler = async () => {
    if (code?.length > 0) {
      try {
        setloading(true);
        console.log("code, email", code, email);
        const body = { code, email };
        console.log("TEST");
        const res = await api.post("/user/userverifyRecoverCode", body);
        setloading(false);

        console.log("res", res);

        setforgotpasswordModal(2);
      } catch (error) {
        setloading(false);

        console.log("error", error?.response);
        Toasty("error", `🦄 ${error?.response?.data?.message}!`);
      }
    } else {
      Toasty("error", `Please fill out all the required fields`);
    }
    setloading(false);
  };

  const resetPasswordHandler = (e) => {
    if (new_password?.length > 0 && confirm_password?.length > 0) {
      console.log("resetPasswordHandler");
      dispatch(
        userResetPasswordAction(
          new_password,
          confirm_password,
          code,
          email,
          (res) => {
            console.log("res", res);
            setforgotpasswordModal(3);
          },
          (err) => {
            console.log("err of SIGNIN -->", err);
            setconfirm_password("");
            setnew_password("");
          }
        )
      );
    } else {
      Toasty("error", `Please fill out all the required fields`);
    }
  };
  return (
    <section className="admin-login ad-log">
      <div className="container">
        <div className="admin-login-card">
          <div className="row">
            <div className="col-6">
              <div className="admin-inner position-relative">
                <img
                  src="images/logo-bg.png"
                  alt=""
                  className="img-fluid login-imggg"
                />
              </div>
            </div>
            <div className="col-md-6 position-relative my-auto">
              <div className="text-md-left text-center">
                <img src="images/logo.png" alt="" />
                <div className="text-center">
                  <h1>Login</h1>
                </div>
              </div>
              <form>
                <div className="form-group position-relative">
                  <label htmlFor>
                    Email<span className="red-star">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control w-90"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Email Address"
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                  />
                </div>

                <div className="form-group position-relative mb-1">
                  <label htmlFor>
                    Enter Password<span className="red-star">*</span>
                  </label>
                  <div className="position-relative">
                    <input
                      type={showicon ? "password" : "text"}
                      className="form-control w-90 enter-input"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => {
                        setpassword(e.target.value);
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
                <div className="form-group position-relative mb-1">
                  <label htmlFor>
                    Confirm Password<span className="red-star">*</span>
                  </label>
                  <div className="position-relative">
                    <input
                      type={showicon2 ? "password" : "text"}
                      className="form-control w-90 enter-input"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Confirm Password"
                      value={confirm_password}
                      onChange={(e) => {
                        setconfirm_password(e.target.value);
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
                <div className="form-group form-check text-right w-90 mb-0">
                  <Link to="#" data-toggle="modal" data-target="#pwdrecovery1">
                    Forgot Password?
                  </Link>
                </div>

                <div className="text-md-left text-center pb-md-0 pb-2">
                  {!loading ? (
                    <button
                      onClick={() =>
                        email?.length > 0 &&
                        confirm_password?.length > 0 &&
                        password?.length > 0
                          ? loginHandler()
                          : Toasty(
                              "error",
                              `Please fill out all the required fields`
                            )
                      }
                      type="button"
                      className="green-btn w-90 mt-2"
                    >
                      Sign In
                    </button>
                  ) : (
                    <i className="fas fa-spinner fa-pulse"></i>
                  )}
                  <Link
                    to="/Signup"
                    className="register-link d-flex align-items-center justify-content-center mt-3"
                  >
                    Are You a new user? Register
                  </Link>
                  <Link
                    onClick={() => {
                      window.open(
                        "https://dev74.onlinetestingserver.com/LMS/home"
                      );
                    }}
                    to="#"
                    className="f-20 f-p d-flex align-items-center justify-content-center mt-md-3 mt-2"
                  >
                    <img
                      src="images/right-arrow.png"
                      className="img-fluid mr-1"
                    />{" "}
                    Back To Website
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="pwdrecovery1"
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
            <div className="pt-1 pb-5 px-sm-5 px-1">
              <div className="text-center">
                <h2 className="s-bold source d-pur">Forgot Password</h2>
                <p className="f-p">
                  {forgotpasswordModal == 0
                    ? " Please Enter Your Email Address To Receive Verification"
                    : forgotpasswordModal == 1
                    ? "Please Enter The Verification Code Sent To Your Email"
                    : forgotpasswordModal == 2
                    ? "Please Reset Your Password"
                    : null}
                </p>
              </div>
              <div className="form-group position-relative">
                <label htmlFor className="f-p">
                  {forgotpasswordModal == 0
                    ? " Email*"
                    : forgotpasswordModal == 1
                    ? "Verification Code*"
                    : null}{" "}
                  <span className="red-star">*</span>
                </label>
                {forgotpasswordModal == 0 ? (
                  <input
                    type="email"
                    className="form-control w-100"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                  />
                ) : forgotpasswordModal == 1 ? (
                  <InputNumber
                    value={code}
                    onChange={setcode}
                    max={9}
                    className="form-control w-100"
                  />
                ) : forgotpasswordModal == 2 ? (
                  <>
                    <label htmlFor className="all-label">
                      Password*
                    </label>{" "}
                    <div className="position-relative">
                      <input
                        type={showicon3 ? "password" : "text"}
                        className="form-control w-90 enter-input-3"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter Password"
                        value={new_password}
                        onChange={(e) => {
                          setnew_password(e.target.value);
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
                    <div
                      style={{
                        height: 23
                      }}
                    ></div>
                    <label htmlFor className="all-label">
                      Confirm Password*
                    </label>
                    <div className="position-relative">
                      <input
                        type={showicon4 ? "password" : "text"}
                        className="form-control w-90 enter-input-3"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Confirm Password"
                        value={confirm_password}
                        onChange={(e) => {
                          setconfirm_password(e.target.value);
                        }}
                      />
                      <i
                        onClick={() => setshowicon4(!showicon4)}
                        className={
                          showicon4
                            ? "fa enter-icon-3 right-icon fa-eye-slash right-icon-90"
                            : "fa enter-icon-3 right-icon fa-eye right-icon-90"
                        }
                        aria-hidden="true"
                      />
                    </div>
                  </>
                ) : null}
                {forgotpasswordModal == 1 && (
                  <div className="text-right mt-2">
                    {!loading ? (
                      <Link
                        to="#"
                        className="f-p "
                        onClick={() => {
                          email?.length > 0
                            ? forgotpasswordHandler()
                            : Toasty(
                                "error",
                                `Please fill out all the required fields`
                              );
                        }}
                      >
                        Resend Code
                      </Link>
                    ) : (
                      <i className="fas fa-spinner fa-pulse"></i>
                    )}
                  </div>
                )}
              </div>
              {!loading ? (
                <button
                  type="submit"
                  onClick={
                    forgotpasswordModal == 0
                      ? forgotpasswordHandler
                      : forgotpasswordModal == 1
                      ? verificationCodeHandler
                      : forgotpasswordModal == 2
                      ? resetPasswordHandler
                      : null
                  }
                  className="green-btn w-100 mt-lg-3 mt-2"
                  data-toggle="modal"
                  data-target="#pwdrecovery2"
                >
                  {" "}
                  {forgotpasswordModal == 0
                    ? "Continue"
                    : forgotpasswordModal == 1
                    ? "Continue"
                    : forgotpasswordModal == 2
                    ? "Update"
                    : null}
                </button>
              ) : (
                <i className="fas fa-spinner fa-pulse"></i>
              )}
              <Link
                to="#"
                onClick={() => {
                  window.location.reload();
                }}
                className="f-20 f-p d-flex align-items-center justify-content-center mt-md-3 mt-2"
              >
                <img src="images/right-arrow.png" className="img-fluid mr-1" />{" "}
                Back To Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
