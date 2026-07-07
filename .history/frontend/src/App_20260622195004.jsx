import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Navbar from "./components/navbar";
import Membership from "./pages/membership";
import Profile from "./pages/profile";
import AdminDashboard from "./pages/admin/adminDashboard";

import Applications from "./pages/admin/applications";
import AdminRoute from "./components/adminRoute";
import ProtectedRoute from "./components/protectedRoute";

import Members from "./pages/admin/Members";
import MemberDetails from "./pages/admin/MemberDetails";
import DigitalCard from "./pages/DigitalCard";
import VerifyMember from "./pages/VerifyMember";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
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

        <Route
          path="/membership"
          element={
            <ProtectedRoute>
              <Membership />
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
          path="/card"
          element={
            <ProtectedRoute>
              <DigitalCard />
            </ProtectedRoute>
          }
        />

        <Route path="/verify/:membershipNumber" element={<VerifyMember />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
