import { Link, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div
        style={{
          width: "260px",
          background: "#002147",
          color: "white",
          padding: "20px",
        }}
      >
        <h2>WEMPA ADMIN</h2>

        <hr />

        <p>
          <Link to="/admin" style={{ color: "white" }}>
            Dashboard
          </Link>
        </p>

        <p>
          <Link to="/admin/members" style={{ color: "white" }}>
            Members
          </Link>
        </p>

        <p>
          <Link to="/admin/applications" style={{ color: "white" }}>
            Applications
          </Link>
        </p>

        <p>
          <Link to="/admin/payments" style={{ color: "white" }}>
            Payments
          </Link>
        </p>

        <p>
          <Link to="/admin/revenue" style={{ color: "white" }}>
            Revenue
          </Link>
        </p>

        <p>
          <Link to="/admin/news" style={{ color: "white" }}>
            Newsletters
          </Link>
        </p>

        <p>
          <Link to="/admin/events" style={{ color: "white" }}>
            Events
          </Link>
        </p>

        <p>
          <Link to="/admin/feedback" style={{ color: "white" }}>
            Feedback
          </Link>
        </p>

        <p>
          <Link to="/admin/reports" style={{ color: "white" }}>
            Reports
          </Link>
        </p>
      </div>

      <div
        style={{
          flex: 1,
          padding: "30px",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
