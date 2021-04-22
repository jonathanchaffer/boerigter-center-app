import { navbarHeight } from "components/Navigation";
import { InfoModal } from "components/reusables";
import { NavPositionContext } from "contexts";
import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";

export function AboutApp(): JSX.Element {
  const { navPosition } = useContext(NavPositionContext);
  const [display, setDisplay] = useState<true | false>(false);

  const topStyle = {
    bottom: "23.5px",
    left: "15px",
  };

  const bottomStyle = {
    ...topStyle,
    transform: `translateY(-${navbarHeight})`,
  };

  const buttonStyle = navPosition === "top" ? topStyle : bottomStyle;

  function handleClick() {
    setDisplay(!display);
  }

  return (
    <div className="container bottom-button-div" style={buttonStyle}>
      <Button
        id="about-button"
        className="bottom-button"
        variant="outline-secondary"
        onClick={handleClick}
      >
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
