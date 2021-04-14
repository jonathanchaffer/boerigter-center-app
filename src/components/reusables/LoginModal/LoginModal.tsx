import { ErrorModal } from "components";
import React, { useEffect, useState } from "react";
import { OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

interface LoginModalProps {
  /** Whether the user is already logged in. */
  isLoggedIn: boolean;
  /** Function used to log in the user. */
  loginFn: (email: string, password: string) => Promise<void | firebase.auth.UserCredential>;
  /** Title of the modal. */
  title?: string;
  /** Description of the modal. */
  description?: string | React.ReactNode;
  /** Function used to send a password reset email. */
  passwordResetFn?: (email: string) => Promise<void>;
  /** Text for a tooltip displayed on the modal. */
  tooltip?: string;
}

/** Reusable modal for logging in users. */
export function LoginModal({
  isLoggedIn,
  loginFn,
  title,
  description,
  passwordResetFn,
  tooltip,
}: LoginModalProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [hasSentEmail, setHasSentEmail] = useState(false);
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
          <Modal.Title className="d-flex justify-content-between">
            {title || "Login"}
            {tooltip && (
              <OverlayTrigger overlay={<Tooltip id="tooltip">{tooltip}</Tooltip>} placement="right">
                <Button variant="link">
                  <i className="fas fa-info-circle" />
                </Button>
              </OverlayTrigger>
            )}
          </Modal.Title>
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
                onClick={() => setIsOpen(false)}
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
