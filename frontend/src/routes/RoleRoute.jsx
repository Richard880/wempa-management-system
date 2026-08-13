import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../features/auth/hooks/useAuth";
import ROUTES from "../constants/routes";
import PageLoader from "../components/common/PageLoader";

function RoleRoute({ allowedRoles = [] }) {
  const { auth } = useAuth();

  console.log("===== ROLE ROUTE CHECK =====");
  console.log("Authenticated:", auth.authenticated);
  console.log("Loading:", auth.loading);
  console.log("Current role:", auth.role);
  console.log("Allowed roles:", allowedRoles);
  console.log("Profile:", auth.profile);
  console.log("============================");

  if (auth.loading) {
    return <PageLoader />;
  }

  if (!auth.authenticated) {
    console.log("ROLE ROUTE: User is not authenticated");

    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
      />
    );
  }

  if (!allowedRoles.includes(auth.role)) {
    console.log("ROLE ROUTE: Access denied for role:", auth.role);

    return (
      <Navigate
        to={ROUTES.HOME}
        replace
      />
    );
  }

  console.log("ROLE ROUTE: Access granted");

  return <Outlet />;
}

export default RoleRoute;