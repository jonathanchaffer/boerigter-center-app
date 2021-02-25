import {
  AdminDashboard,
  AlumniStoriesList,
  AlumStoryDetails,
  LoginModal,
  MapView,
  Navigation,
} from "components";
import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { getAllPeopleGroveAlumni, getHandshakeCareers, isLoggedInToPG, loginToPG } from "services";
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
        {/* <Route exact path={URLPaths.poll} /> */}
        <Route exact path={URLPaths.careerFinder}>
          <MapView getData={getHandshakeCareers} />
        </Route>
        <Route exact path={URLPaths.alumFinder}>
          <>
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
              tooltip="The Hope College Connection site allows you to login via two methods: email/password, or LinkedIn. Currently, in this app, you can only login using the email/password method. Sorry for any inconvenience."
            />
          </>
        </Route>
        {/* <Route exact path={URLPaths.offCampusFinder}>
          <MapView getData={async () => []} />
        </Route> */}
        <Route>
          <Redirect to={URLPaths.alumFinder} />
        </Route>
      </Switch>
    </Router>
  );
}
