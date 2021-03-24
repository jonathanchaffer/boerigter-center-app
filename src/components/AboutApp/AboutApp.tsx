import React, {useState} from "react";
import Button from "react-bootstrap/esm/Button";
import { Row , Col } from "react-bootstrap";
import "./AboutApp.scss";

interface AboutAppProps {
//   map: boolean;
  pos: "top" | "bottom"; 
//   handleClick: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined;
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
    <div id="button-div" className="container" style={buttonStyle} >
      <Button id="about-Button" onClick={handleClick} >
        About
      </Button>
      <About displayBool={display}/>
    </div>
  );
}

interface AboutProps {
  displayBool: true | false;
}
function About({displayBool}:AboutProps): JSX.Element {

    const display = displayBool === true ? "inline" : "none";
    const displayStyle = {
      display,
    };
  
    // const noDisplayStyle = {
    //   marginTop : "-58px",
    // };
  
    // const style = display === true ? displayStyle : noDisplayStyle;
  
    return (
      <div id="container" style={displayStyle}>
        <Row>
          <Col>
            <div>
              <h2>About this App</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
                mollit anim id est laborum.</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>The programmers</h3>
            <p>Jonathan Chaffer, Josie Crane, Nam Do, and Will von Seeger 
              made this app as senior Computer Science majors.</p>
          </Col>
        </Row>
      </div>
    );
}