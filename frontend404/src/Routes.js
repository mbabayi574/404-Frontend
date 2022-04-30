import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./views/Login_SignUp/Login/login";
import Signup from "./views/Login_SignUp/Signup_CompanyOwner/signup";
import TimeTracker from "./Pages/TimeTracker/index";
import Dashboard from "./Pages";

const Routes = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/home" component={Dashboard} />
          <Route path="/timetracker" component={TimeTracker} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
