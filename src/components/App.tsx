import { Navigation } from "components";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

export function App(): JSX.Element {
  return (
    <Router>
      <Navigation />
    </Router>
  );
}
