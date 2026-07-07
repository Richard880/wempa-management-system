import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Link } from "react-router-dom";

function Members() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      const snapshot = await getDocs(collection(db, "users"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMembers(data);
    };

    fetchMembers();
  }, []);

  return (
    <div>
      <h1>All Members</h1>

      <input
        type="text"
        placeholder="Search Member"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {members
        .filter((member) =>
          member.fullName?.toLowerCase().includes(search.toLowerCase()),
        )
        .map((member) => (
          <div
            key={member.id}
            style={{
              border: "1px solid #ddd",
              margin: "10px",
              padding: "10px",
            }}
          >
            <p>Name: {member.fullName}</p>

            <p>Email: {member.email}</p>

            <p>Profession: {member.profession}</p>

            <p>Status: {member.membershipStatus}</p>

            <p>Membership No: {member.membershipNumber || "Pending"}</p>

            <Link to={`/admin/member/${member.id}`}>
              <button>View Profile</button>
            </Link>
          </div>
        ))}
    </div>
  );
}

export default Members;
