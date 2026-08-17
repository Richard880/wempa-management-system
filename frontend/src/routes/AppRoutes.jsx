import {
  Routes,
  Route,
} from "react-router-dom";
import PERMISSIONS from "../constants/permissions";
import ROUTES from "../constants/routes";
import ROLES from "../constants/roles";

/* ==========================================
   Layouts
   ========================================== */
import PublicLayout from "../layouts/PublicLayout";
import MemberLayout from "../layouts/MemberLayout";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";

/* ==========================================
   Route Guards
   ========================================== */
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import PermissionRoute from "./PermissionRoute";

/* ==========================================
   Public Pages
   ========================================== */
import Home from "../features/public/pages/Home";
import About from "../features/public/pages/About";
import Contact from "../features/public/pages/Contact";
import Membership from "../features/public/pages/Membership";
import Events from "../features/public/pages/Events";
import News from "../features/public/pages/News";

/* ==========================================
   Authentication Pages
   ========================================== */
import Register from "../features/auth/pages/RegisterPage";
import Login from "../features/auth/pages/LoginPage";
import VerifyEmailPage from "../features/auth/pages/VerifyEmailPage";
import ForgotPasswordPage from "../features/auth/pages/ForgotPasswordPage";

/* ==========================================
   Member Portal Pages
   ========================================== */
import MemberDashboard from "../features/members/pages/Dashboard";
import MemberApplicationPage from "../features/memberApplication/pages/MemberApplicationPage";

/* ==========================================
   Admin Portal Pages
   ========================================== */
import AdminDashboard from "../features/admin/pages/Dashboard";
import Applications from "../features/admin/pages/Applications";
import ApplicationReview from "../features/admin/pages/ApplicationReview";
import Members from "../features/admin/pages/Members";
import MemberDetails from "../features/admin/pages/MemberDetails";
import AdminManagementPage from "../features/admin/pages/adminManagement/AdminManagementPage";

function AppRoutes() {
  return (
    <Routes>
      {/* ==========================================
          1. PUBLIC WEBSITE
          ========================================== */}
      <Route element={<PublicLayout />}>
        <Route
          path={ROUTES.HOME}
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/membership"
          element={<Membership />}
        />

        <Route
          path="/events"
          element={<Events />}
        />

        <Route
          path="/news"
          element={<News />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />
      </Route>

      {/* ==========================================
          2. AUTHENTICATION
          ========================================== */}
      <Route element={<PublicRoute />}>
        <Route element={<PublicLayout />}>
          <Route
            path={ROUTES.REGISTER}
            element={<Register />}
          />

          <Route
            path={ROUTES.LOGIN}
            element={<Login />}
          />

          <Route
            path={ROUTES.FORGOT_PASSWORD}
            element={<ForgotPasswordPage />}
          />

          <Route
            path={ROUTES.VERIFY_EMAIL}
            element={<VerifyEmailPage />}
          />
        </Route>
      </Route>

      {/* ==========================================
          3. MEMBER PORTAL
          ========================================== */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MemberLayout />}>
          <Route
            path={ROUTES.MEMBER_DASHBOARD}
            element={<MemberDashboard />}
          />

          <Route
            path={ROUTES.MEMBER_APPLICATION}
            element={<MemberApplicationPage />}
          />
        </Route>
      </Route>

      {/* ==========================================
          4. ADMIN PORTAL
          
          Only ADMIN and SUPER_ADMIN users can
          enter the Admin workspace.
          ========================================== */}
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
  {/* ==========================================
      ADMIN + SUPER ADMIN
      ========================================== */}

  <Route
    path={ROUTES.ADMIN_DASHBOARD}
    element={<AdminDashboard />}
  />

  <Route
    path={ROUTES.ADMIN_APPLICATIONS}
    element={<Applications />}
  />

  <Route
    path={ROUTES.ADMIN_APPLICATION_REVIEW}
    element={<ApplicationReview />}
  />

  {/* ==========================================
      MEMBER MANAGEMENT
      Requires VIEW_MEMBERS permission
      ========================================== */}
  <Route
    element={
      <PermissionRoute
        requiredPermissions={[
          PERMISSIONS.VIEW_MEMBERS,
        ]}
      />
    }
  >
    <Route
      path={ROUTES.ADMIN_MEMBERS}
      element={<Members />}
    />

    <Route
      path={ROUTES.ADMIN_MEMBER_DETAILS}
      element={<MemberDetails />}
    />
  </Route>

  {/* ==========================================
      SUPER ADMIN ONLY
      Requires:
      1. SUPER_ADMIN role
      2. VIEW_ADMINS permission
      ========================================== */}
  <Route
    element={
      <RoleRoute
        allowedRoles={[
          ROLES.SUPER_ADMIN,
        ]}
      />
    }
  >
    <Route
      element={
        <PermissionRoute
          requiredPermissions={[
            PERMISSIONS.VIEW_ADMINS,
          ]}
        />
      }
    >
      <Route
        path={ROUTES.ADMIN_MANAGEMENT}
        element={<AdminManagementPage />}
      />
    </Route>
  </Route>
</Route>
        </Route>
      </Route>

      {/* ==========================================
          5. FALLBACK
          ========================================== */}
      <Route
        path="*"
        element={
          <div className="p-5">
            <h1>404 Route Not Found</h1>
          </div>
        }
      />
    </Routes>
  );
}

export default AppRoutes;