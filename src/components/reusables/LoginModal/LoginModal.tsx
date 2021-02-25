import { ErrorModal } from "components";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom";

interface LoginModalProps {
  isLoggedIn: boolean;
  loginFn: (email: string, password: string) => Promise<any>;
  title?: string;
  description?: string | React.ReactNode;
  passwordResetFn?: (email: string) => Promise<void>;
}

// TODO: use Formik for data validation
export function LoginModal({
  isLoggedIn,
  loginFn,
  title,
  description,
  passwordResetFn,
}: LoginModalProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [hasSentEmail, setHasSentEmail] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const history = useHistory();

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
            <div className="spaced-children">
              <Button variant="primary" disabled={isLoading} onClick={handleLogIn}>
                Login
              </Button>
              <Button
                variant="outline-secondary"
                disabled={isLoading}
                onClick={() => history.goBack()}
              >
                Cancel
              </Button>
              {!isLoading && !isSendingEmail && !hasSentEmail && passwordResetFn && (
                <Button
                  variant="link"
                  onClick={() => {
                    setIsSendingEmail(true);
                    passwordResetFn(email)
                      .catch(err => setError(err))
                      .finally(() => {
                        setIsSendingEmail(false);
                        setHasSentEmail(true);
                      });
                  }}
                >
                  Forgot password?
                </Button>
              )}
              {hasSentEmail && (
                <div className="mt-3">Password reset email sent. Please check your inbox.</div>
              )}
              {isLoading ||
                (isSendingEmail && (
                  <>
                    <Spinner animation="border" size="sm" className="mx-2" />
                    {isLoading && <span>Logging in. This may take a moment.</span>}
                    {isSendingEmail && <span>Sending password reset email...</span>}
                  </>
                ))}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <ErrorModal error={error} />
    </>
  );
}
