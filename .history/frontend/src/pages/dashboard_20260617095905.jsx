import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

function Dashboard() {
  return (
    <div>
      <h1>WEMPA Dashboard</h1>

      <Link to="/profile">
        <button>My Profile</button>
      </Link>

      <br /><br />

      <Link to="/membership">
        <button>Membership Application</button>
      </Link>

      <br /><br />

      <LogoutButton />
    </div>
  );
}

export default Dashboard;