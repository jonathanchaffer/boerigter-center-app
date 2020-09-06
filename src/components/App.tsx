import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BrowserRouter as Router, Link } from "react-router-dom";

export function App(): JSX.Element {
  return (
    <Router>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand>Boerigter Center App</Navbar.Brand>
          <Nav>
            <Link to="/career" className="nav-link">
              Career Opportunities
            </Link>
            <Link to="/alumni" className="nav-link">
              Find Alumni
            </Link>
            <Link to="/study-abroad" className="nav-link">
              Off-Campus Study
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </Router>
  );
}
