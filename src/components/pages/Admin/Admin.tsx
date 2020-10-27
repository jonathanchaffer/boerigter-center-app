import { PageContainer } from "components";
import { ErrorModal } from "components/reusables";
import { CuratedAlum } from "models";
import React, {useState} from "react";
import { useAsync } from "react-async";
import { Card, Spinner } from "react-bootstrap";
import { getAlumniStories } from "services";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


// const { data, error, isPending } = useAsync({ promiseFn: getAlumniStories });

export function Admin(): JSX.Element {
  const [isLoggedIn, toggleSetLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const { data, error, isPending } = useAsync({ promiseFn: getAlumniStories });
  const [message, setMessage] = useState("Please enter your password");
  //var message = "Please enter your password";
  const param = { data, error, isPending };

  const handleSubmit = () => {
    checkEntry();
  }
  const handleLogOut = () => {
    toggleSetLoggedIn(false);
    setPassword("");
  }

  return (
    <PageContainer>
      <h1>Alumni Stories</h1>
      <h2>Admin View</h2>
      {isLoggedIn ? (
        <div>
          <Button onClick = {handleLogOut}>Log out</Button>
          {RenderContent({ data, error, isPending })}
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

  function checkEntry() {
    // TODO
    password === "admin" ? toggleSetLoggedIn(true) : (//message = "That was not the correct password, please try again", 
      toggleSetLoggedIn(false),
      setPassword(""),//);
      setMessage("That was not the correct password, please try again"));
  }
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
function RenderContent({ data, error, isPending }: any): JSX.Element {
  // const { data, error, isPending } = useAsync({ promiseFn: getAlumniStories });
  return (
    <div>

      {isPending ? (
        <Spinner animation="border" />
      ) : (
        data && data.map((alum: CuratedAlum) => <AlumCard key={alum.uid} alum={alum} />)
      )}
    </div>
  )
}
