import { ErrorModal } from "components";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

interface LoginModalProps {
  isLoggedIn: boolean;
  loginFn: (email: string, password: string) => Promise<any>;
  title?: string;
  description?: string | React.ReactNode;
}

// TODO: use Formik for data validation
export function LoginModal({
  isLoggedIn,
  loginFn,
  title,
  description,
}: LoginModalProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  function handleLogIn() {
    setIsLoading(true);
    loginFn(email, password)
      .then(() => {
        setIsOpen(false);
        window.location.reload();
      })
      .catch((err: Error) => setError(err))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    setIsOpen(!isLoggedIn);
  }, [isLoggedIn]);

  return (
    <>
      <Modal show={isOpen} centered>
        <Modal.Body>
          <Modal.Title>{title || "Login"}</Modal.Title>
          <p>{description || ""}</p>
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
