import { navbarHeight } from "components/Navigation";
import React from "react";
import Container from "react-bootstrap/Container";
import "./PageContainer.scss";

interface PageContainerProps {
  children: React.ReactNode;
  /** Whether the navbar is on top or bottom. */
  pos: "top" | "bottom";
}

/** Responsive container for page contents. */
export function PageContainer({ children, pos }: PageContainerProps): JSX.Element {
  return (
    <Container className="page-container" style={pos === "top" ? { paddingTop: navbarHeight } : {}}>
      {children}
    </Container>
  );
}
