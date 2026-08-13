import { Fragment } from "react";
import { Route } from "react-router-dom";

import ROUTES from "../constants/routes";
import ROLES from "../constants/roles";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../features/admin/pages/Dashboard";

function AdminRoutes() {
  return (
    <Fragment>
      <Route element={<ProtectedRoute />}>
        <Route
          element={
            <RoleRoute
              allowedRoles={[
                ROLES.SUPER_ADMIN,
                ROLES.ADMIN,
              ]}
            />
          }
        >
          <Route element={<AdminLayout />}>
            <Route
              path={ROUTES.ADMIN_DASHBOARD}
              element={<Dashboard />}
            />
          </Route>
        </Route>
      </Route>
    </Fragment>
  );
}

export default AdminRoutes;