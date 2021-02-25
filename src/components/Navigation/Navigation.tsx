import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";
import { URLPaths } from "utilities";
import "./Navigation.scss";

export function Navigation(pos: "top" | "bottom"): JSX.Element {
  // const fix = ((pos as unknown) as []).join("") as "top" | "bottom";
  const fix = Object.values(pos).join("") as "top" | "bottom";
  return (
    <Navbar bg="light" fixed={fix}>
      <Container>
        <Nav>
          <NavLink path={URLPaths.alumStories}>Alumni Stories</NavLink>
          {/* <NavLink path={URLPaths.poll}>Quick Poll</NavLink> */}
        </Nav>
        <Nav>
          <NavLink path={URLPaths.alumFinder}>Find Alumni</NavLink>
          <NavLink path={URLPaths.careerFinder}>Career Opportunities</NavLink>
          {/* <NavLink path={URLPaths.offCampusFinder}>Off-Campus Study</NavLink> */}
        </Nav>
      </Container>
    </Navbar>
  );
}

type NavLinkProps = {
  path: string;
  children: React.ReactNode;
};

function NavLink({ path, children }: NavLinkProps): JSX.Element {
  const { pathname } = useLocation();
  return (
    <Link to={path} className={`nav-link ${pathname === path ? "active" : ""}`}>
      {children}
    </Link>
  );
}
