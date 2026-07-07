import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);

    navigate("/login");
  };

  return <button onClick={logout}>Logout</button>;
}

export default LogoutButton;
