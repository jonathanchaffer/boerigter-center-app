import React from "react";
import Button from "react-bootstrap/esm/Button";

interface NavButtonProps {
  map: boolean;
  pos: "top" | "bottom"; 
  handleClick: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined;
}

export function NavButton({map, pos, handleClick}: NavButtonProps): JSX.Element {
  
  // const page = map ? "map" : "notMap";
  let right;
  let borderColor;

  if(map){
    right="55px";
    borderColor="white";
  }else{
    right="15px";
    borderColor="gray";
  }

  const topStyle = {
    bottom: "23.5px",
    left: "1",
    right,
    top: "1",
  };

  const bottomStyle = {
    bottom: "80px",
    left: "1",
    right,
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