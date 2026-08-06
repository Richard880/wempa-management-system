import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "../features/auth/hooks/useAuth";
import ROUTES from "../constants/routes";

import Spinner from "../components/ui/Spinner/Spinner";

function ProtectedRoute() {
  const { auth } = useAuth();
  const location = useLocation();

  if (auth.loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner />
      </div>
    );
  }

  if (!auth.authenticated) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;