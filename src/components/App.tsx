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
import { getHandshakeCareers, getPeopleGroveAlumni, isLoggedInToPG, loginToPG } from "services";
import { URLPaths } from "utilities";

export function App(): JSX.Element {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path={URLPaths.alumStories}>
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
            <MapView getData={getPeopleGroveAlumni} />
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
