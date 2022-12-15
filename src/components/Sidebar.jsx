import React, { useState } from "react";
import { Link } from "react-router-dom";
const Sidebar = (props) => {
  const [openusersidebar, setopenusersidebar] = useState(false);

  return (
    <>
      <div
        className="main-menu menu-fixed menu-light pur-bck menu-accordion"
        data-scroll-to-active="true"
      >
        <div
          className="main-menu-content ps-container ps-theme-dark"
          data-ps-id="bfd40455-e3fe-357d-fa40-b22d32382384"
        >
          <ul
            className="navigation navigation-main"
            id="main-menu-navigation"
            data-menu="menu-navigation"
          >
            <li
              className={
                props?.match?.path == "/Profile"
                  ? "nav-item active "
                  : "nav-item"
              }
              style={{}}
            >
              <Link to="/Profile" className="d-flex align-items-center">
                <img src="images/profile.png" />
                <span className="menu-title" data-i18n>
                  Profile Information
                </span>
              </Link>
            </li>
            <li
              className={
                props?.match?.path == "/RegistrationCourses" ||
                props?.match?.path == "/OfferedCourses"
                  ? "nav-item has-sub active open"
                  : `nav-item has-sub ${openusersidebar && "open"}`
              }
            >
              <Link
                to="#"
                onClick={() => {
                  setopenusersidebar(!openusersidebar);
                }}
                className="d-flex align-items-center"
              >
                <img src="images/registration.png" />
                <span className="menu-title" data-i18n>
                  Course Registration
                </span>
              </Link>
              <ul className="menu-content">
                <li>
                  <Link className="menu-item " to="/RegistrationCourses">
                    Registration Courses
                  </Link>{" "}
                </li>
                <li>
                  <Link className="menu-item " to="/OfferedCourses">
                    Offered Courses
                  </Link>{" "}
                </li>
              </ul>
            </li>
            <li
              className={
                props?.match?.path == "/Lectures"
                  ? "nav-item active "
                  : "nav-item"
              }
            >
              <Link to="/Lectures" className="d-flex align-items-center">
                <img src="images/lectures.png" />
                <span className="menu-title" data-i18n>
                  Lectures
                </span>
              </Link>
            </li>
            <li
              className={
                props?.match?.path == "/Appointments"
                  ? "nav-item active "
                  : "nav-item"
              }
            >
              <Link to="/Appointments" className="d-flex align-items-center">
                <img src="images/appointment.png" />
                <span className="menu-title" data-i18n>
                  Appointments
                </span>
              </Link>
            </li>
            <li
              className={
                props?.match?.path == "/PaymentLogs"
                  ? "nav-item active "
                  : "nav-item"
              }
            >
              <Link to="/PaymentLogs" className="d-flex align-items-center">
                <img src="images/pay.png" />
                <span className="menu-title" data-i18n>
                  Payment Logs
                </span>
              </Link>
            </li>
            <li
              className={
                props?.match?.path == "/Certificate"
                  ? "nav-item active "
                  : "nav-item"
              }
            >
              <Link to="/Certificate" className="d-flex align-items-center">
                <img src="images/certificate.png" />
                <span className="menu-title" data-i18n>
                  Certificates
                </span>
              </Link>
            </li>
          </ul>
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
            style={{ top: "0px", right: "3px" }}
          >
            <div
              className="ps-scrollbar-y"
              tabIndex={0}
              style={{ top: "0px", height: "0px" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
