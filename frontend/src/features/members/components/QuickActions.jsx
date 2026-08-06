import { useNavigate } from "react-router-dom";
import ROUTES from "../../../constants/routes";

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h2>Quick Actions</h2>

      <button
        onClick={() =>
          navigate(ROUTES.MEMBER_APPLICATION)
        }
      >
        Complete Membership Application
      </button>
    </div>
  );
}