/* eslint-disable react/jsx-props-no-spreading */
import { AlumniStoriesList, AlumStoryDetails, LoginModal, MapView, Navigation } from "components";
import React, { useState } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { getPeopleGroveAlumni } from "services";

export function App(): JSX.Element {
  const [navPosition, setNavPosition] = useState<"top" | "bottom">("bottom");

  function handleClick() {
    if (navPosition === "top") {
      setNavPosition("bottom");
    } else {
      setNavPosition("top");
    }
  }

  return (
    <div>
      <Router>
        <Navigation {...navPosition} />
        <Switch>
          <Route exact path="/stories">
            <AlumniStoriesList />
          </Route>
          <Route exact path="/stories/:id">
            <AlumStoryDetails />
          </Route>
          <Route exact path="/poll" />
          <Route exact path="/career">
            <MapView getData={async () => []} />
          </Route>
          <Route exact path="/alumni">
            <>
              <MapView getData={getPeopleGroveAlumni} />
              <LoginModal />
            </>
          </Route>
          <Route exact path="/study-abroad">
            <MapView getData={async () => []} />
          </Route>
          <Route>
            <Redirect to="/career" />
          </Route>
        </Switch>
      </Router>
      {/* <ReactModal isOpen contentLabel="Minimal Modal Example">
        <Button className="dashboard-Down" onClick={handleClick}>
          Bring Navigation to bottom
        </Button>
      </ReactModal> */}
    </div>
  );
}
