import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./views/Login_SignUp/Login/login";
import Signup from "./views/Login_SignUp/Signup_CompanyOwner/signup";
import AddTransportationSchedulePage from "./views/Transportation/addScheduleView";
import Dashboard from "./Pages";

const Routes = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/home" component={Dashboard} />
          <Route exact path="/transportation" component={AddTransportationSchedulePage} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
