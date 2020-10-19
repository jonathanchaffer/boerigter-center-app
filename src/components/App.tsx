import { MapView, Navigation, LogIn } from "components";
import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { parseAlumni, isLoggedIn } from "services";

export function App(): JSX.Element {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/stories" />
        <Route exact path="/poll" />
        <Route exact path="/career">
          <MapView getData={() => []} />
        </Route>
        <Route exact path="/alumni">

          {isLoggedIn() ? <MapView getData={parseAlumni}/> : <div><MapView getData={() => []}/> <LogIn/></div>}
          
        </Route>
        <Route exact path="/study-abroad">
          <MapView getData={() => []} />
        </Route>
        <Route>
          <Redirect to="/career" />
        </Route>
      </Switch>
    </Router>
  );
}
