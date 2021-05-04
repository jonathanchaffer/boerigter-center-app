import { navbarHeight } from "components";
import { NavPositionContext } from "contexts";
import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import "./BottomButton.scss";

function getIsMap(): boolean {
  return document.getElementsByClassName("foreground-map").length > 0;
}

interface BottomButtonProps {
  position: "left" | "right";
  onClick: () => void;
  children: React.ReactNode;
}

export function BottomButton({ position, onClick, children }: BottomButtonProps): JSX.Element {
  const { navPosition } = useContext(NavPositionContext);

  const sidePadding = "15px";
  const right = getIsMap() ? "55px" : sidePadding;

  const topStyle = {
    bottom: "24px",
    left: position === "left" ? sidePadding : "",
    right: position === "right" ? right : "",
  };

  const bottomStyle = {
    ...topStyle,
    transform: `translateY(-${navbarHeight})`,
  };

  const buttonStyle = navPosition === "top" ? topStyle : bottomStyle;

  return (
    <div className="bottom-button-div" style={buttonStyle}>
      <Button className="bottom-button" variant="outline-secondary" onClick={onClick}>
        {children}
      </Button>
    </div>
  );
}
