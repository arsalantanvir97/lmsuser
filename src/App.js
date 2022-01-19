import React from "react";

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
import TakeQuiz from "./Screens/TakeQuiz";

import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
const App = () => {
  return (
    <Router>
      <Route path="/" component={Login} exact />{" "}
      <Route path="/Signup" component={Signup} exact />{" "}
      <PrivateRoute exact path="/Appointments" component={Appointments} />{" "}
      <PrivateRoute exact path="/Certificate" component={Certificate} />{" "}
      <PrivateRoute exact path="/ChangePassword" component={ChangePassword} />{" "}
      <PrivateRoute exact path="/Lectures" component={Lectures} />{" "}
      <PrivateRoute exact path="/OfferedCourses" component={OfferedCourses} />{" "}
      <PrivateRoute
        exact
        path="/PaymentLogDetails"
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
      <PrivateRoute exact path="/ViewLecture/:id" component={ViewLecture} />{" "}
      <PrivateRoute exact path="/Profile" component={EditProfile} />{" "}
      <PrivateRoute exact path="/CourseDetails/:id" component={CourseDetails} />{" "}
      <PrivateRoute exact path="/CoursePayment" component={CoursePayment} />{" "}
      <PrivateRoute exact path="/TakeQuiz/:id" component={TakeQuiz} />{" "}
    </Router>
  );
};

export default App;
