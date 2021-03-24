import {
  AdminDashboard,
  AlumniStoriesList,
  AlumStoryDetails,
  LoginModal,
  MapView,
  MoveNavButton,
  Navigation,
} from "components";
import { HandshakeCareersContext, PeopleGroveAlumniContext } from "contexts";
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from "react-router-dom";
import { isLoggedInToPG, loginToPG, logoutOfPG } from "services";
import { URLPaths } from "utilities";
import "./App.scss";

export function App(): JSX.Element {
  const [navPosition, setNavPosition] = useState<"top" | "bottom">("top");

  const { items: handshakeCareers, isLoading: isHandshakeCareersLoading } = useContext(
    HandshakeCareersContext,
  );
  const { items: peopleGroveAlumni, isLoading: isPeopleGroveAlumniLoading } = useContext(
    PeopleGroveAlumniContext,
  );

  function handleClick() {
    if (navPosition === "top") {
      setNavPosition("bottom");
    } else {
      setNavPosition("top");
    }
  }

  return (
    <Router>
      <Navigation pos={navPosition} />
      <Switch>
        <Route exact path={URLPaths.alumStories}>
          <AlumniStoriesList pos={navPosition} />
          <MoveNavButton map={false} pos={navPosition} handleClick={handleClick} />
        </Route>
        <Route exact path="/stories/:id">
          <AlumStoryDetails pos={navPosition} />
          <MoveNavButton map={false} pos={navPosition} handleClick={handleClick} />
        </Route>
        <Route exact path={`${URLPaths.alumStories}${URLPaths.admin}`}>
          <AlumniStoriesList pos={navPosition} />
        </Route>
        <Route exact path={URLPaths.admin}>
          <AdminDashboard pos={navPosition} />
        </Route>
        <Route exact path={`${URLPaths.alumStories}/:id`}>
          <AlumStoryDetails pos={navPosition} />
        </Route>
        <Route exact path={URLPaths.careerFinder}>
          <MapView
            data={handshakeCareers}
            isLoading={isHandshakeCareersLoading}
            pos={navPosition}
          />
          <MoveNavButton map pos={navPosition} handleClick={handleClick} />
        </Route>
        <Route exact path={URLPaths.alumFinder}>
          <>
            <MapView
              data={peopleGroveAlumni}
              isLoading={isPeopleGroveAlumniLoading}
              pos={navPosition}
            />
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
