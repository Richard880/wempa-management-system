import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Link } from "react-router-dom";

function AdminDashboard() {

  const [totalUsers, setTotalUsers] = useState(0);
  const [activeMembers, setActiveMembers] = useState(0);
  const [pendingApplications, setPendingApplications] = useState(0);

  useEffect(() => {

    const loadStats = async () => {

      const usersSnapshot =
        await getDocs(collection(db, "users"));

      const membershipsSnapshot =
        await getDocs(collection(db, "memberships"));

      setTotalUsers(usersSnapshot.size);

      const active =
        usersSnapshot.docs.filter(
          doc =>
          doc.data().membershipStatus === "Active"
        );

      setActiveMembers(active.length);

      const pending =
        membershipsSnapshot.docs.filter(
          doc =>
          doc.data().status === "Pending"
        );

      setPendingApplications(
        pending.length
      );
    };

    loadStats();

  }, []);

  return (

    <div>

      <h1>WEMPA Admin Dashboard</h1>

      <hr />

      <h3>Total Users: {totalUsers}</h3>

      <h3>
        Active Members:
        {activeMembers}
      </h3>

      <h3>
        Pending Applications:
        {pendingApplications}
      </h3>

      <hr />

      <Link to="/admin/members">
        View Members
      </Link>

      <br />

      <Link to="/admin/applications">
        Membership Applications
      </Link>

    </div>
  );
}

export default AdminDashboard;