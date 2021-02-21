/* eslint-disable react/jsx-props-no-spreading */
import { AlumniStoriesList, AlumStoryDetails, LoginModal, MapView, Navigation } from "components";
import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import ReactModal from "react-modal";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { getPeopleGroveAlumni } from "services";
import "./App.scss";
// import {colors} from "../styles/colors";

export function App(): JSX.Element {
  const [navPosition, setNavPosition] = useState<"top" | "bottom">("top");

  function handleClick() {
    if (navPosition === "top") {
      setNavPosition("bottom");
    } else {
      setNavPosition("top");
    }
  }

  const topStyle = {
    content: {
      backgroundColor: "clear",
      bottom: "23px",
      height: "82px",

      left: "1",
      // marginLeft: "0",
      // marginRight: "0",
      right: "55px",
      top: "1",
      // transform: "translate(0, 0)",
    },
    overlay: {
      backgroundColor: "clear",
      // bottom: "0",
      // left: "0",
      // marginLeft: "100",
      // marginRight: "100",
      // right: "absolute",
      // top: "1",
      // transform: "translate(0%, 0%)",
    },
  };

  const bottomStyle = {
    content: {
      backgroundColor: "clear",
      bottom: "81px",
      height: "82px",
      left: "1",
      // marginLeft: "0",
      // marginRight: "0",
      right: "55px",
      top: "1",
      // transform: "translate(0, 0)",
    },
    overlay: {
      backgroundColor: "clear",
      // bottom: "0",
      // left: "0",
      // marginLeft: "100",
      // marginRight: "100",
      // right: "absolute",
      // top: "1",
      // transform: "translate(0%, 0%)",
    },
  };

  const buttonText = navPosition === "top" ? "Bring NavBar down" : "Bring NavBar up";
  const modalStyle = navPosition === "top" ? topStyle : bottomStyle;

  // const buttonStyle = {
  //   backgroundColor: "#f46a1f",
  // };

  // const logoStyle = {
  //   height: "80px",
  //   position: "fixed",
  //   zIndex: "100",
  // };

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
            <MapView getData={async () => []} pos={navPosition} />
          </Route>
          <Route exact path="/alumni">
            <>
              <MapView getData={getPeopleGroveAlumni} pos={navPosition} />
              <LoginModal />
            </>
          </Route>
          <Route exact path="/study-abroad">
            <MapView getData={async () => []} pos={navPosition} />
          </Route>
          <Route>
            <Redirect to="/career" />
          </Route>
        </Switch>
      </Router>
      <ReactModal isOpen contentLabel="Button Modal" style={modalStyle}>
        <Button id="navBarDown" onClick={handleClick}>
          {buttonText}
        </Button>
      </ReactModal>
      {/* <div style={{ zIndex: 100 }} > */}
      {/* <div>
        <img id="tagline" alt="Where will you go?" src="../../whereWillYouGo.jpg" />
      </div> */}

      {/* https://github.com/reactjs/react-modal#api-documentation */}
    </div>
  );
}
