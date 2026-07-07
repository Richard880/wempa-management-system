import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Navbar from "./components/layout/navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";

import AdminRoute from "./components/adminRoute";
import ProtectedRoute from "./components/protectedRoute";

import Payments from "./pages/user/payments";
import DigitalCard from "./pages/user/digitalCard";
import VerifyMember from "./pages/verifyMember";
import Profile from "./pages/user/profile";
import Membership from "./pages/user/membership";

import AdminDashboard from "./pages/admin/adminDashboard";
import Members from "./pages/admin/members";
import Applications from "./pages/admin/applications";
import MemberDetails from "./pages/admin/memberDetails";

import AdminPayments from "./pages/admin/AdminPayments";
import Revenue from "./pages/admin/Revenue";
import Newsletters from "./pages/admin/Newsletters";
import Events from "./pages/admin/Events";
import Reports from "./pages/admin/Reports";
import Feedback from "./pages/admin/Feedback";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/applications"
          element={
            <AdminRoute>
              <Applications />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/members"
          element={
            <AdminRoute>
              <Members />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/member/:id"
          element={
            <AdminRoute>
              <MemberDetails />
            </AdminRoute>
          }
        />

        <Route
          path="/membership"
          element={
            <ProtectedRoute>
              <Membership />
            </ProtectedRoute>
          }
        />

        <Route
          path="/card"
          element={
            <ProtectedRoute>
              <DigitalCard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <Payments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="/verify/:membershipNumber" element={<VerifyMember />} />

        <Route
          path="/admin/payments"
          element={
            <AdminRoute>
              <AdminPayments />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/revenue"
          element={
            <AdminRoute>
              <Revenue />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/news"
          element={
            <AdminRoute>
              <Newsletters />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/events"
          element={
            <AdminRoute>
              <Events />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <AdminRoute>
              <Reports />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/feedback"
          element={
            <AdminRoute>
              <Feedback />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
