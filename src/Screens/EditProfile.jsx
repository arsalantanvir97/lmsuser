import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ImageSelector from "../components/ImageSelector";
import { updateUserInfoAction } from "../actions/userActions";
import Toasty from "../utils/toast";

const EditProfile = () => {
  const [username, setusername] = useState("");
  const [image, setimage] = useState("");
  const [is_edit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      setusername(userInfo?.username);
      setimage(userInfo?.userImage);
    }
  }, [userInfo]);

  const updateProfileData = async (e) => {
    if (username?.length > 0) {
      const formData = new FormData();
      console.log("image", image);
      formData.append("user_image", image);
      formData.append("username", username);
      formData.append("email", userInfo?.email);

      await dispatch(updateUserInfoAction(formData));
      setIsEdit(false);
    } else {
      Toasty("error", `Please fill out all the required fields!`);
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
                      {is_edit ? (
                        <h1 className="main-heading">
                            <Link to="/Profile">
                            <i style={{color:'black'}} className="fas fa-chevron-left" />  </Link>Edit Profile
                          </h1>
                       
                      ) : (
                        <h1 className="main-heading">Profile</h1>
                      )}
                      <div className="row">
                        <div className="col-12 text-center">
                          <div className="position-relative d-inline-block">
                            <ImageSelector
                              setImage={setimage}
                              image={image}
                              is_edit={is_edit}
                            />
                          </div>
                          <div className="mt-1">
                            <Link to="/ChangePassword">Change Password</Link>
                          </div>
                          <div style={{ height: 15 }}></div>
                        </div>
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-lg-4">
                          <div className="row">
                            <div className="col-lg-12 mb-2">
                              <label className="all-label2  mb-1">
                                Full Name:
                              </label>
                              {is_edit ? (
                                <input
                                  type="text"
                                  className="w-100 all-input"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  placeholder="Full Name"
                                  value={username}
                                  onChange={(e) => {
                                    setusername(e.target.value);
                                  }}
                                />
                              ) : (
                                <p>{username}</p>
                              )}
                            </div>
                            <div className="col-lg-3">
                              <label className="all-label2 ">Email:</label>
                            </div>
                            <div className="col-lg-9">
                              <p className="label-value2 profilee-lbll">
                                {userInfo?.email}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row my-lg-5 my-3">
                        <div className="col-12 text-center">
                          <Link
                            to="#"
                            className="green-btn"
                            onClick={() => {
                              if (!is_edit) {
                                setIsEdit(true);
                              } else {
                                updateProfileData();
                              }
                            }}
                          >
                            {is_edit ? "Update" : "Edit"}{" "}
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

export default EditProfile;
