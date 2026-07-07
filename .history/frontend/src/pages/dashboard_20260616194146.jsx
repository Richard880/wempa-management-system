import { auth } from "../firebase/config";

function Dashboard() {
  const user = auth.currentUser;

  return (
    <div>
      <h1>Member Dashboard</h1>

      <p>Logged in as:</p>

      <h3>{user?.email}</h3>
    </div>
  );
}

export default Dashboard;
