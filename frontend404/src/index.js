import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Login from "./views/Login_SignUp/Login/login";
import Signup from "./views/Login_SignUp/Signup_CompanyOwner/signup";
import TransportationAddService from "./views/Transportation/addService";
import Transportation from "./views/Transportation/transportation";
import TimeTracker from "./Pages/TimeTracker/index";
import Dashboard from "./Pages";
import TodoApp from "./views/TODOLIST";
import RichtexteditorAnnouncment from "./views/AnnouncmentOwnerSide";
import BoardEmp from "./Pages/BoardEmp/index";
import { DashboardLayout } from "./components/dashboard-layout";

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route exact path="login" element={<Login />} />
            <Route exact path="signup" element={<Signup />} />
            <Route exact path="my" element={<DashboardLayout />}>
              <Route exact path="home" element={<Dashboard />} />
              <Route exact path="transportation">
                <Route index element={<Transportation />} />
                <Route exact path="add" element={<TransportationAddService />} />
              </Route>
              <Route exact path="todoapp" element={<TodoApp />} />
              <Route
                exact
                path="announcmentsender"
                element={<RichtexteditorAnnouncment />}
              />
              <Route exact path="timetracker" element={<TimeTracker />} />
              <Route exact path="boardemp" element={<BoardEmp />} />
            </Route>
            <Route path='*' element={<Login />} />
          </Route>
        </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
