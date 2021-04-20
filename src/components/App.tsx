import {
  AdminDashboard,
  AlumniStoriesList,
  AlumStoryDetails,
  FrogPage,
  LoginModal,
  MapView,
  MoveNavButton,
  Navigation,
} from "components";
import { HandshakeCareersContext, NavPositionContext, PeopleGroveAlumniContext } from "contexts";
import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from "react-router-dom";
import { isLoggedInToPG, loginToPG, logoutOfPG } from "services";
import { URLPaths } from "utilities";

export function App(): JSX.Element {
  const { navPosition, toggleNavPosition } = useContext(NavPositionContext);

  const { items: handshakeCareers, isLoading: isHandshakeCareersLoading } = useContext(
    HandshakeCareersContext,
  );
  const { items: peopleGroveAlumni, isLoading: isPeopleGroveAlumniLoading } = useContext(
    PeopleGroveAlumniContext,
  );

  function handleMoveNavbarButtonClick() {
    toggleNavPosition();
  }

  return (
    <Router>
      <Navigation pos={navPosition} />
      <MoveNavButton map={false} pos={navPosition} handleClick={handleMoveNavbarButtonClick} />
      <Switch>
        <Route exact path={URLPaths.alumStories}>
          <MapView background />
          <AlumniStoriesList pos={navPosition} />
        </Route>
        <Route exact path={URLPaths.admin}>
          <MapView background />
          <AdminDashboard pos={navPosition} />
        </Route>
        <Route exact path={`${URLPaths.alumStories}/:id`}>
          <AlumStoryDetails pos={navPosition} />
        </Route>
        <Route exact path={URLPaths.careerFinder}>
          <MapView data={handshakeCareers} isLoading={isHandshakeCareersLoading} />
        </Route>
        <Route exact path={URLPaths.alumFinder}>
          <>
            <MapView data={peopleGroveAlumni} isLoading={isPeopleGroveAlumniLoading} />
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
        <Route exact path={URLPaths.frog}>
          <FrogPage pos={navPosition} />
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
