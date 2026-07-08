import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <div
      style={{
        width: "250px",
        background: "#003366",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h2>WEMPA</h2>

      <Link to="/admin" style={{ color: "white" }}>
        Dashboard
      </Link>

      <br />
      <br />

      <Link to="/admin/members" style={{ color: "white" }}>
        Members
      </Link>

      <br />
      <br />

      <Link to="/admin/applications" style={{ color: "white" }}>
        Applications
      </Link>
    </div>
  );
}

export default AdminSidebar;
