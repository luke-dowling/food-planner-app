import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Dashboard } from "../components/Dashboard";
import { PrivateRoute } from "../components/PrivateRoute";
import { Profile } from "../components/Profile";
import { SignUp } from "../components/SignUp";
import { Login } from "../components/Login";
import { ForgotPassword } from "../components/ForgotPassword";
import { UpdateProfile } from "../components/UpadteProfile";
import { VeiwMeal } from "../components/VeiwMeal";
import { EditMeal } from "../components/EditMeal";
import { AddMeal } from "../components/AddMeal";
import { WeeklyPlan } from "../components/WeeklyPlan";
import { WeeklyShop } from "../components/WeeklyShop";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
        <PrivateRoute path="/update-profile" component={UpdateProfile} />
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route path="/veiw/:meal">
          <VeiwMeal />
        </Route>
        <Route path="/edit/:meal">
          <EditMeal />
        </Route>
        <Route path="/add-meal">
          <AddMeal />
        </Route>
        <Route path="/weekly-plan" exact>
          <WeeklyPlan />
        </Route>
        <Route path="/weekly-shop" exact>
          <WeeklyShop />
        </Route>
      </Switch>
    </Router>
  );
};
