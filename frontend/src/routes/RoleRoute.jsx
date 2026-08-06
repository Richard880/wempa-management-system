import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../features/auth/hooks/useAuth";
import ROUTES from "../constants/routes";
import PageLoader from "../components/common/PageLoader";

function RoleRoute({ allowedRoles = [] }) {
  const { auth } = useAuth();

  if (auth.loading) {
    return <PageLoader />;
  }

  if (!auth.authenticated) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
      />
    );
  }

  if (!allowedRoles.includes(auth.role)) {
    return (
      <Navigate
        to={ROUTES.HOME}
        replace
      />
    );
  }

  return <Outlet />;
}

export default RoleRoute;