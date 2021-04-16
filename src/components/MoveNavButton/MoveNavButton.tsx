import { navbarHeight } from "components/Navigation";
import React from "react";
import Button from "react-bootstrap/Button";
import "./MoveNavButton.scss";

interface NavButtonProps {
  /** Whether the button is being displayed over a map. */
  map: boolean;
  /** Whether the navbar is currently on top or on bottom. */
  pos: "top" | "bottom";
  /** Function to be called when the button is clicked. */
  handleClick: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined;
}

/** Button that functions to move the navbar up and down for accessibility purposes. */
export function MoveNavButton({ map, pos, handleClick }: NavButtonProps): JSX.Element {
  let right;

  if (map) {
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

  const buttonIcon = pos === "top" ? "fas fa-arrow-down" : "fas fa-arrow-up";
  const buttonStyle = pos === "top" ? topStyle : bottomStyle;

  return (
    <div id="button-div" className="container" style={buttonStyle}>
      <Button id="move-Nav-Button" variant="outline-secondary" onClick={handleClick}>
        Navigation <i className={buttonIcon} />
      </Button>
    </div>
  );
}
