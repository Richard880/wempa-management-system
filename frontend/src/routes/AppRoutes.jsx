

import { Routes, Route, Navigate } from "react-router-dom";
import ROUTES from "../constants/routes"; // Verify this import path matches your directory

/* ==========================================
   Layouts & Structural Guards
   ========================================== */
import PublicLayout from "../layouts/PublicLayout";
import MemberLayout from "../layouts/MemberLayout";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

/* ==========================================
   Public Website Pages
   ========================================== */
import Home from "../features/public/pages/Home";
import About from "../features/public/pages/About";
import Contact from "../features/public/pages/Contact";
import Membership from "../features/public/pages/Membership";
import Events from "../features/public/pages/Events";
import News from "../features/public/pages/News";
import MemberApplicationPage from "../features/memberApplication/pages/MemberApplicationPage";

/* ==========================================
   Authentication Pages (Guarded)
   ========================================== */
import Register from "../features/auth/pages/RegisterPage";
import Login from "../features/auth/pages/LoginPage";
import VerifyEmailPage from "../features/auth/pages/VerifyEmailPage";
import ForgotPasswordPage from "../features/auth/pages/ForgotPasswordPage";

/* ==========================================
   Member Portal Pages (Protected)
   ========================================== */
import Dashboard from "../features/members/pages/Dashboard";

function App() {
  return (
    <Routes>
      {/* ==========================================
          1. PUBLIC MARKETING WEBSITE
          (Always accessible to everyone)
          ========================================== */}
      <Route element={<PublicLayout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/events" element={<Events />} />
        <Route path="/news" element={<News />} /> 
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* ==========================================
          2. AUTHENTICATION HUB (Guarded by PublicRoute)
          (Bounces verified logged-in users away to portal)
          ========================================== */}
      <Route element={<PublicRoute />}>
        {/* If your auth pages need the PublicLayout header/footer, nest it here */}
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
          <Route path={ROUTES.VERIFY_EMAIL} element={<VerifyEmailPage />} />
        </Route>
      </Route>

      {/* ==========================================
          3. MEMBER PORTAL (Protected by ProtectedRoute)
          (Strict gateway for authenticated users only)
          ========================================== */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MemberLayout />}>
          <Route path={ROUTES.MEMBER_DASHBOARD} element={<Dashboard />} />
           <Route path={ROUTES.MEMBER_APPLICATION} element={<MemberApplicationPage />} />

          {/* Future Member Sub-routes go here */}
        </Route>
      </Route>

      {/* ==========================================
          4. FALLBACK REDIRECT
          ========================================== */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}

export default App;
