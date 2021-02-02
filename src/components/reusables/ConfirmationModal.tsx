import React, { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";

interface ConfirmationModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => Promise<void>;
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
  const [isPending, setIsPending] = useState(false);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body>
        <Modal.Title>{title}</Modal.Title>
        <p>{message}</p>
        <div className="d-flex justify-content-end spaced-children">
          {isPending ? (
            <Spinner animation="border" size="sm" />
          ) : (
            <>
              <Button variant="outline-secondary" onClick={onHide}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setIsPending(true);
                  onConfirm().then(() => {
                    onHide();
                    setIsPending(false);
                  });
                }}
              >
                OK
              </Button>
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
