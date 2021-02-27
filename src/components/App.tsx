import {
  AdminDashboard,
  AlumniStoriesList,
  AlumStoryDetails,
  LoginModal,
  MapView,
  Navigation,
} from "components";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from "react-router-dom";
import {
  getAllPeopleGroveAlumni,
  getHandshakeCareers,
  isLoggedInToPG,
  loginToPG,
  logoutOfPG,
} from "services";
import { URLPaths } from "utilities";

export function App(): JSX.Element {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path={URLPaths.alumStories}>
          <AlumniStoriesList />
        </Route>
        <Route exact path={`${URLPaths.alumStories}${URLPaths.admin}`}>
          <AlumniStoriesList />
        </Route>
        <Route exact path={URLPaths.admin}>
          <AdminDashboard />
        </Route>
        <Route exact path={`${URLPaths.alumStories}/:id`}>
          <AlumStoryDetails />
        </Route>
        <Route exact path={URLPaths.careerFinder}>
          <MapView getData={getHandshakeCareers} />
        </Route>
        <Route exact path={URLPaths.alumFinder}>
          <MapView getData={getAllPeopleGroveAlumni} />
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
          />
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
