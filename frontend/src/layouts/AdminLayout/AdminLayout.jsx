import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../features/admin/components/adminSidebar/adminSidebar';
import styles from './adminLayout.module.css';

export  function AdminLayout() {
  return (
    <div className={`container-fluid p-0 d-flex ${styles.layoutContainer}`}>
      <div className={styles.sidebarWrapper}>
        <AdminSidebar />
      </div>
      
      <div className="d-flex flex-column flex-grow-1 min-vh-100 bg-light">
        <header className="navbar navbar-expand navbar-light bg-white border-bottom shadow-sm px-4 sticky-top">
          <div className="container-fluid p-0 d-flex justify-content-between align-items-center">
            <span className="navbar-brand mb-0 h1 fs-5 fw-semibold text-secondary">
              Management Workspace
            </span>
            <div className="d-flex align-items-center gap-3">
              <span className="badge bg-danger-subtle text-danger px-2 py-1 rounded-pill">Production Node</span>
            </div>
          </div>
        </header>

        <main className="flex-grow-1 p-4 overflow-x-hidden">
          <div className="container-fluid p-0">
            <Outlet />
          </div>
        </main>

        <footer className="footer bg-white border-top py-3 px-4 text-center mt-auto">
          <small className="text-muted">
            &copy; {new Date().getFullYear()} WEMPA Systems Global Platform. All Rights Reserved.
          </small>
        </footer>
      </div>
    </div>
  );
}

export default AdminLayout;
