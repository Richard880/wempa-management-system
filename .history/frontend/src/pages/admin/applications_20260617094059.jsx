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
