import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div>
      <h1>WEMPA ADMIN DASHBOARD</h1>

      <br />

      <Link to="/admin/members">
        <button>View Members</button>
      </Link>

      <br />
      <br />

      <Link to="/admin/applications">
        <button>Membership Applications</button>
      </Link>
    </div>
  );
}

export default AdminDashboard;
