import { useState } from "react";
import { auth, db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";

function Membership() {
  const [nationalId, setNationalId] = useState("");
  const [county, setCounty] = useState("");
  const [vesselType, setVesselType] = useState("");

  const submitMembership = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;

      await addDoc(collection(db, "memberships"), {
        userId: user.uid,
        nationalId,
        county,
        vesselType,
        status: "Pending",
        submittedAt: new Date(),
      });

      alert("Membership Application Submitted");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Membership Application</h1>

      <form onSubmit={submitMembership}>
        <input
          type="text"
          placeholder="National ID"
          value={nationalId}
          onChange={(e) => setNationalId(e.target.value)}
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="County"
          value={county}
          onChange={(e) => setCounty(e.target.value)}
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Vessel Type"
          value={vesselType}
          onChange={(e) => setVesselType(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">Apply</button>
      </form>
    </div>
  );
}

export default Membership;
