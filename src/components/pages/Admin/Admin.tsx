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
  const param = { data, error, isPending };

  const handleLogIn = () => {
    toggleSetLoggedIn(true);
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
        <Form onSubmit={handleLogIn}>
          <Form.Group controlId="password">
            <Form.Label>Please enter your password</Form.Label>
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
    return password === "admin";
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
