import { navbarHeight } from "components/Navigation";
import { NavPositionContext } from "contexts";
import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import "./PageContainer.scss";

interface PageContainerProps {
  children: React.ReactNode;
}

/** Responsive container for page contents. */
export function PageContainer({ children }: PageContainerProps): JSX.Element {
  const { navPosition } = useContext(NavPositionContext);

  return (
    <Container
      className="page-container"
      style={navPosition === "top" ? { paddingTop: navbarHeight } : {}}
    >
      {children}
    </Container>
  );
}
