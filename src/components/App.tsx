/* eslint-disable react/jsx-props-no-spreading */
import {
  AdminDashboard,
  AlumniStoriesList,
  AlumStoryDetails,
  LoginModal,
  MapView,
  Navigation,
  // NavButton,
} from "components";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
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
        bottom: "23.5px",
        left: "1",
        right: "55px",
        top: "1",
      };
    
      const bottomStyle = {
          bottom: "80px",
          left: "1",
          right: "55px",
          top: "1",
      };
    
      const buttonText = navPosition === "top" ? "Bring NavBar down" : "Bring NavBar up";
      const buttonStyle = navPosition === "top" ? topStyle : bottomStyle;

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
            <Tagline/>
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
            <Tagline/>
            {/* <NavButton true up={navPosition} handleClick={handleClick()}/> */}
            {/* <NavButton /> */}
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
      <Button id="navBarDown" onClick={handleClick} style={buttonStyle}>
        {buttonText}
      </Button>
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

function Tagline(): JSX.Element {

  return (
    <div id="tagline-div">
      <img id="tagline" alt="Where will you go?" src={tagline} />
    </div>
  );
}

// function NavButton(map: boolean, pos: "top" | "bottom", 
//   handleClick: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined,
// ): JSX.Element {
  
//   const topStyle = {
//     bottom: "23.5px",
//     left: "1",
//     right: "55px",
//     top: "1",
//   };

//   const bottomStyle = {
//       bottom: "80px",
//       left: "1",
//       right: "55px",
//       top: "1",
//   };

//   const buttonText = pos === "top" ? "Bring NavBar down" : "Bring NavBar up";
//   const buttonStyle = pos === "top" ? topStyle : bottomStyle;

  

//   return (
//     <Button id="navBarDown" onClick={handleClick} style={buttonStyle}>
//       {buttonText}
//     </Button>
//   );
// }


