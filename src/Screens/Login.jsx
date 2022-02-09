import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLoginAction,userResetPasswordAction } from "../actions/userActions";
import Swal from "sweetalert2";
import api from "../utils/api";
import Toasty from "../utils/toast";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const [confirm_password, setconfirm_password] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [code, setcode] = useState();
  const [new_password, setnew_password] = useState();
  const [forgotpasswordModal, setforgotpasswordModal] = useState(0);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (userInfo) {
      history.replace("/Profile");
    }
  }, [userInfo]);

  const loginHandler = async () => {
    console.log("submitHandler");
    await dispatch(userLoginAction(email, password, confirm_password, history));
    setemail("");
    setpassword("");
    setconfirm_password("");
  };

  const forgotpasswordHandler = async (e) => {
    e.preventDefault();
    const body = { email };
    console.log("TEST");
    try {
      const res = await api.post("/user/userRecoverPassword", body);
      console.log("res", res);
      if (res?.status == 201) {
        Toasty("success", `🦄 Verification Code Sent To Your Email!`);
        setforgotpasswordModal(1);
      }
    } catch (error) {
      setforgotpasswordModal(0);

      console.log("IN HERE");
      console.log(error?.response?.data);
      Toasty("error", `🦄 Invalid Email!`);
    }
  };

  const verificationCodeHandler = async (e) => {
    try {
      e.preventDefault();
      console.log("code, email", code, email);
      const body = { code, email };
      console.log("TEST");
      const res = await api.post("/user/userverifyRecoverCode", body);
      console.log("res", res);
      setforgotpasswordModal(2);
    } catch (error) {
      console.log("error", error?.response);
      Toasty("error", `🦄 ${error?.response?.data?.message}!`);
    }
  };

  const resetPasswordHandler = (e) => {
    e.preventDefault();
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
  };;
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
                      type="password"
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
                      className="fa enter-icon right-icon fa-eye-slash right-icon-90"
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
                      type="password"
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
                      className="fa enter-icon right-icon fa-eye-slash right-icon-90"
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
                  <input
                    type="number"
                    className="form-control w-100"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Verification Code"
                    value={code}
                    onChange={(e) => {
                      setcode(e.target.value);
                    }}
                  />
                ) : forgotpasswordModal == 2 ? (
                  <>
                    <label htmlFor className="all-label">
                      Password*
                    </label>{" "}
                    <input
                      type="password"
                      className="form-control w-100 enter-input"
                      id="exampleInputPassword1"
                      placeholder="Enter Password"
                      value={new_password}
                      onChange={(e) => {
                        setnew_password(e.target.value);
                      }}
                    />
                    <div
                      style={{
                        height: 23
                      }}
                    ></div>
                    <label htmlFor className="all-label">
                      Confirm Password*
                    </label>
                    <input
                      type="password"
                      className="form-control w-100 enter-input-2"
                      id="exampleInputPassword1"
                      placeholder="Confirm Password"
                      value={confirm_password}
                      onChange={(e) => {
                        setconfirm_password(e.target.value);
                      }}
                    />
                  </>
                ) : null}
                {forgotpasswordModal == 1 && (
                  <div className="text-right mt-2">
                    <Link
                      to="#"
                      className="f-p "
                      onClick={forgotpasswordHandler}
                    >
                      Resend Code
                    </Link>
                  </div>
                )}
              </div>

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
