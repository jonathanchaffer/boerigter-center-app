import { LoginModal, PageContainer } from "components";
import { UserContext } from "contexts";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { loginAsAdmin, logout } from "services";
import { setTimeout } from "timers";
import { URLPaths } from "utilities";

export function AdminDashboard(): JSX.Element {
  const user = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

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
    <PageContainer>
      <Spinner animation="border" />
    </PageContainer>
  ) : (
    <>
      <LoginModal
        isLoggedIn={!!user}
        loginFn={loginAsAdmin}
        title="Admin Login"
        description="Please login using your admin credentials to view this content."
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
            <Link to={`${URLPaths.alumStories}${URLPaths.admin}`}>
              <Button>Edit Alumni Stories</Button>
            </Link>
          </>
        )}
      </PageContainer>
    </>
  );
}
