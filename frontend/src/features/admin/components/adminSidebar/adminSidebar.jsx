import { useState } from "react";
import {
  NavLink,
  useLocation,
  Link,
} from "react-router-dom";

import { SIDEBAR_STRUCTURE } from "../../shared/utils/adminConfig";

import styles from "./adminSidebar.module.css";


export default function AdminSidebar({
  onNavigate,
}) {
  const location = useLocation();

  const [openGroups, setOpenGroups] =
    useState({});


  /* ==========================================
     Navigation
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


  return (
    <aside
      className={`${styles.sidebar} bg-dark text-white d-flex flex-column`}
    >
      {/* ==========================================
          BRAND
      ========================================== */}

      <div className="p-3 border-bottom border-secondary">
        <h5 className="mb-0 text-truncate text-primary fw-bold">
          WEMPA Portal
        </h5>

        <small className="text-white-50">
          Administration Panel
        </small>
      </div>


      {/* ==========================================
          NAVIGATION
      ========================================== */}

      <nav
        className={`flex-grow-1 overflow-y-auto py-3 px-2 ${styles.navigation}`}
      >
        <ul className="nav nav-pills flex-column gap-1">
          {SIDEBAR_STRUCTURE.map((item) => {
            if (item.type === "link") {
              return (
                <li
                  key={item.id || item.path}
                  className="nav-item"
                >
                  <NavLink
                    to={item.path}
                    end={item.path === "/admin"}
                    onClick={handleNavigate}
                    className={({ isActive }) =>
                      `nav-link text-white d-flex align-items-center gap-2 ${
                        isActive
                          ? "active bg-primary"
                          : styles.navHover
                      }`
                    }
                  >
                    <i
                      className={`bi ${item.icon}`}
                      aria-hidden="true"
                    />

                    <span>{item.label}</span>
                  </NavLink>
                </li>
              );
            }


            if (item.type === "group") {
              const isGroupOpen =
                openGroups[item.id];

              const isChildActive =
                item.children.some(
                  (child) =>
                    location.pathname === child.path
                );


              return (
                <li
                  key={item.id}
                  className="nav-item"
                >
                  <button
                    type="button"
                    onClick={() =>
                      toggleGroup(item.id)
                    }
                    className={`btn text-white w-100 d-flex align-items-center justify-content-between p-2 rounded ${styles.groupButton}`}
                    aria-expanded={
                      isGroupOpen || isChildActive
                    }
                  >
                    <span className="d-flex align-items-center gap-2">
                      <i
                        className={`bi ${item.icon} text-white-50`}
                        aria-hidden="true"
                      />

                      <span>{item.label}</span>
                    </span>

                    <i
                      className={`bi bi-chevron-right small ${styles.chevron} ${
                        isGroupOpen || isChildActive
                          ? styles.chevronOpen
                          : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>


                  {(isGroupOpen || isChildActive) && (
                    <ul className="nav flex-column ms-3 mt-1 gap-1 border-start border-secondary ps-2">
                      {item.children.map((child) => (
                        <li key={child.path}>
                          <NavLink
                            to={child.path}
                            onClick={handleNavigate}
                            className={({
                              isActive,
                            }) =>
                              `nav-link py-1 px-2 small rounded ${
                                isActive
                                  ? "text-white bg-secondary fw-bold"
                                  : `text-white-50 ${styles.subNavHover}`
                              }`
                            }
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            }

            return null;
          })}
        </ul>
      </nav>


      {/* ==========================================
          PUBLIC WEBSITE
      ========================================== */}

      <div
        className={`p-3 border-top border-secondary ${styles.publicWebsite}`}
      >
        <Link
          to="/"
          onClick={handleNavigate}
          className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2"
        >
          <i
            className="bi bi-box-arrow-up-right"
            aria-hidden="true"
          />

          Back to Website
        </Link>
      </div>
    </aside>
  );
}