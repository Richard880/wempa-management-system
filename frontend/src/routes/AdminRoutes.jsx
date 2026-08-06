import { Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import ROUTES from "../constants/routes";

import AdminDashboard from "../features/admin/pages/Dashboard";

function AdminRoutes() {
  return (
    <Route element={<ProtectedRoute />}>
      <Route
        path={ROUTES.ADMIN_DASHBOARD}
        element={<AdminDashboard />}
      />
    </Route>
  );
}

export default AdminRoutes;