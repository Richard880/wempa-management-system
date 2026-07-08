import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useEffect, useState } from "react";

function VerifyMember() {
  const { membershipNumber } = useParams();

  const [member, setMember] = useState(null);

  useEffect(() => {
    const verify = async () => {
      const snapshot = await getDocs(collection(db, "users"));

      const found = snapshot.docs.find(
        (doc) => doc.data().membershipNumber === membershipNumber,
      );

      if (found) {
        setMember(found.data());
      }
    };

    verify();
  }, [membershipNumber]);

  if (!member) {
    return <h2>Member Not Found</h2>;
  }

  return (
    <div>
      <h1>Membership Verification</h1>

      <p>
        Name:
        {member.fullName}
      </p>

      <p>
        Membership No:
        {member.membershipNumber}
      </p>

      <p>
        Status:
        {member.membershipStatus}
      </p>

      <p>
        Profession:
        {member.profession}
      </p>
    </div>
  );
}

export default VerifyMember;
