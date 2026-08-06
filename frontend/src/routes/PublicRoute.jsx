// src/routes/PublicRoute.jsx
import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuth from "../features/auth/hooks/useAuth";
import PageLoader from "../components/common/PageLoader";
import ROUTES from "../constants/routes";

function PublicRoute() {
  const { auth } = useAuth();
  const location = useLocation(); // 🟢 Tracks current location URL path parameters

  console.log("PublicRoute structural guard checking:", auth);

  // 1. Maintain viewport loading state lock until Firebase handshakes resolve
  if (auth.loading) {
    return <PageLoader />;
  }

  // 2. INTERCEPT AUTHENTICATED USER SESSIONS
  if (auth.authenticated || auth.currentUser) {
    // Read user status from our live token or structural fallback profile record
    const isEmailVerified = auth.currentUser?.emailVerified || auth.profile?.emailVerified;

    // 🟢 EMAIL VERIFICATION GATEWAY FILTER:
    if (!isEmailVerified) {
      // If unverified user is actively requesting the verification route, let them pass into layout
      if (location.pathname === ROUTES.VERIFY_EMAIL) {
        return <Outlet />;
      }
      // If trying to access /login or /register while unverified, force redirect back to verify page
      return <Navigate to={ROUTES.VERIFY_EMAIL} replace />;
    }

    // 3. If completely logged in and verified, bounce them away from public pages straight to portal dashboard
    return <Navigate to={ROUTES.MEMBER_DASHBOARD} replace />;
  }

  // 4. If true guest, allow clean entry into public layouts
  return <Outlet />;
}

export default PublicRoute;
