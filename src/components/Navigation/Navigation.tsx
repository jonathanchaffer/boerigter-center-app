import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";
import { URLPaths } from "utilities";
import "./Navigation.scss";

export const navbarHeight = "4.5rem";
interface NavigationProps {
  pos: "top" | "bottom";
}

export function Navigation({ pos }: NavigationProps): JSX.Element {
  return (
    <Navbar bg="light" fixed={pos} style={{ height: navbarHeight }}>
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
