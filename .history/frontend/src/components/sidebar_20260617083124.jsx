import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={{
      width: "250px",
      minHeight: "100vh",
      background: "#003366",
      color: "white",
      padding: "20px"
    }}>
      <h2>WEMPA</h2>

      <Link to="/dashboard">Dashboard</Link>
      <br /><br />

      <Link to="/membership">Membership</Link>
      <br /><br />

      <Link to="/profile">Profile</Link>
      <br /><br />

      <Link to="/payments">Payments</Link>
    </div>
  );
}

export default Sidebar;