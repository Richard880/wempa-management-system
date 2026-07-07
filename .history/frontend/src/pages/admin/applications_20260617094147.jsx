import { collection, getDocs } from "firebase/firestore";

import { db } from "../../firebase/config";

import { useEffect, useState } from "react";

import { doc, updateDoc } from "firebase/firestore";

import { generateMembershipNumber } from "../../utils/generateMembershipNumber";

function Applications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const snapshot = await getDocs(collection(db, "memberships"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setApplications(data);
    };

    fetchApplications();
  }, []);


  const approveMembership = async (application) => {
    try {
      const membershipNumber = await generateMembershipNumber();

      // Update membership record
      await updateDoc(doc(db, "memberships", application.id), {
        status: "Active",
        membershipNumber,
        approvedDate: new Date(),
      });

      // Update user record
      await updateDoc(doc(db, "users", application.userId), {
        membershipStatus: "Active",
        membershipNumber,
      });

      alert(`Approved: ${membershipNumber}`);

      window.location.reload();
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Membership Applications</h1>

      {applications.map((app) => (
        <div
          key={app.id}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
          }}
        >
          <p>County: {app.county}</p>

          <p>Vessel: {app.vesselType}</p>

          <p>Status: {app.status}</p>
        </div>
      ))}
    </div>
  );
}

export default Applications;
