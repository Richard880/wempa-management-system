import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import QRCode from "react-qr-code";

function DigitalCard() {
  const [member, setMember] = useState(null);

  useEffect(() => {
    const loadMember = async () => {
      const user = auth.currentUser;

      if (!user) return;

      const snapshot = await getDoc(doc(db, "users", user.uid));

      if (snapshot.exists()) {
        setMember(snapshot.data());
      }
    };

    loadMember();
  }, []);

  if (!member) {
    return <h2>Loading...</h2>;
  }

  return (
    <div
      style={{
        width: "400px",
        padding: "20px",
        border: "2px solid #003366",
        borderRadius: "10px",
      }}
    >
      <h2>WEMPA DIGITAL MEMBER CARD</h2>

      <hr />

      <p>
        <strong>Name:</strong>
        {member.fullName}
      </p>

      <p>
        <strong>Membership No:</strong>
        {member.membershipNumber}
      </p>

      <p>
        <strong>Profession:</strong>
        {member.profession}
      </p>

      <p>
        <strong>Status:</strong>
        {member.membershipStatus}
      </p>

      <div
        style={{
          background: "white",
          padding: "10px",
          width: "fit-content",
        }}
      >
        <QRCode
          value={`http://localhost:5173/verify/${member.membershipNumber}`}
        />
      </div>
    </div>
  );
}

export default DigitalCard;
