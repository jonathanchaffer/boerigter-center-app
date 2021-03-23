import { navbarHeight } from "components/Navigation";
import React from "react";
import Button from "react-bootstrap/esm/Button";
import "./MoveNavButton.scss";

interface NavButtonProps {
  map: boolean;
  pos: "top" | "bottom";
  handleClick: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined;
}

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

  const buttonText = pos === "top" ? "Bring NavBar down" : "Bring NavBar up";
  const buttonStyle = pos === "top" ? topStyle : bottomStyle;

  return (
    <div id="button-div" className="container" style={buttonStyle}>
      <Button id="move-Nav-Button" onClick={handleClick}>
        {buttonText}
      </Button>
    </div>
  );
}
