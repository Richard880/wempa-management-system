import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        background: "#003366",
        color: "white",
      }}
    >
      <h2>WEMPA</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={{ color: "white" }}>
          Home
        </Link>

        <Link to="/about" style={{ color: "white" }}>
          About
        </Link>

        <Link to="/membership" style={{ color: "white" }}>
          Membership
        </Link>

        <Link to="/contact" style={{ color: "white" }}>
          Contact
        </Link>

        <Link to="/login" style={{ color: "white" }}>
          Login
        </Link>

        <Link to="/register" style={{ color: "white" }}>
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
