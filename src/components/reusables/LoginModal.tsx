import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { loginToPG } from "services";

// TODO: use Formik for data validation

export function LoginModal(): JSX.Element {
  const [isOpen, setIsOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function checkEntry() {
    return email.length > 0 && password.length > 0;
  }

  function handleLogIn() {
    loginToPG();
    closeModal();
  }

  return (
    <Modal show={isOpen} centered onHide={closeModal}>
      <Modal.Body>
        <Form onSubmit={handleLogIn}>
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
          <Button variant="primary" disabled={!checkEntry()} type="submit">
            Log In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
