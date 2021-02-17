import { LoginModal, PageContainer } from "components";
import { UserContext } from "contexts";
import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { loginAsAdmin, logout } from "services";
import { URLPaths } from "utilities";

export function AdminDashboard(): JSX.Element {
  const user = useContext(UserContext);

  return (
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
