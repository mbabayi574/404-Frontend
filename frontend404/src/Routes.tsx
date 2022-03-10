import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./views/Login_SignUp/Login/login";
import Signup_Company from "./views/Login_SignUp/Signup_CompanyOwner/signup_company";

const Routes = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup_company" component={Signup_Company} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
