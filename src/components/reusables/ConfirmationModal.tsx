import React, { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";

interface ConfirmationModalProps {
  /** Whether the modal should be visible. */
  show: boolean;
  /** Function to be called when the modal is canceled or closed. */
  onHide: () => void;
  /** Function to be called when the confirm button is clicked. */
  onConfirm: () => Promise<void>;
  /** Text to be displayed on the confirm button. */
  confirmText?: string;
  /** Title to be displayed on the modal. */
  title: string;
  /** Message to be displayed on the modal. */
  message: string;
  /** Variant of the confirm button. */
  variant?: "danger";
}

/** Reusable component for simple confirmation popups. */
export function ConfirmationModal({
  show,
  onHide,
  onConfirm,
  title,
  confirmText,
  variant,
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
                variant={variant}
                onClick={() => {
                  setIsPending(true);
                  onConfirm().then(() => {
                    onHide();
                    setIsPending(false);
                  });
                }}
              >
                {confirmText || "OK"}
              </Button>
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
