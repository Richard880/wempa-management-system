import { useState } from "react";

import { Outlet } from "react-router-dom";

import AdminSidebar from "../../features/admin/components/adminSidebar/adminSidebar";

import AdminProfile from "../../features/admin/components/adminProfile/AdminProfile";

import styles from "./adminLayout.module.css";


export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);


  /* ==========================================
     Sidebar Controls
  ========================================== */

  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };


  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };


  return (
    <div
      className={`container-fluid p-0 ${styles.layoutContainer}`}
    >
      <div className={styles.layoutShell}>

        {/* ==========================================
            MOBILE BACKDROP
        ========================================== */}

        {sidebarOpen && (
          <button
            type="button"
            className={styles.sidebarBackdrop}
            onClick={handleCloseSidebar}
            aria-label="Close navigation menu"
          />
        )}


        {/* ==========================================
            SIDEBAR
        ========================================== */}

        <aside
  id="admin-sidebar"
  className={`${styles.sidebarWrapper} ${
    sidebarOpen
      ? styles.sidebarOpen
      : ""
  }`}
>
  <AdminSidebar
    onNavigate={handleCloseSidebar}
  />
</aside>


        {/* ==========================================
            MAIN APPLICATION
        ========================================== */}

        <div className={styles.mainLayout}>

          {/* ==========================================
              HEADER
          ========================================== */}

      

<header
  className={`navbar navbar-expand navbar-light bg-white border-bottom shadow-sm sticky-top ${styles.header}`}
>
  <div className="container-fluid p-0 d-flex justify-content-between align-items-center gap-3">

    <div className="d-flex align-items-center gap-2 min-w-0">

      {/* Mobile Sidebar Toggle */}

      <button
  type="button"
  className={`btn btn-outline-secondary d-lg-none ${styles.menuButton}`}
  onClick={handleOpenSidebar}
  aria-label="Open navigation menu"
  aria-expanded={sidebarOpen}
  aria-controls="admin-sidebar"
>
  <i
    className="bi bi-list fs-5"
    aria-hidden="true"
  />
</button>


      <span className="navbar-brand mb-0 h1 fs-6 fs-md-5 fw-semibold text-secondary text-truncate">
        Management Workspace
      </span>

    </div>


    <div className="d-flex align-items-center gap-2 gap-md-3 flex-shrink-0">

      <span className="badge bg-danger-subtle text-danger px-2 py-1 rounded-pill d-none d-lg-inline-block">
        Production Node
      </span>


      <AdminProfile />

    </div>

  </div>
</header>


          {/* ==========================================
              PAGE CONTENT
          ========================================== */}

          <main className={styles.mainContent}>
            <div className="container-fluid p-0">
              <Outlet />
            </div>
          </main>


          {/* ==========================================
              FOOTER
          ========================================== */}

          <footer
            className={`bg-white border-top text-center ${styles.footer}`}
          >
            <small className="text-muted">
              &copy; {new Date().getFullYear()} WEMPA Systems Global Platform. All Rights Reserved.
            </small>
          </footer>

        </div>

      </div>
    </div>
  );
}


export default AdminLayout;