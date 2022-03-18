import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { employeeSignUpAction } from "../actions/userActions";
import Swal from "sweetalert2";
import api from "../utils/api";
import Toasty from "../utils/toast";

import ImageSelector from "../components/ImageSelector";
import "react-toastify/dist/ReactToastify.css";
import { validateEmail } from "../utils/ValidateEmail";

const EmployeeSignup = ({ history, match }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [showicon, setshowicon] = useState(true);
  const [loading, setloading] = useState(false);

  const [showicon2, setshowicon2] = useState(true);
  useEffect(() => {
    console.log("match", match);
  }, []);

  useEffect(() => {
    if (userInfo) {
      history.replace("/Profile");
    }
  }, [userInfo]);
  const [image, setimage] = useState("");
  const [username, setusername] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [type, settype] = useState("Student");

  const [is_edit, setIsEdit] = useState(true);
  const dispatch = useDispatch();

  const registerUserHandler = async () => {
    const emailvalidation = validateEmail(email);
    console.log("emmmm", emailvalidation);
    console.log("addEmployeeHandler");
    if (emailvalidation == true) {
      try {
        setloading(true);
        const formData = new FormData();
        let enterpriseid = match?.params?.id;
        let courseid = match?.params?.course;
        console.log(
          "enterpriseid courseid",
          match?.params?.course,
          match?.params?.id
        );
        formData.append("user_image", image);
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("type", type);
        formData.append("enterpriseid", enterpriseid);
        formData.append("courseid", courseid);

        formData.append("confirmpassword", confirmpassword);

        await dispatch(employeeSignUpAction(formData, history));
        setloading(false);
      } catch (error) {
        setloading(false);
      }
    } else {
      Toasty("error", `Please enter a valid email`);
    }
    setloading(false);
  };
  return (
    <section className="admin-login ad-log">
      <div className="container">
        <div className="admin-login-card">
          <div className="row">
            <div className="col-6">
              <div className="admin-inner position-relative">
                <img
                  src="images/logo-bg-2.png"
                  alt=""
                  className="img-fluid login-imggg"
                />
              </div>
            </div>
            <div className="col-md-6 position-relative my-auto">
              <div className="text-md-left text-center">
                <img src="images/logo.png" alt="" />
                <div className="text-center">
                  <h1 className="signup-heading">Sign Up</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-12 text-center">
                  <div className="position-relative d-inline-block">
                    <ImageSelector
                      setImage={setimage}
                      image={image}
                      is_edit={is_edit}
                    />
                  </div>
                </div>
              </div>
              {/* <div className="text-center mb-33">
            <div className="position-relative d-inline-block">
              <img src="images/user-profilee.png" alt="" className="my-proflie-img" />
              <label htmlFor="picture" className="d-block">
                <img src="images/profile-upload.png" alt="" className="pro-upload" />
              </label>
            </div>
          </div>
          <div className="d-none">
            <input type="file" name="pic" accept=".gif,.jpg,.png,.tif|image/*" id="picture" />
            <input type="submit" />

          </div> */}

              <form>
                <div className="form-group position-relative">
                  <label htmlFor>
                    Full Name<span className="red-star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control w-90"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Full Name"
                    value={username}
                    onChange={(e) => {
                      setusername(e.target.value);
                    }}
                  />
                </div>
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
                {/* <div className="form-group position-relative userss">
                  <label htmlFor>
                    Signup As<span className="red-star">*</span>
                  </label>
                  <select
                    name
                    id
                    className="form-control w-90 mb-0"
                    value={type}
                    onChange={(e) => {
                      settype(e.target.value);
                    }}
                  >
                    <option value>Select</option>
                    <option value={"Student"}>Student</option>
                    <option value={"Enterprise"}>Enterprise</option>
                  </select>
                </div> */}
                <div className="form-group position-relative mb-1">
                  <label htmlFor>
                    Password<span className="red-star">*</span>
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
                      className="form-control w-90 enter-input-2"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Confirm Password"
                      value={confirmpassword}
                      onChange={(e) => {
                        setconfirmpassword(e.target.value);
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
                <div className="text-md-left text-center pb-md-0 pb-2">
                  {!loading ? (
                    <button
                      onClick={() =>
                        username?.length > 0 &&
                        email?.length > 0 &&
                        confirmpassword?.length > 0 &&
                        password?.length > 0 &&
                        image?.name?.length > 0 &&
                        type?.length > 0
                          ? registerUserHandler()
                          : Toasty(
                              "error",
                              `Please fill out all the required fields`
                            )
                      }
                      type="button"
                      className="green-btn w-90 mt-2"
                      data-target="#sign-up-platform"
                      data-toggle="modal"
                    >
                      Sign Up
                    </button>
                  ) : (
                    <i className="fas fa-spinner fa-pulse"></i>
                  )}
                  <Link
                    to="/"
                    className="register-link d-flex align-items-center justify-content-center mt-3"
                  >
                    Already Registerd? Login
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
    </section>
  );
};

export default EmployeeSignup;
