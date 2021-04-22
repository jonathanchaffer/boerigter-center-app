import { BottomButton } from "components/reusables";
import { NavPositionContext } from "contexts";
import React, { useContext } from "react";

/** Button that functions to move the navbar up and down for accessibility purposes. */
export function MoveNavButton(): JSX.Element {
  const { navPosition, toggleNavPosition } = useContext(NavPositionContext);

  const buttonIcon = navPosition === "top" ? "fas fa-arrow-down" : "fas fa-arrow-up";

  return (
    <BottomButton position="right" onClick={toggleNavPosition}>
      Navigation <i className={buttonIcon} />
    </BottomButton>
  );
}
