import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./Components/Landing";
import DataDisplay from "./Components/DataDisplay";

export default (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route exact path="/DataDisplay" component={DataDisplay} />
    <Route path="/"> Error: This page does not exist</Route>
  </Switch>
);
