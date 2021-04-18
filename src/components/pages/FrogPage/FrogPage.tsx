import frog from "assets/images/frog.jpg";
import { PageContainer } from "components/reusables";
import React from "react";

interface FrogPageProps {
  pos: "top" | "bottom";
}

export function FrogPage({ pos }: FrogPageProps): JSX.Element {
  return (
    <PageContainer pos={pos}>
      <img src={frog} alt="frog" style={{ width: "100%" }} />
    </PageContainer>
  );
}
