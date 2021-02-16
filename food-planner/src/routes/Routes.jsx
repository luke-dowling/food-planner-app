import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Dashboard } from "../components/Dashboard";
import { PrivateRoute } from "../components/PrivateRoute";
import { SignUp } from "../components/SignUp";
import { Login } from "../components/Login";
import { ForgotPassword } from "../components/ForgotPassword";
import { UpdateProfile } from "../components/UpadteProfile";
import { MealEdit } from "../components/MealEdit";
import { AddMeal } from "../components/AddMeal";
import { WeeklyPlan } from "../components/WeeklyPlan";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
        <PrivateRoute path="/update-profile" component={UpdateProfile} />
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route path="/meal/:meal">
          <MealEdit />
        </Route>
        <Route path="/add-meal">
          <AddMeal />
        </Route>
        <Route path="/weekly-plan">
          <WeeklyPlan />
        </Route>
      </Switch>
    </Router>
  );
};
