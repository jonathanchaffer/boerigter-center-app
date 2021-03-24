import { navbarHeight } from "components/Navigation";
import React from "react";
import Container from "react-bootstrap/Container";
import "./PageContainer.scss";

interface PageContainerProps {
  children: React.ReactNode;
  pos: "top" | "bottom";
}

export function PageContainer({ children, pos }: PageContainerProps): JSX.Element {
  return (
    <Container className="page-container" style={pos === "top" ? { paddingTop: navbarHeight } : {}}>
      {children}
    </Container>
  );
}
