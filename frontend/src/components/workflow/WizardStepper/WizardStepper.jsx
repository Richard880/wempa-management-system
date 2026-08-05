import styles from "./WizardStepper.module.css";

import useWizard from "../WizardProvider/useWizard";

export default function WizardStepper() {
  const { state, actions } = useWizard();

  const {
    steps,
    currentStep,
    completedSteps,
  } = state;

  return (
    <nav
      className={styles.stepper}
      aria-label="Application Progress"
    >
      {steps.map((step) => {
        const active =
          step.id === currentStep;

        const completed =
          completedSteps.includes(step.key);

        return (
          <button
            key={step.id}
            type="button"
            className={[
              styles.step,
              active && styles.active,
              completed && styles.completed,
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() =>
              actions.goToStep(step.id)
            }
            aria-current={
              active ? "step" : undefined
            }
          >
            <span className={styles.circle}>
              {completed ? "✓" : step.id}
            </span>

            <span className={styles.content}>
              <span className={styles.title}>
                {step.title}
              </span>
            </span>
          </button>
        );
      })}
    </nav>
  );
}