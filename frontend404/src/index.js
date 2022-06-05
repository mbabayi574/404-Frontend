import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import { DashboardLayout } from "./components/dashboard-layout";
import Login from "./views/Login_SignUp/Login/login";
import Signup from "./views/Login_SignUp/Signup_CompanyOwner/signup";
import TransportationAddService from "./views/Transportation/addService";
import Transportation from "./views/Transportation/transportation";
import TimeTracker from "./Pages/TimeTracker/index";
import Dashboard from "./views/Dashboard/dashboard";
import TodoApp from "./views/TODOLIST";
import DormitoryEmp from "./Pages/DormitoryEmp/index";
import HrDesk from "./views/hrDesk/hrDesk";
import FoodManager from "./views/food/foodManager";
import Board from "views/Salary/Calculator";
import NotFound from "./404";
import Documents from "views/Documents/documents";
import BulletinBoard from "views/BulletinBoard";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="/my/home" />} />
          <Route exact path="login" element={<Login />} />
          <Route exact path="signup" element={<Signup />} />
          <Route exact path="my" element={<DashboardLayout />}>
            <Route exact path="home" element={<Dashboard />} />
            <Route exact path="transportation">
              <Route index element={<Transportation />} />
              <Route exact path="add" element={<TransportationAddService />} />
            </Route>
            <Route exact path="documents" element={<Documents />} />
            <Route exact path="todoapp" element={<TodoApp />} />
            <Route exact path="timetracker" element={<TimeTracker />} />
            <Route exact path="bulletin_board" element={<BulletinBoard />} />
            <Route exact path="dormitoryemp" element={<DormitoryEmp />} />
            <Route exact path="reports" element={<Board />} />
            <Route exact path="hr_desk" element={<HrDesk />} />
						<Route exact path="food_manager" element={<FoodManager />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
