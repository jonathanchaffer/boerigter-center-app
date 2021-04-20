import { navbarHeight } from "components/Navigation";
import { NavPositionContext } from "contexts";
import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import "./MoveNavButton.scss";

/** Button that functions to move the navbar up and down for accessibility purposes. */
export function MoveNavButton(): JSX.Element {
  const { navPosition, toggleNavPosition } = useContext(NavPositionContext);
  const isMap = document.getElementsByClassName("map-container foreground").length > 0;

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
    <div id="button-div" className="container" style={buttonStyle}>
      <Button id="move-Nav-Button" variant="outline-secondary" onClick={toggleNavPosition}>
        Navigation <i className={buttonIcon} />
      </Button>
    </div>
  );
}
