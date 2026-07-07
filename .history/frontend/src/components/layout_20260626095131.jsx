import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          background: "#003366",
          color: "white",
          padding: "20px",
        }}
      >
        <h2>WEMPA</h2>

        <hr />

        <p><Link to="/" style={{color:"white"}}>Dashboard</Link></p>

        <p><Link to="/membership" style={{color:"white"}}>Membership</Link></p>

        <p><Link to="/card" style={{color:"white"}}>Digital Card</Link></p>

        <p><Link to="/payments" style={{color:"white"}}>Payments</Link></p>

        <p><Link to="/profile" style={{color:"white"}}>Profile</Link></p>
      </div>

      {/* Content */}

      <div
        style={{
          flex:1,
          padding:"30px"
        }}
      >
        <Outlet />
      </div>

    </div>
  );
}

export default Layout;