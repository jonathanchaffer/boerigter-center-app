import { InfoModal } from "components";
import React, { useEffect, useState } from "react";

interface ErrorModalProps {
  /** The error to be displayed. */
  error: Error | undefined;
}

/** Reusable component for alerting the user to errors. */
export function ErrorModal({ error }: ErrorModalProps): JSX.Element {
  const [isShowing, setIsShowing] = useState(false);

  useEffect((): (() => void) => {
    let isCurrent = true;
    if (isCurrent) {
      if (error !== undefined) {
        setIsShowing(true);
      }
    }
    return (): void => {
      isCurrent = false;
    };
  }, [error]);

  return (
    <>
      <InfoModal
        show={isShowing}
        title="Oops! Something went wrong."
        message={error?.message || "An error occurred."}
        onHide={() => setIsShowing(false)}
      />
    </>
  );
}
