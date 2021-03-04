/* eslint-disable react/jsx-props-no-spreading */
import {
  AdminDashboard,
  AlumniStoriesList,
  AlumStoryDetails,
  LoginModal,
  MapView,
  Navigation,
} from "components";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import ReactModal from "react-modal";
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from "react-router-dom";
import { 
  getAllPeopleGroveAlumni, 
  getHandshakeCareers, 
  isLoggedInToPG, 
  loginToPG, 
  logoutOfPG, 
} from "services";
import { URLPaths } from "utilities";
import tagline from "../assets/images/where_will_you_go.png";
import "./App.scss";

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

  return (
    <div>
      <Router>
        <Navigation {...navPosition} />
        <Switch>
          <Route exact path={URLPaths.alumStories}>
            <AlumniStoriesList {...navPosition} />
          </Route>
          <Route exact path="/stories/:id">
            <AlumStoryDetails />
          </Route>
          <Route exact path={`${URLPaths.alumStories}${URLPaths.admin}`}>
            <AlumniStoriesList {...navPosition} />
          </Route>
          <Route exact path={URLPaths.admin}>
            <AdminDashboard />
          </Route>
          <Route exact path={`${URLPaths.alumStories}/:id`}>
            <AlumStoryDetails />
          </Route>
          <Route exact path={URLPaths.careerFinder}>
            <MapView getData={getHandshakeCareers} pos={navPosition} />
          </Route>
          <Route exact path={URLPaths.alumFinder}>
            <>
              <MapView getData={getAllPeopleGroveAlumni} pos={navPosition} />
              <LoginModal
                isLoggedIn={isLoggedInToPG()}
                loginFn={loginToPG}
                description={
                  <span>
                    Please log in using your{" "}
                    <a href="https://connection.hope.edu/" target="blank">
                      connection.hope.edu
                    </a>{" "}
                    credentials to view this content.
                  </span>
                }
                tooltip="The Hope College Connection site allows you to login via two methods: email/password, or LinkedIn. Currently, in this app, you can only login using the email/password method. Sorry for any inconvenience."
            />
            </>
          </Route>
        <Route exact path={URLPaths.logout}>
          <LogoutPage />
        </Route>
          <Route>
            <Redirect to={URLPaths.alumFinder} />
          </Route>
        </Switch>
      </Router>
      <ReactModal isOpen contentLabel="Button Modal" style={modalStyle}>
        <Button id="navBarDown" onClick={handleClick}>
          {buttonText}
        </Button>
      </ReactModal>
      <div>
        <img id="tagline" alt="Where will you go?" src={tagline} />
      </div>

      {/* https://github.com/reactjs/react-modal#api-documentation */}
    </div>
  );
}

function LogoutPage(): JSX.Element {
  const history = useHistory();

  useEffect(() => {
    logoutOfPG();
    history.goBack();
  });

  return <></>;
}
