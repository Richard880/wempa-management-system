import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../features/auth/hooks/useAuth";
import ROUTES from "../constants/routes";
import ROLES from "../constants/roles";
import PageLoader from "../components/common/PageLoader";

function PermissionRoute({
  requiredPermissions = [],
  requireAll = false,
}) {
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

  const userPermissions = auth.permissions || [];

  const hasPermission =
    requiredPermissions.length === 0
      ? true
      : requireAll
        ? requiredPermissions.every((permission) =>
            userPermissions.includes(permission)
          )
        : requiredPermissions.some((permission) =>
            userPermissions.includes(permission)
          );

  if (!hasPermission) {
    if (
      auth.role === ROLES.ADMIN ||
      auth.role === ROLES.SUPER_ADMIN
    ) {
      return (
        <Navigate
          to={ROUTES.ADMIN_DASHBOARD}
          replace
        />
      );
    }

    if (auth.role === ROLES.MEMBER) {
      return (
        <Navigate
          to={ROUTES.MEMBER_DASHBOARD}
          replace
        />
      );
    }

    return (
      <Navigate
        to={ROUTES.HOME}
        replace
      />
    );
  }

  return <Outlet />;
}

export default PermissionRoute;