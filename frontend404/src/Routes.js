import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./views/Login_SignUp/Login/login";
import Signup from "./views/Login_SignUp/Signup_CompanyOwner/signup";
import Dashboard from "./Pages";
import TodoApp from "./views/TODOLIST";
import RichtexteditorAnnouncment from "./views/AnnouncmentOwnerSide";

const Routes = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/home" component={Dashboard} />
          <Route exact path="/todoapp" component={TodoApp} />
          <Route
            exact
            path="/announcmentsender"
            component={RichtexteditorAnnouncment}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
