import { navbarHeight } from "components/Navigation";
import { NavPositionContext } from "contexts";
import React, { useContext } from "react";
import Button from "react-bootstrap/Button";

/** Button that functions to move the navbar up and down for accessibility purposes. */
export function MoveNavButton(): JSX.Element {
  const { navPosition, toggleNavPosition } = useContext(NavPositionContext);
  const isMap = document.getElementsByClassName("foreground-map").length > 0;

  let right;

  if (isMap) {
    right = "55px";
  } else {
    right = "15px";
  }

  const topStyle = {
    bottom: "23.5px",
    right,
  };

  const bottomStyle = {
    ...topStyle,
    transform: `translateY(-${navbarHeight})`,
  };

  const buttonIcon = navPosition === "top" ? "fas fa-arrow-down" : "fas fa-arrow-up";
  const buttonStyle = navPosition === "top" ? topStyle : bottomStyle;

  return (
    <div className="container bottom-button-div" style={buttonStyle}>
      <Button
        id="move-Nav-Button"
        className="bottom-button"
        variant="outline-secondary"
        onClick={toggleNavPosition}
      >
        Navigation <i className={buttonIcon} />
      </Button>
    </div>
  );
}
