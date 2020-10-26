import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { isLoggedInToPG, loginToPG } from "services";
import { ErrorModal } from "./ErrorModal";
// TODO: use Formik for data validation

export function LoginModal(): JSX.Element {
  const [isOpen, setIsOpen] = useState(!isLoggedInToPG());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  function handleLogIn() {
    setIsLoading(true);
    loginToPG(email, password)
      .then(() => {
        setIsOpen(false);
        window.location.reload();
      })
      .catch((err: Error) => setError(err))
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      <Modal show={isOpen} centered onHide={() => setIsOpen(false)}>
        <Modal.Body>
          <Modal.Title>Login</Modal.Title>
          <p>
            Please log in using your{" "}
            <a href="https://connection.hope.edu/" target="blank">
              connection.hope.edu
            </a>{" "}
            credentials to view this content.
          </p>
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
            <div>
              <Button variant="primary" disabled={isLoading} onClick={handleLogIn}>
                Login
              </Button>
              {isLoading && (
                <>
                  <Spinner animation="border" size="sm" />{" "}
                  <span>Logging you in. This might take a minute or two.</span>
                </>
              )}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <ErrorModal error={error} />
    </>
  );
}
