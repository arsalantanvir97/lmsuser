import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import { baseURL, imageURL } from "../utils/api";
import axios from "axios";
import moment from "moment";

const Header = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [notifications, setnotifications] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logOutHandler = async () => {
    console.log("logOutHandler");
    dispatch(logout());
  };
  const getAllNotification = async () => {
    try {
      // dispatch({
      //   type: ADMIN_LOGIN_REQUEST,
      // })

      console.log("getallNotification");
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const res = await axios.get(
        `${baseURL}/notification/notifications`,
        config
      );
      console.log("res", res);
      if (res?.status == 201) {
        setnotifications(res?.data?.notification);
      }
    } catch (error) {}
  };
  return (
    <nav className="header-navbar navbar-expand-md navbar navbar-with-menu fixed-top navbar-light navbar-border">
      <div className="navbar-wrapper">
        <div className="navbar-header">
          <ul className="nav navbar-nav flex-row">
            <li className="nav-item mobile-menu d-md-none mr-auto">
              <a
                className="nav-link nav-menu-main menu-toggle hidden-xs is-active"
                href="#"
              >
                <i className="ft-menu font-large-1" />
              </a>
            </li>
            <li className="nav-item mt-1">
              {" "}
              <Link className="navbar-brand" to="#">
                {" "}
                <img
                  className="brand-logo"
                  alt="stack admin logo"
                  src="images/logo.png"
                />{" "}
              </Link>{" "}
            </li>
            <li className="nav-item d-md-none">
              {" "}
              <a
                className="nav-link open-navbar-container"
                data-toggle="collapse"
                data-target="#navbar-mobile"
              >
                <i className="fa fa-ellipsis-v" />
              </a>{" "}
            </li>
          </ul>
        </div>
        <div className="navbar-container content">
          <div className="collapse navbar-collapse" id="navbar-mobile">
            <ul className="nav navbar-nav mr-auto float-left"></ul>
            <ul className="nav navbar-nav float-right">
              <li
                className="dropdown dropdown-notification nav-item"
                id="hoverbell"
              >
                {" "}
                <a className="nav-link py-0 nav-link-label mt-2" href="#_">
                  <i className="fas fa-comments top-not-belll" />
                </a>
              </li>
              <li
                className="dropdown dropdown-notification nav-item"
                id="hoverbell"
              >
                {" "}
                <Link
                  to="#"
                  className="nav-link py-0 nav-link-label mt-2"
                  onClick={getAllNotification}
                  data-toggle="dropdown"
                >
                  <i className="fa fa-bell top-not-belll" aria-hidden="true" />
                </Link>
                <ul className="dropdown-menu noti dropdown-menu-media dropdown-menu-right">
                  {notifications?.length > 0 &&
                    notifications?.map((notif) => (
                      <li
                        className="scrollable-container media-list ps-container ps-theme-dark"
                        data-ps-id="714ada12-3fbe-54a4-f119-d81e33265029"
                      >
                        <Link to="#"></Link>
                        <div className="media">
                          <Link to="#">
                            <div className="align-self-center">
                              <i className="fas fa-bell notifications-dropdown-bell" />
                            </div>
                          </Link>
                          <div className="media-body">
                            <Link to="#">
                              <p className="notification-text">{notif?.body}</p>
                            </Link>
                            <div className="notification-below-info">
                              <Link to="#"></Link>
                              <small className="float-right">
                                <time
                                  className="media-meta notit-date"
                                  dateTime="2015-06-11T18:29:20+08:00"
                                >
                                  {moment(notif?.createdAt).fromNow()}
                                </time>
                              </small>
                            </div>
                          </div>
                        </div>
                        <div
                          className="ps-scrollbar-x-rail"
                          style={{ left: "0px", bottom: "3px" }}
                        >
                          <div
                            className="ps-scrollbar-x"
                            tabIndex={0}
                            style={{ left: "0px", width: "0px" }}
                          />
                        </div>
                        <div
                          className="ps-scrollbar-y-rail"
                          style={{ top: "0px", right: "0px" }}
                        >
                          <div
                            className="ps-scrollbar-y"
                            tabIndex={0}
                            style={{ top: "0px", height: "0px" }}
                          />
                        </div>
                      </li>
                    ))}
                </ul>
              </li>
              <li className="dropdown d-flex align-items-center dropdown-user nav-item">
                {" "}
                <a
                  className="dropdown-toggle nav-link dropdown-user-link"
                  href="#"
                  data-toggle="dropdown"
                >
                  {" "}
                  <span className="avatar avatar-online">
                    {" "}
                    <img
                      src={
                        userInfo?.userImage && userInfo?.userImage !== null
                          ? `${imageURL}${userInfo?.userImage}`
                          : "app-assets/images/portrait/small/avatar-s-1.png"
                      }
                      alt="avatar"
                    />{" "}
                  </span>
                  <span className="user-name">
                    {userInfo?.username}{" "}
                    <i className="fas ml-1 fa-chevron-down" />
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <Link to="/Profile" className="dropdown-item">
                    <img src="images/nav-user.png" className="mr-1" />
                    My Profile
                  </Link>
                  <Link to="/NewsLetterSubscription" className="dropdown-item">
                    <img src="images/nav-news.png" className="mr-1" />
                    Newsletter Subscriptions
                  </Link>
                  <Link
                    onClick={logOutHandler}
                    className="dropdown-item"
                    to="#"
                  >
                    <img src="images/nav-logout.png" className="mr-1" />
                    Logout
                  </Link>
                </div>
              </li>
              <li className="nav-item d-none d-md-block">
                <a
                  className="nav-link nav-menu-main menu-toggle hidden-xs is-active"
                  href="#"
                >
                  <i className="ft-menu" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
