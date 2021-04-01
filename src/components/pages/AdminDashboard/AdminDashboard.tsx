import { LoginModal, PageContainer } from "components";
import { ConfirmationModal, ErrorModal, InfoModal } from "components/reusables";
import { UserContext } from "contexts";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from "react-router-dom";
import { loginAsAdmin, logout, sendPasswordResetEmail } from "services";
import { setTimeout } from "timers";
import { URLPaths } from "utilities";

interface AdminDashboardProps {
  pos: "top" | "bottom";
}

export function AdminDashboard({ pos }: AdminDashboardProps): JSX.Element {
  const user = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowingConfirmPasswordReset, setIsShowingConfirmPasswordReset] = useState(false);
  const [isShowingEmailSent, setIsShowingEmailSent] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    /* Adds a little bit of buffer time to check if user exists, so that if the
     * user IS logged in, they don't see the login modal briefly when opening the
     * admin page. */
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return isLoading ? (
    <div id="loader">
      <PageContainer pos={pos}>
        <Spinner animation="border" />
      </PageContainer>
    </div>
  ) : (
    <>
      <div id="page">
        <LoginModal
          isLoggedIn={!!user}
          loginFn={loginAsAdmin}
          title="Admin Login"
          description="Please login using your admin credentials to view this content."
          passwordResetFn={sendPasswordResetEmail}
        />
        <PageContainer pos={pos}>
          {user && (
            <>
              <div className="d-flex justify-content-between align-items-center">
                <h1>Admin Dashboard</h1>
                <Button
                  variant="outline-secondary"
                  onClick={() => logout().then(() => history.push("/"))}
                >
                  Log Out
                </Button>
              </div>
              <hr />
              <div className="spaced-children">
                <Link to={URLPaths.alumStories}>
                  <Button>Edit Alumni Stories</Button>
                </Link>
                <Button onClick={() => setIsShowingConfirmPasswordReset(true)}>
                  Reset Password
                </Button>
              </div>
            </>
          )}
        </PageContainer>
        <ConfirmationModal
          show={isShowingConfirmPasswordReset}
          onHide={() => setIsShowingConfirmPasswordReset(false)}
          onConfirm={() => {
            return sendPasswordResetEmail(user?.email || "")
              .then(() => setIsShowingEmailSent(true))
              .catch(err => setError(err));
          }}
          title="Send password reset email?"
          message={`An email will be sent to ${user?.email} with a link to reset your password.`}
          confirmText="Send Email"
        />
        <InfoModal
          show={isShowingEmailSent}
          onHide={() => setIsShowingEmailSent(false)}
          title="Email Sent"
          message="Please check your inbox."
        />
        <ErrorModal error={error} />
      </div>
    </>
  );
}
