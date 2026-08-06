// src/routes/memberRoutes.js
import ROUTES from "../constants/routes";
import ProtectedRoute from "./ProtectedRoute";
import MemberDashboard from "../features/members/pages/Dashboard";
import MemberApplicationPage from "../features/memberApplication/pages/MemberApplicationPage";

export const memberRoutes = {
  element: <ProtectedRoute />,
  children: [
    { path: ROUTES.MEMBER_DASHBOARD, element: <MemberDashboard /> },
    { path: ROUTES.MEMBER_APPLICATION, element: <MemberApplicationPage /> },
  ],
};
