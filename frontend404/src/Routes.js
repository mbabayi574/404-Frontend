import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./views/Login_SignUp/Login/login";
import Signup from "./views/Login_SignUp/Signup_CompanyOwner/signup";
import Dashboard from "./Pages";
import Profile from "./views/Login_SignUp/profile/profile";

const Routes = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/profile" component={Profile} />
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />

          <Route exact path="/home" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
