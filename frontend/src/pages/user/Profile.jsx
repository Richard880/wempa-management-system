import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";

function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;

      if (!user) return;

      const docRef = doc(db, "users", user.uid);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>My Profile</h1>

      {userData && (
        <>
          <p>
            <strong>Name:</strong> {userData.fullName}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Phone:</strong> {userData.phone}
          </p>
          <p>
            <strong>Profession:</strong> {userData.profession}
          </p>
          <p>
            <strong>Status:</strong> {userData.membershipStatus}
          </p>

          <p>
            <strong>Membership No:</strong>
            {userData.membershipNumber || "Pending"}
          </p>
        </>
      )}
    </div>
  );
}

export default Profile;
