import { Link } from "react-router-dom";
import styles from "./WizardSidebar.module.css";
import useWizard from "../WizardProvider/useWizard";
import { useAuth } from "../../../features/auth/hooks/useAuth"; // 1. Ensure useAuth is imported
import ROUTES from "../../../constants/routes"; 

export default function WizardSidebar() {
  const context = useWizard();
  const { auth } = useAuth(); // 2. Extract the auth state payload
  
  if (!context) return null;

  const { state, actions } = context;
  const { steps, currentStep, completedSteps, progress } = state;

  // 3. Dynamically route back based on whether they are an Admin or a Member
  const isUserAdmin = auth?.currentUser?.role === "admin"; 
  const dashboardTarget = isUserAdmin ? ROUTES.ADMIN_DASHBOARD : ROUTES.MEMBER_DASHBOARD;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.topNavigation}>
        {/* 	🏼 4. UPDATED TO TARGET VARIABLE PATH ROUTE */}
        <Link to={dashboardTarget} className={styles.backButton}>
          <i className="bi bi-arrow-left" aria-hidden="true" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      <div className={styles.header}>
        <h2 className={styles.title}>Registration Progress</h2>
        <span className={styles.percent}>{progress}%</span>
      </div>

      <nav className={styles.navigation}>
        {steps.map((step) => {
          const isCompleted = completedSteps.includes(step.key);
          const isActive = step.id === currentStep;

          return (
            <button
              key={step.id}
              type="button"
              className={[
                styles.step,
                isActive && styles.active,
                isCompleted && styles.completed,
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
