import { InfoModal } from "components/reusables";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "./AboutApp.scss";

// ReactModal from https://github.com/reactjs/react-modal#installation

interface AboutAppProps {
  pos: "top" | "bottom";
}

export function AboutApp({ pos }: AboutAppProps): JSX.Element {
  const [display, setDisplay] = useState<true | false>(false);

  const topStyle = {
    bottom: "23.5px",
    left: "15px",
    right: "1",
    top: "1",
  };

  const bottomStyle = {
    bottom: "80px",
    left: "15px",
    right: "1",
    top: "1",
  };

  const buttonStyle = pos === "top" ? topStyle : bottomStyle;

  function handleClick() {
    setDisplay(!display);
  }

  return (
    <div id="about-button-div" className="container" style={buttonStyle}>
      <Button id="about-Button" variant="outline-secondary" onClick={handleClick}>
        About
      </Button>
      <InfoModal
        show={display}
        onHide={() => setDisplay(false)}
        title="About This App"
        message="This application was created for the Boerigter Center for Calling and Career to show current and prospective students the opportunities available to them through a Hope College education. It was developed in the 2020–2021 academic year by computer science majors Jonathan Chaffer, Josie Crane, Nam Do, and Will von Seeger, under the supervision of Dr. Matt DeJongh and Dr. Mike Jipping."
      />
    </div>
  );
}
