import React, {useState} from "react";
import Button from "react-bootstrap/esm/Button";
import ReactModal from "react-modal";
import "./AboutApp.scss";

// ReactModal from https://github.com/reactjs/react-modal#installation

interface AboutAppProps {
  pos: "top" | "bottom"; 
}

export function AboutApp({pos}: AboutAppProps): JSX.Element {
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
      <div id="about-button-div" className="container" style={buttonStyle} >
        <Button id="about-Button" variant="outline-secondary" onClick={handleClick} >
          About
        </Button>
        <ReactModal 
           isOpen={display}
           contentLabel="onRequestClose Example"
           onRequestClose={handleClick}
           className="Modal"
           overlayClassName="Overlay"
       > 
        <div>
          <h2>About this App</h2>
          <p>This app was created for the Boerigter Center for Career and 
            Calling to show prospective and current students the opportunities 
            which are available to them with a Hope College education!
          </p>
          <h3>The programmers</h3>
          <p>Jonathan Chaffer, Josie Crane, Nam Do, and Will von Seeger 
            made this app as senior Computer Science majors in the Fall 2020
            and Spring 2021 semesters.
          </p>
        </div>
       </ReactModal>
      </div>
  );
}
