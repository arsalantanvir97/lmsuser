import React, { useEffect } from "react";

import Appointments from "./Screens/Appointments";
import Certificate from "./Screens/Certificate";
import ChangePassword from "./Screens/ChangePassword";
import CoursePayment from "./Screens/CoursePayment";
import Lectures from "./Screens/Lectures";
import Login from "./Screens/Login";
import OfferedCourses from "./Screens/OfferedCourses";
import PaymentLogDetails from "./Screens/PaymentLogDetails";
import PaymentLogs from "./Screens/PaymentLogs";
import Profile from "./Screens/Profile";
import RegistrationCourses from "./Screens/RegistrationCourses";
import RequestNewAppointment from "./Screens/RequestNewAppointment";
import Signup from "./Screens/Signup";
import ViewLecture from "./Screens/ViewLecture";
import EditProfile from "./Screens/EditProfile";
import CourseDetails from "./Screens/CourseDetails";
import EmployeeSignup from "./Screens/EmployeeSignup";
import RegisteredCourseLecture from "./Screens/RegisteredCourseLecture";

import TakeQuiz from "./Screens/TakeQuiz";
import ChatScreen from "./components/ChatScreen";

import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import {
  initVox,
  connectVox,
  login,
  onIncomingCall,
  voxAPI
} from "./config/vox";
import { useSelector } from "react-redux";
import * as VoxImplant from "voximplant-websdk";
import { handleModal, setCallState, setMuteState } from "./actions/userActions";

const App = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const application_name = "lmszainshah.arsalantanveer.n2.voximplant.com";
  // const account_name = "arsalantanveer";

  // useEffect(async () => {
  //   if (userInfo?._id) {
  //     await initVox();
  //     await login(
  //       userInfo?.voxusername,
  //       "S@lsoft99",
  //       application_name,
  //       account_name
  //     );
  //     await connectVox();
  //     voxAPI.on(VoxImplant.Events.IncomingCall, (e) => {
  //       onIncomingCall(e, handleEndCall, setCallState);
  //       handleOpenModal(e?.call?.settings?.video, e);
  //     });
  //   }
  // }, [userInfo?._id]);

  // const handleOpenModal = (videoStatus, incommingCall) => {
  //   handleModal(true, videoStatus, incommingCall);
  // };

  // const handleEndCall = () => {
  //   handleModal(false, false, false);
  // };

  return (
    <Router basename="/LMS/user">
      <Route path="/" component={Login} exact />{" "}
      <Route path="/Signup" component={Signup} exact />{" "}

      <Route
        path="/EmployeeSignup/:id/:course"
        component={EmployeeSignup}
        exact
      />{" "}
      <PrivateRoute exact path="/Appointments" component={Appointments} />{" "}
      <PrivateRoute exact path="/Certificate" component={Certificate} />{" "}
      <PrivateRoute exact path="/ChangePassword" component={ChangePassword} />{" "}
      <PrivateRoute exact path="/Lectures" component={Lectures} />{" "}
      <PrivateRoute exact path="/OfferedCourses" component={OfferedCourses} />{" "}
      <PrivateRoute exact path="/ChatScreen" component={ChatScreen} />{" "}
      <PrivateRoute
        exact
        path="/PaymentLogDetails:id"
        component={PaymentLogDetails}
      />{" "}
      <PrivateRoute exact path="/PaymentLogs" component={PaymentLogs} />{" "}
      <PrivateRoute
        exact
        path="/RegistrationCourses"
        component={RegistrationCourses}
      />{" "}
      <PrivateRoute
        exact
        path="/RequestNewAppointment"
        component={RequestNewAppointment}
      />{" "}
      <PrivateRoute exact path="/ViewLecture:id" component={ViewLecture} />{" "}
      <PrivateRoute exact path="/RegisteredCourseLecture:id" component={RegisteredCourseLecture} />{" "}

      <PrivateRoute exact path="/Profile" component={EditProfile} />{" "}
      <PrivateRoute exact path="/CourseDetails:id" component={CourseDetails} />{" "}
      <PrivateRoute exact path="/CoursePayment" component={CoursePayment} />{" "}
      <PrivateRoute exact path="/TakeQuiz:id" component={TakeQuiz} />{" "}
    </Router>
  );
};

export default App;
