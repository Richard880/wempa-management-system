// src/features/members/components/WizardStepper/WizardStepper.jsx
import styles from "./WizardStepper.module.css";
import useWizard from "../WizardProvider/useWizard";

export default function WizardStepper() {
  const { state, actions } = useWizard();
  const { steps, currentStep, completedSteps } = state;

  return (
    <nav className={styles.stepper} aria-label="Application Progress">
      {steps.map((step, index) => {
        const active = step.id === currentStep;
        const completed = completedSteps.includes(step.key);
        
        // 🟢 UX Rule: Allow clicking back to completed steps, but not skipping ahead
        const isFutureStep = step.id > (Math.max(...steps.filter(s => completedSteps.includes(s.key)).map(s => s.id), 0) + 1);
        const isDisabled = isFutureStep && !active;

        return (
          <button
            key={step.id}
            type="button"
            className={[
              styles.step,
              active && styles.active,
              completed && styles.completed,
            ].filter(Boolean).join(" ")}
            onClick={() => !isDisabled && actions.goToStep(step.id)}
            disabled={isDisabled}
            aria-current={active ? "step" : undefined}
          >
            <div className={styles.circle}>
              {completed ? <i className="bi bi-check-lg"></i> : step.id}
            </div>

            <div className={styles.content}>
              <span className={styles.title}>
                {step.title}
              </span>
            </div>
          </button>
        );
      })}
    </nav>
  );
}
