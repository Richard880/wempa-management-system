import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

function MemberDetails() {

  const { id } = useParams();

  const [member, setMember] = useState(null);

  useEffect(() => {

    const fetchMember = async () => {

      const snapshot =
        await getDoc(
          doc(db, "users", id)
        );

      if(snapshot.exists()) {
        setMember(snapshot.data());
      }

    };

    fetchMember();

  }, [id]);

  if(!member) {
    return <h2>Loading...</h2>;
  }

  return (

    <div>

      <h1>Member Profile</h1>

      <hr />

      <p><strong>Name:</strong> {member.fullName}</p>

      <p><strong>Email:</strong> {member.email}</p>

      <p><strong>Phone:</strong> {member.phone}</p>

      <p><strong>Profession:</strong> {member.profession}</p>

      <p>
        <strong>Status:</strong>
        {member.membershipStatus}
      </p>

      <p>
        <strong>Membership Number:</strong>
        {member.membershipNumber || "Pending"}
      </p>

      <p>
        <strong>Role:</strong>
        {member.role}
      </p>

    </div>

  );

}

export default MemberDetails;