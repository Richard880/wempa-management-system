import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useNavigate } from "react-router-dom";

function Register() {

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [profession, setProfession] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    try {

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName,
        phone,
        profession,
        email,
        role: "member",
        membershipStatus: "pending",
        createdAt: new Date()
      });

      alert("Registration Successful");

      navigate("/dashboard");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>

      <h1>WEMPA Registration</h1>

      <form onSubmit={registerUser}>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e)=>setFullName(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="text"
          placeholder="Profession"
          value={profession}
          onChange={(e)=>setProfession(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit">
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;
