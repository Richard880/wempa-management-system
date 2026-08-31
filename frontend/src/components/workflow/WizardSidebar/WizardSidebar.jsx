// src/components/workflow/WizardSidebar/WizardSidebar.jsx

import { Link } from "react-router-dom";
import styles from "./WizardSidebar.module.css";
import useWizard from "../WizardProvider/useWizard";
import { useAuth } from "../../../features/auth/hooks/useAuth"; 
import ROUTES from "../../../constants/routes"; 

export default function WizardSidebar() {
  const context = useWizard();
  const { auth } = useAuth(); 
  
  if (!context) return null;

  const { state, actions } = context;
  const { steps, currentStep, completedSteps, progress } = state;

  const userRole = auth?.role || auth?.profile?.role || "member";
  const isUserAdmin = userRole === "admin" || userRole === "super_admin";
  const dashboardTarget = isUserAdmin ? ROUTES.ADMIN_DASHBOARD : ROUTES.MEMBER_DASHBOARD;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.topNavigation}>
        <Link to={dashboardTarget} className={styles.backButton}>
          <i className="bi bi-arrow-left" aria-hidden="true" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      <div className={styles.header}>
        <h2 className={styles.title}>Registration Progress</h2>
        <span className={styles.percent}>{Math.round(progress || 0)}%</span>
      </div>

      {/* 🔓 THE INNER NAVIGATION SCROLLWAY */}
      <nav className={styles.navigation}>
        {steps.map((step) => {
          const isCompleted = completedSteps.includes(step.key);
          const isActive = step.id === currentStep;

          return (
            <button
              key={step.id}
              type="button"
              className={[
                styles.step, // 🟢 FIXED: Added object property access dot
                isActive && styles.active, // 🟢 FIXED: Added object property access dot
                isCompleted && styles.completed, // 🟢 FIXED: Added object property access dot
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => actions?.goToStep?.(step.id)}
            >
              <span className={styles.indicator}>
                {isCompleted ? <span className={styles.popCheck}>✓</span> : step.id}
              </span>

              <div className={styles.details}>
                <span className={styles.name}>{step.title}</span>
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
