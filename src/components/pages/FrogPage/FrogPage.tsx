import frog from "assets/images/frog.jpg";
import { PageContainer } from "components/reusables";
import React from "react";

export function FrogPage(): JSX.Element {
  return (
    <PageContainer>
      <img src={frog} alt="frog" style={{ width: "100%" }} />
    </PageContainer>
  );
}
