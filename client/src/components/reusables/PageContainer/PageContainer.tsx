import React from "react";
import Container from "react-bootstrap/Container";
import "./PageContainer.scss";

interface PageContainerProps {
  children: React.ReactNode;
}

export function PageContainer({ children }: PageContainerProps): JSX.Element {
  return <Container className="page-container">{children}</Container>;
}
