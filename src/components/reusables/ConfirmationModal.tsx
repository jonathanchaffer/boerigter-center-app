import React from "react";
import { Button, Modal } from "react-bootstrap";

interface ConfirmationModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export function ConfirmationModal({
  show,
  onHide,
  onConfirm,
  title,
  message,
}: ConfirmationModalProps): JSX.Element {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body>
        <Modal.Title>{title}</Modal.Title>
        <p>{message}</p>
        <div className="d-flex justify-content-end spaced-children">
          <Button variant="outline-secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>OK</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
