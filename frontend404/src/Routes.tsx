import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./views/Login_SignUp/Login/login";
import Signup_Company from "./views/Login_SignUp/Signup_CompanyOwner/signup_company";
import Dashboard from "./Pages/Dashboard";

const Routes = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup_company" component={Signup_Company} />
          <Route exact path="/home" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
