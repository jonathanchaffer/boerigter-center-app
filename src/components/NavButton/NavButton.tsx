import React from "react";
import Button from "react-bootstrap/esm/Button";

export function NavButton(map: boolean, pos: "top" | "bottom", 
  handleClick: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined,
): JSX.Element {
  
  const topStyle = {
    bottom: "23.5px",
    left: "1",
    right: "55px",
    top: "1",
  };

  const bottomStyle = {
      bottom: "80px",
      left: "1",
      right: "55px",
      top: "1",
  };

  const buttonText = pos === "top" ? "Bring NavBar down" : "Bring NavBar up";
  const buttonStyle = pos === "top" ? topStyle : bottomStyle;

  

  return (
    <Button id="navBarDown" onClick={handleClick} style={buttonStyle}>
      {buttonText}
    </Button>
  );
}