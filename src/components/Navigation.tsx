import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export function Navigation(): JSX.Element {
  return (
    <Navbar bg="light">
      <Container>
        <Link to="/">
          <Navbar.Brand>Boerigter Center App</Navbar.Brand>
        </Link>
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
  );
}
