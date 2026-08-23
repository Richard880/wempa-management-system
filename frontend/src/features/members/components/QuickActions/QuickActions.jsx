// src/features/dashboard/components/QuickActions.jsx
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../../constants/routes";
import styles from "./QuickActions.module.css";

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      label: "Membership Application",
      desc: "Complete your professional profile",
      icon: "bi-card-checklist",
      path: ROUTES.MEMBER_APPLICATION,
      color: "#003366"
    },
    {
      label: "Update Profile",
      desc: "Manage your personal details",
      icon: "bi-person-gear",
      path: ROUTES.MEMBER_PROFILE,
      color: "#0d6efd"
    },
    {
      label: "Make Payment",
      desc: "Settle membership subscriptions",
      icon: "bi-credit-card",
      path: "/payments",
      color: "#198754"
    }
  ];

  return (
    <div className={styles.container}>
      <h5 className={styles.title}>Quick Actions</h5>

      <div className={styles.actionGrid}>
        {actions.map((action, index) => (
          <button
            key={index}
            className={styles.actionButton}
            onClick={() => navigate(action.path)}
          >
            <div className={styles.iconWrapper}>
              <i className={`bi ${action.icon} fs-5`}></i>
            </div>
            
            <div className={styles.textGroup}>
              <span className={styles.btnLabel}>{action.label}</span>
              <span className={styles.btnDesc}>{action.desc}</span>
            </div>

            <i className={`bi bi-chevron-right ${styles.arrowIcon}`}></i>
          </button>
        ))}
      </div>
    </div>
  );
}
