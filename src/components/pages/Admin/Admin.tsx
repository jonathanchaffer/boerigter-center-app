import { PageContainer } from "components";
import { ErrorModal } from "components/reusables";
import React, { useState } from "react";
import { useAsync } from "react-async";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getAlumniStories } from "services";

export function Admin(): JSX.Element {
  const [isLoggedIn, toggleSetLoggedIn] = useState(false);
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("Please enter your password");
  const { error } = useAsync({ promiseFn: getAlumniStories });

  const handleSubmit = () => {
    if(password === "admin"){
      window.location.assign("/stories/admin");// Comment out this line to make it stay on the 
      // same page and create more admin controls
      toggleSetLoggedIn(true);
      setPassword("");
    }else{
      setMessage("That was not the correct password, please try again");
      setPassword("");
    }
  }

  return (
    <PageContainer>
      <h1>Admin Login</h1>
      {isLoggedIn ? (
        <div>
          {/* <Button onClick = {handleLogOut} size = "sm">Log out</Button>
          <Form>
            <Button onClick={handleClick} variant="link" size="lg">Alumni Stories Editor</Button>
          </Form> */}
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
}
