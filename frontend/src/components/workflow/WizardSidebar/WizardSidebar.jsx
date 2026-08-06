
import styles from "./WizardSidebar.module.css";
import useWizard from "../WizardProvider/useWizard";

export default function WizardSidebar() {
  const context = useWizard();
  
  // Defensive check: if context is missing, don't crash
  if (!context) return null;

  const { state, actions } = context;
  const { steps, currentStep, completedSteps, progress } = state;

  return (
    <aside className={styles.sidebar}>
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
              // Safe call to the action
              onClick={() => actions?.goToStep?.(step.id)}
            >
              <span className={styles.indicator}>
                {isCompleted ? "✓" : step.id}
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
