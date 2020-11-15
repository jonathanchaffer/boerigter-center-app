/* eslint-disable react/jsx-props-no-spreading */
import { AlumniStoriesList, AlumStoryDetails, LoginModal, MapView, Navigation } from "components";
import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import ReactModal from "react-modal";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { getPeopleGroveAlumni } from "services";

export function App(): JSX.Element {
  const [navPosition, setNavPosition] = useState<"top" | "bottom">("top");

  function handleClick() {
    if (navPosition === "top") {
      setNavPosition("bottom");
    } else {
      setNavPosition("top");
    }
  }

  const customStyles = {
    content: {
      backgroundColor: "clear",
      bottom: "30%",
      left: "30%",
      marginRight: 0,
      right: "auto",
      top: "30%",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      backgroundColor: "clear",
      bottom: "30%",
      left: "30%",
      marginRight: "-50%",
      right: "auto",
      top: "30%",
      transform: "translate(-50%, -50%)",
    },
  };

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
      <ReactModal isOpen contentLabel="Minimal Modal Example" style={customStyles}>
        <Button className="dashboard-Down" onClick={handleClick}>
          Bring Navigation to bottom
        </Button>
      </ReactModal>
      {/* https://github.com/reactjs/react-modal#api-documentation */}
    </div>
  );
}
