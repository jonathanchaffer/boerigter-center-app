import { MapView, Navigation } from "components";
import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

export function App(): JSX.Element {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/stories" />
        <Route exact path="/poll" />
        <Route exact path="/career">
          <MapView />
        </Route>
        <Route exact path="/alumni">
          <MapView />
        </Route>
        <Route exact path="/study-abroad">
          <MapView />
        </Route>
        <Route>
          <Redirect to="/career" />
        </Route>
      </Switch>
    </Router>
  );
}
