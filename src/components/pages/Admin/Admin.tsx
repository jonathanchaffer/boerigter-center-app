import { PageContainer } from "components";
import { ErrorModal } from "components/reusables";
import { CuratedAlum } from "models";
import React, {useState} from "react";
import { useAsync } from "react-async";
import { Card, Spinner } from "react-bootstrap";
import { getAlumniStories } from "services";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import { Link } from "react-router-dom";



// const { data, error, isPending } = useAsync({ promiseFn: getAlumniStories });

export function Admin(): JSX.Element {
  const [isLoggedIn, toggleSetLoggedIn] = useState(false);
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("Please enter your password");
  const { data, error, isPending } = useAsync({ promiseFn: getAlumniStories });
  //var message = "Please enter your password";
  const param = { data, error, isPending };

  const handleSubmit = () => {
    if(password === "admin"){
      toggleSetLoggedIn(true);
      setPassword("");
    }else{
      setMessage("That was not the correct password, please try again");
      setPassword("");
    }
  }
  const handleLogOut = () => {
    toggleSetLoggedIn(false);
    setPassword("");
  }

  const handleClick = () => {
    window.location.assign('/stories/admin');
  }

  return (
    <PageContainer>
      <h1>Alumni Login</h1>
      {isLoggedIn ? (
        <div>
          <Button onClick = {handleLogOut} size = "sm">Log out</Button>
          {/* {RenderContent({ data, error, isPending })} */}
          {/* {RenderContent} */}
          <Form>
            <Button onClick={handleClick} variant="link" size="lg">Alumni Stories Editor</Button>
            {/* I forgot if we're supposed to credit StackOverflow, but I got this line from here: 
            https://stackoverflow.com/questions/42337301/how-to-go-to-another-page-onclick-in-react 
            from the answer by Keshan Nageswaran*/}
          </Form>
        </div>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="password">
            <Form.Label>{message}</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Log In
          </Button>
        </Form>
      )}
      <ErrorModal error={error} />
    </PageContainer>
  );



  function RenderContent(): JSX.Element {
    return (
      <div>
        {/* {isPending ? (
          <Spinner animation="border" />
        ) : (
          data && data.map((alum: CuratedAlum) => <AlumCard key={alum.uid} alum={alum} />)
        )} */}
        
       {/* <Link  to={{pathname: '/stories/admin'}} >Alumni Stories Editor</Link> */}
      </div>
    )
  }

  
  // function checkEntry() {
  //   TODO
  //   return password === "admin"
  //   toggleSetLoggedIn(checkEntry);
  //   password === "admin" ? toggleSetLoggedIn(true) : (//message = "That was not the correct password, please try again", 
  //     toggleSetLoggedIn(false),
  //     setPassword(""),//);
  //     setMessage("That was not the correct password, please try again"));
  // }
}



interface AlumCardProps {
  alum: CuratedAlum;
}

function AlumCard({ alum }: AlumCardProps): JSX.Element {
  return (
    <Card>
      <Card.Body>
        {alum.firstName} {alum.lastName}
      </Card.Body>
    </Card>
  );
}

