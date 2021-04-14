import React from "react";
import { Button, Modal } from "react-bootstrap";

interface InfoModalProps {
  /** Whether the modal should be visible. */
  show: boolean;
  /** Function to be called when the modal is dismissed. */
  onHide: () => void;
  /** Title to be displayed on the modal. */
  title: string;
  /** Message to be displayed on the modal. */
  message: string;
}

/** Reusable component for displaying general information, without action. */
export function InfoModal({ show, onHide, title, message }: InfoModalProps): JSX.Element {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body>
        <Modal.Title>{title}</Modal.Title>
        <p>{message}</p>
        <div className="d-flex justify-content-end">
          <Button onClick={onHide}>OK</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
