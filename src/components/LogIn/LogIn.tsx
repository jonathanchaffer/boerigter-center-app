import React, { useState } from "react";
import Modal from "react-modal";
import { Button, Form } from "react-bootstrap";
import "./LogIn.scss";

export function LogIn(): JSX.Element {
  const [modalIsOpen, setIsOpen] = React.useState(true);
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");

  function closeModal() {
    setIsOpen(false);
  }
  function checkEntry() {
    return email.length > 0 && pass.length > 0;
  }
  function handleLogIn() {
    closeModal();
  }
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Log-In Window"
        overlayClassName="overlay"
      >
        <Form onSubmit={handleLogIn} className="Form">
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
              value={pass}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" disabled={!checkEntry()} type="submit">
            Log In
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
