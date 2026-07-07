import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";

function AdminLayout() {
  return (
    <div className="d-flex">
      <Sidebar />

      <main
        className="flex-grow-1"
        style={{
          minHeight: "100vh",
          background: "#f4f7fb",
          padding: "30px",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
