import { Outlet, Navigate, useLocation } from "react-router-dom";

import useAuth from "../features/auth/hooks/useAuth";
import PageLoader from "../components/common/PageLoader";

import ROUTES from "../constants/routes";
import getDefaultRouteByRole from "../utils/getDefaultRouteByRole";

function PublicRoute() {
  const { auth } = useAuth();
  const location = useLocation();

  console.log("PublicRoute structural guard checking:", auth);

  // Wait until authentication and profile resolution are complete.
  if (auth.loading) {
    return <PageLoader />;
  }

  // Allow guests to access public authentication routes.
  if (!auth.authenticated) {
    return <Outlet />;
  }

  const isEmailVerified =
    auth.currentUser?.emailVerified ||
    auth.profile?.emailVerified;

  // Keep unverified users inside the email verification flow.
  if (!isEmailVerified) {
    if (location.pathname === ROUTES.VERIFY_EMAIL) {
      return <Outlet />;
    }

    return (
      <Navigate
        to={ROUTES.VERIFY_EMAIL}
        replace
      />
    );
  }

  // Send authenticated and verified users to the correct
  // workspace according to their Firestore role.
  const defaultRoute = getDefaultRouteByRole(auth.role);

  console.log("PublicRoute role redirect:", {
    role: auth.role,
    destination: defaultRoute,
  });

  return (
    <Navigate
      to={defaultRoute}
      replace
    />
  );
}

export default PublicRoute;