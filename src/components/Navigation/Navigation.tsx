import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.scss";

export function Navigation(pos: "top" | "bottom"): JSX.Element {
  const fix = pos as "top" | "bottom";
  return (
    <Navbar bg="light" fixed={fix}>
      <Container>
        <Nav>
          <NavLink path="/stories">Alumni Stories</NavLink>
          <NavLink path="/poll">Quick Poll</NavLink>
        </Nav>
        <Nav>
          <NavLink path="/career">Career Opportunities</NavLink>
          <NavLink path="/alumni">Find Alumni</NavLink>
          <NavLink path="/study-abroad">Off-Campus Study</NavLink>
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
