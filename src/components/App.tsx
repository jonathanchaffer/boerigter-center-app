import {
  AdminDashboard,
  AlumniStoriesList,
  AlumStoryDetails,
  LoginModal,
  MapView,
  Navigation,
  MoveNavButton,
  AboutApp,
} from "components";
import { HandshakeCareersContext } from "contexts";
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from "react-router-dom";
import { 
  getAllPeopleGroveAlumni, 
  fetchHandshakeCareers, 
  isLoggedInToPG, 
  loginToPG, 
  logoutOfPG, 
} from "services";
import { URLPaths } from "utilities";
import tagline from "../assets/images/where_will_you_go.png";
import "./App.scss";

export function App(): JSX.Element {
  const [navPosition, setNavPosition] = useState<"top" | "bottom">("top");
  const { careers: handshakeCareers, isLoading: isHandshakeCareersLoading } = useContext(
    HandshakeCareersContext,
  );

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
        <Navigation pos={navPosition} />
        <Switch>
          <Route exact path={URLPaths.alumStories}>
            <AlumniStoriesList pos={navPosition} />
            <MoveNavButton map={false} pos={navPosition} handleClick={handleClick} />
          </Route>
          <Route exact path="/stories/:id">
            <AlumStoryDetails pos={navPosition}/>
            <MoveNavButton map={false} pos={navPosition} handleClick={handleClick} />
          </Route>
          <Route exact path={`${URLPaths.alumStories}${URLPaths.admin}`}>
            <AlumniStoriesList pos={navPosition} />
          </Route>
          <Route exact path={URLPaths.admin}>
            <AdminDashboard />
          </Route>
          <Route exact path={`${URLPaths.alumStories}/:id`}>
            <AlumStoryDetails pos={navPosition}/>
          </Route>
          <Route exact path={URLPaths.careerFinder}>
            <MapView getData={() => {
              return Promise.resolve(handshakeCareers);
            }}
            isLoading={isHandshakeCareersLoading} pos={navPosition} />
            <Tagline pos={navPosition}/>
            <MoveNavButton map pos={navPosition} handleClick={handleClick} />
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
            <Tagline pos={navPosition}/>
            <MoveNavButton map pos={navPosition} handleClick={handleClick} />
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
        <AboutApp pos={navPosition}/>
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


interface TaglineProps {
  pos: "top" | "bottom"; 
}
function Tagline({pos}:TaglineProps): JSX.Element {
  const topStyle = {
    marginTop : "0px",
  };

  const bottomStyle = {
    marginTop : "-58px",
  };

  const tagStyle = pos === "top" ? topStyle : bottomStyle;

  return (
    <div id="tagline-div">
      <img id="tagline" alt="Where will you go?" src={tagline} style={tagStyle}/>
    </div>
  );
}
