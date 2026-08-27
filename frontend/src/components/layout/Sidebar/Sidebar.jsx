// src/features/dashboard/components/layout/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import ROUTES from "../../../constants/routes";
import styles from "./Sidebar.module.css"; 

// 1. IMPORT YOUR AUTH HOOK
import useAuth from "../../../features/auth/hooks/useAuth"; // Ensured matching hook signature matching your AdminSidebar

export default function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();
  
  // 👇 2. EXTRACT AUTH WITH THE EXACT SAME LAYOUT SIGNATURE AS YOUR ADMIN SIDEBAR
  const { auth } = useAuth();
  
  // Extract role directly from auth.role, matching your working administration logic
  const userRole = auth?.role || "";
  const isAdminOrSuperAdmin = ["admin", "super_admin"].includes(userRole.toLowerCase());

  const isActive = (path) => location.pathname === path 
    ? styles.activeLink 
    : styles.inactiveLink;

  // 3. DEFINE BASE USER NAV LINKS
  const navLinks = [
    { path: ROUTES.MEMBER_DASHBOARD, icon: "bi-speedometer2", label: "Dashboard" },
    { path: ROUTES.MEMBER_APPLICATION, icon: "bi-card-checklist", label: "Membership" },
    { path: ROUTES.MEMBER_PROFILE, icon: "bi-person-badge", label: "Profile" },
    { path: "/payments", icon: "bi-credit-card-2-front", label: "Payments" },
  ];

  // 👇 4. INJECT ADMIN PORTAL LINK IF EXPLICIT MATCH DETECTED
  if (isAdminOrSuperAdmin) {
    navLinks.push({
      path: ROUTES.ADMIN_DASHBOARD, // Redirects straight to the root administration route bundle entry point
      icon: "bi-shield-lock-fill text-warning", 
      label: "Admin Portal",
    });
  }

  return (
    <>
      {/* Mobile Overlay: Closes sidebar when clicking outside on mobile */}
      <div 
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ""}`} 
        onClick={toggleSidebar} 
      />

      <div className={`${styles.sidebarWrapper} ${isOpen ? styles.sidebarOpen : ""}`}>
        {/* Sidebar Header */}
        <div className={styles.sidebarBrand}>
          <h4 className="fw-extrabold text-white mb-1 d-flex align-items-center gap-2">
            <i className="bi bi-anchor text-warning fs-4" /> WEMPA
          </h4>
          <span className={styles.brandSubtitle}>Member Workspace</span>
        </div>

        {/* Action Link: Back to Public Site */}
        <div className="my-4">
          <Link 
            to={ROUTES.HOME}
            className={`btn btn-outline-light btn-sm w-100 ${styles.backButton}`}
            onClick={() => window.innerWidth < 992 && toggleSidebar()}
          >
            <i className="bi bi-arrow-left-short fs-5" />
            <span>Back to Public Site</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="nav flex-column gap-2 flex-grow-1">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`nav-link ${styles.navLink} ${isActive(link.path)}`}
              onClick={() => window.innerWidth < 992 && toggleSidebar()}
            >
              <i className={`${link.icon} fs-5`} />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className={styles.sidebarFooter}>
          <div className="d-flex align-items-center gap-2 px-2">
            <i className="bi bi-patch-check-fill text-warning" />
            <span className="text-white-50 small opacity-70">WEMPA Portal v2.6</span>
          </div>
        </div>
      </div>
    </>
  );
}
