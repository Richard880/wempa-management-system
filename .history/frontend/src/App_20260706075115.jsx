import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ===========================
   Public Layout
=========================== */
import PublicLayout from "./layouts/PublicLayout";

/* ===========================
   User Layout
=========================== */
import UserLayout from "./layouts/UserLayout";

/* ===========================
   Admin Layout
=========================== */
import AdminLayout from "./layouts/AdminLayout";

/* ===========================
   Public Pages
=========================== */
import Home from "./pages/public/home";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import Membership from "./pages/public/Membership";
import Events from "./pages/public/Events";
import News from "./pages/public/News";
import Downloads from "./pages/public/Downloads";
import FAQ from "./pages/public/FAQ";
import Terms from "./pages/public/Terms";
import FAQ from "./pages/public/FAQ";

/* ===========================
   User Pages
=========================== */
import Dashboard from "./pages/user/Dashboard";

// Future Pages
// import Profile from "./pages/user/Profile";
// import Payments from "./pages/user/Payments";
// import MembershipCard from "./pages/user/MembershipCard";
// import Notifications from "./pages/user/Notifications";

/* ===========================
   Admin Pages
=========================== */
import AdminDashboard from "./pages/admin/AdminDashboard";

// Future Admin Pages
// import Users from "./pages/admin/Users";
// import EventsManagement from "./pages/admin/EventsManagement";
// import MembershipApplications from "./pages/admin/MembershipApplications";
// import PaymentsManagement from "./pages/admin/PaymentsManagement";

/* ===========================
   Route Protection
=========================== */
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ===========================
            PUBLIC WEBSITE
        ============================ */}

        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/membership" element={<Membership />} />

          <Route path="/events" element={<Events />} />

          <Route path="/news" element={<News />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/faq" element={<FAQ />} />

          <Route path="/downloads" element={<Downloads />} />

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          <Route path="/terms" element={<Terms />} />
        </Route>

        <Route path="*" element={<NotFound />} />

        {/* ===========================
            MEMBER PORTAL
        ============================ */}

        <Route
          element={
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Future User Pages */}

          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/payments" element={<Payments />} /> */}
          {/* <Route path="/membership-card" element={<MembershipCard />} /> */}
          {/* <Route path="/notifications" element={<Notifications />} /> */}
        </Route>

        {/* ===========================
            ADMIN PORTAL
        ============================ */}

        <Route
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Future Admin Pages */}

          {/* <Route path="/admin/users" element={<Users />} /> */}
          {/* <Route path="/admin/events" element={<EventsManagement />} /> */}
          {/* <Route path="/admin/applications" element={<MembershipApplications />} /> */}
          {/* <Route path="/admin/payments" element={<PaymentsManagement />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
