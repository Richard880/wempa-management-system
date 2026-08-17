import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../features/auth/hooks/useAuth";
import ROUTES from "../constants/routes";
import ROLES from "../constants/roles";
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

  /*
   * Wait until authentication and the Firestore profile
   * have finished resolving before making any routing decision.
   */
  if (auth.loading) {
    return <PageLoader />;
  }

  /*
   * User is not authenticated.
   */
  if (!auth.authenticated) {
    console.log("ROLE ROUTE: User is not authenticated.");

    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
      />
    );
  }

  /*
   * User is authenticated but does not have one
   * of the roles required for this route.
   */
  if (!allowedRoles.includes(auth.role)) {
    console.log(
      "ROLE ROUTE: Access denied for role:",
      auth.role
    );

    /*
     * An ordinary administrator is already inside the
     * Admin Portal. If they try to access a Super Admin-only
     * route, return them to the Admin Dashboard.
     */
    if (auth.role === ROLES.ADMIN) {
      return (
        <Navigate
          to={ROUTES.ADMIN_DASHBOARD}
          replace
        />
      );
    }

    /*
     * Members, guests, and users with invalid/no roles
     * are returned to the public website.
     */
    return (
      <Navigate
        to={ROUTES.HOME}
        replace
      />
    );
  }

  console.log("ROLE ROUTE: Access granted.");

  return <Outlet />;
}

export default RoleRoute;