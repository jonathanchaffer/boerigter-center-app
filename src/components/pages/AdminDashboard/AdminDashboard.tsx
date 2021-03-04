import { LoginModal, PageContainer } from "components";
import { ConfirmationModal, ErrorModal, InfoModal } from "components/reusables";
import { UserContext } from "contexts";
import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { loginAsAdmin, logout, sendPasswordResetEmail } from "services";
import { URLPaths } from "utilities";

export function AdminDashboard(): JSX.Element {
  const user = useContext(UserContext);
  const [isShowingConfirmPasswordReset, setIsShowingConfirmPasswordReset] = useState(false);
  const [isShowingEmailSent, setIsShowingEmailSent] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  return (
    <>
      <LoginModal
        isLoggedIn={!!user}
        loginFn={loginAsAdmin}
        title="Admin Login"
        description="Please login using your admin credentials to view this content."
        passwordResetFn={sendPasswordResetEmail}
      />
      <PageContainer>
        {user && (
          <>
            <div className="d-flex justify-content-between align-items-center">
              <h1>Admin Dashboard</h1>
              <Button variant="outline-secondary" onClick={logout}>
                Log Out
              </Button>
            </div>
            <hr />
            <div className="spaced-children">
              <Link to={`${URLPaths.alumStories}${URLPaths.admin}`}>
                <Button>Edit Alumni Stories</Button>
              </Link>
              <Button onClick={() => setIsShowingConfirmPasswordReset(true)}>Reset Password</Button>
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
    </>
  );
}
