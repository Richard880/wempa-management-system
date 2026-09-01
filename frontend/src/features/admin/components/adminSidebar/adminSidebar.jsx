// src/features/admin/components/AdminSidebar/AdminSidebar.jsx
import { useMemo, useState } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import useAuth from "../../../auth/hooks/useAuth";
import { SIDEBAR_STRUCTURE } from "../../shared/utils/adminConfig";
import styles from "./adminSidebar.module.css";

export default function AdminSidebar({ onNavigate }) {
  const location = useLocation();
  const { auth } = useAuth();

  const [openGroups, setOpenGroups] = useState({});

  /* ==========================================
     Role-Based Navigation
     ========================================== */
  const sidebarStructure = useMemo(() => {
    return SIDEBAR_STRUCTURE.filter((item) => {
      if (!Array.isArray(item.allowedRoles) || item.allowedRoles.length === 0) {
        return true;
      }
      
      const currentRole = auth?.role || auth?.profile?.role || "member";
      return item.allowedRoles.includes(currentRole);
    });
  }, [auth]);

  /* ==========================================
     Navigation Match Engine
     ========================================== */
  const handleNavigate = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  const toggleGroup = (id) => {
    setOpenGroups((previous) => ({
      ...previous,
      [id]: !previous[id],
    }));
  };

  /**
   * 🟢 FIXED ACUTE ROUTE PARAMETER MATCH MATRIX:
   * Compares both path strings AND url query parameters (?status=...) 
   * to isolate child links cleanly and eliminate 404 routing fall-throughs.
   */
  const isChildRouteActive = (childPath) => {
    // If the sidebar item path contains query parameters, check against both parts
    if (childPath.includes("?")) {
      const [pathPart, queryPart] = childPath.split("?");
      const normalizedQuery = "?" + queryPart;
      
      return location.pathname === pathPart && location.search === normalizedQuery;
    }
    
    // Default fallback check for standard clean base URLs with no parameters
    return location.pathname === childPath && !location.search;
  };

  return (
    <aside className={`${styles.sidebar} bg-dark text-white d-flex flex-column`}>
      {/* BRAND BRANDING BANNER */}
      <div className="p-3 border-bottom border-secondary">
        <h5 className="mb-0 text-truncate text-primary fw-bold">
          WEMPA Portal
        </h5>
        <small className="text-white-50">
          Administration Panel
        </small>
      </div>

      {/* CORE INTERACTIVE LABELS RUNWAY */}
      <nav className={`flex-grow-1 overflow-y-auto py-3 px-2 ${styles.navigation}`}>
        <ul className="nav nav-pills flex-column gap-1">
          {sidebarStructure.map((item) => {
            /* ======================================
               STANDARD INTERACTIVE PATHWAY LINKS
               ====================================== */
            if (item.type === "link") {
              return (
                <li key={item.id || item.path} className="nav-item">
                  <NavLink
                    to={item.path}
                    end={item.path === "/admin"}
                    onClick={handleNavigate}
                    className={({ isActive }) =>
                      `nav-link text-white d-flex align-items-center gap-2 ${
                        isActive ? "active bg-primary" : styles.navHover
                      }`
                    }
                  >
                    <i className={`bi ${item.icon}`} aria-hidden="true" />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              );
            }

            /* ======================================
               NAVIGATION GROUP DROPDOWN DECK
               ====================================== */
            if (item.type === "group") {
              const isGroupOpen = Boolean(openGroups[item.id]);

              // Check if any sub-child rows are currently active inside the viewport canvas
              const isChildActive = Array.isArray(item.children) && item.children.some((child) =>
                isChildRouteActive(child.path)
              );

              return (
                <li key={item.id} className="nav-item">
                  <button
                    type="button"
                    onClick={() => toggleGroup(item.id)}
                    className={`btn text-white w-100 d-flex align-items-center justify-content-between p-2 rounded ${styles.groupButton}`}
                    aria-expanded={isGroupOpen || isChildActive}
                  >
                    <span className="d-flex align-items-center gap-2">
                      <i className={`bi ${item.icon} text-white-50`} aria-hidden="true" />
                      <span>{item.label}</span>
                    </span>

                    <i
                      className={`bi bi-chevron-right small ${styles.chevron} ${
                        isGroupOpen || isChildActive ? styles.chevronOpen : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {(isGroupOpen || isChildActive) && item.children && (
  <ul className="nav flex-column ms-3 mt-1 gap-1 border-start border-secondary ps-2">
    {item.children.map((child) => {
      // 🟢 COMPUTE ACTIVE STATUS EXPLICITLY USING QUERY STRINGS
      const isThisLinkActive = isChildRouteActive(child.path);

      return (
        <li key={child.path}>
          <Link
            to={child.path}
            onClick={handleNavigate}
            className={`nav-link py-1 px-2 small rounded ${
              isThisLinkActive
                ? "text-white bg-secondary fw-bold" // Active highlighted sub-tab
                : "text-white-50"
            }`}
          >
            {child.label}
          </Link>
        </li>
      );
    })}
  </ul>
)}

                </li>
              );
            }

            return null;
          })}
        </ul>
      </nav>

      {/* DISPATCH TO MAIN WEBSITE PUBLIC CHANNELS */}
      <div className={`p-3 border-top border-secondary ${styles.publicWebsite}`}>
        <Link
          to="/"
          onClick={handleNavigate}
          className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2"
        >
          <i className="bi bi-box-arrow-up-right" aria-hidden="true" />
          <span>Back to Website</span>
        </Link>
      </div>
    </aside>
  );
}
