import { ErrorModal } from "components";
import React, { useEffect, useState } from "react";
import { OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom";

interface LoginModalProps {
  isLoggedIn: boolean;
  loginFn: (email: string, password: string) => Promise<any>;
  title?: string;
  description?: string | React.ReactNode;
  tooltip?: string;
}

// TODO: use Formik for data validation
export function LoginModal({
  isLoggedIn,
  loginFn,
  title,
  description,
  tooltip,
}: LoginModalProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
                onClick={() => history.goBack()}
              >
                Cancel
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
