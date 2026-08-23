// src/features/dashboard/components/layout/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import ROUTES from "../../constants/routes"; // 🟢 Verified accurate component folder nesting path depth

export default function Sidebar() {
  const location = useLocation();

  // 🟢 Fixed Specificity Selection: Injecting custom overrides directly inline alongside bootstrap classes
  const isActive = (path) => location.pathname === path 
    ? { backgroundColor: "rgba(255, 255, 255, 0.15)", fontWeight: "700", color: "#ffffff" } 
    : { color: "rgba(255, 255, 255, 0.65)" };

  return (
    <div
      className="sidebar-wrapper d-flex flex-column p-4 border-end border-white border-opacity-10"
      style={{
        width: "260px",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #002244 0%, #003366 100%)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        transition: "all 0.3s ease"
      }}
    >
      {/* Sidebar Header Brand Node */}
      <div className="sidebar-brand border-bottom border-white border-opacity-10 pb-3 text-start">
        <h4 className="fw-extrabold text-white mb-1 font-monospace tracking-wide d-flex align-items-center gap-2">
          <i className="bi bi-anchor text-warning fs-4" /> WEMPA
        </h4>
        <span className="text-white-50 small font-monospace opacity-60 text-uppercase" style={{ fontSize: "0.65rem", letterSpacing: "1px" }}>
          Member Workspace
        </span>
      </div>

      {/* ACTION NAV BLOCK: Back to Main Website Portal Link */}
      <div className="my-4 text-start">
        <Link 
          to={ROUTES.HOME}
          className="btn btn-outline-light btn-sm w-100 d-inline-flex align-items-center justify-content-center gap-2 py-2 fw-semibold opacity-75 text-decoration-none"
          style={{ transition: "all 0.2s ease", borderRadius: "8px", fontSize: "0.8rem" }}
          onMouseEnter={(e) => e.target.classList.remove("opacity-75")}
          onMouseLeave={(e) => e.target.classList.add("opacity-75")}
        >
          <i className="bi bi-arrow-left-short fs-5 lh-1" />
          <span>Back to Public Site</span>
        </Link>
      </div>

      {/* Navigation Stack Module Nodes */}
      <nav className="nav flex-column gap-2 flex-grow-1 text-start">
        <Link 
          to={ROUTES.MEMBER_DASHBOARD} 
          className="nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded-3 text-decoration-none"
          style={{ transition: "all 0.25s ease", ...isActive(ROUTES.MEMBER_DASHBOARD) }}
        >
          <i className="bi bi-speedometer2 fs-5" />
          <span>Dashboard</span>
        </Link>

        <Link 
          to={ROUTES.MEMBER_APPLICATION} 
          className="nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded-3 text-decoration-none"
          style={{ transition: "all 0.25s ease", ...isActive(ROUTES.MEMBER_APPLICATION) }}
        >
          <i className="bi bi-card-checklist fs-5" />
          <span>Membership</span>
        </Link>

        <Link 
          to={ROUTES.MEMBER_PROFILE} 
          className="nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded-3 text-decoration-none"
          style={{ transition: "all 0.25s ease", ...isActive(ROUTES.MEMBER_PROFILE) }}
        >
          <i className="bi bi-person-badge fs-5" />
          <span>Profile</span>
        </Link>

        <Link 
          to="/payments" 
          className="nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded-3 text-decoration-none"
          style={{ transition: "all 0.25s ease", ...isActive("/payments") }}
        >
          <i className="bi bi-credit-card-2-front fs-5" />
          <span>Payments</span>
        </Link>
      </nav>

      {/* Workspace Footer Block */}
      <div className="sidebar-footer border-top border-white border-opacity-10 pt-3 text-start">
        <div className="d-flex align-items-center gap-2.5 px-2">
          <i className="bi bi-patch-check-fill text-warning" />
          <span className="text-white-50 small opacity-70">WEMPA Portal v2.6</span>
        </div>
      </div>
    </div>
  );
}
