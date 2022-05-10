import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./views/Login_SignUp/Login/login";
import Signup from "./views/Login_SignUp/Signup_CompanyOwner/signup";
import AddTransportationServicePage from "./views/Transportation/addService";
import ViewTransportationServicesPage from "./views/Transportation/transportation";
import ManageTransportationSeatsPage from "./views/Transportation/manageSeats";
import Dashboard from "./Pages";

const Routes = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/home" component={Dashboard} />
          <Route exact path="/transportation/add" component={AddTransportationServicePage} />
          <Route exact path="/transportation/seats/:serviceId" component={ManageTransportationSeatsPage} />
          <Route exact path="/transportation" component={ViewTransportationServicesPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
