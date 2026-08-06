import styles from "./WizardHeader.module.css";

import useWizard from "../WizardProvider/useWizard";

function WizardHeader() {
  const { state } = useWizard();

  const {
    currentStep,
    totalSteps,
    currentStepConfig,
    progress,
  } = state;

  if (!currentStepConfig) {
    return null;
  }

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <span className={styles.step}>
          Step {currentStep + 1} of {totalSteps}
        </span>

        <h1 className={styles.title}>
          {currentStepConfig.title}
        </h1>

        {currentStepConfig.description && (
          <p className={styles.description}>
            {currentStepConfig.description}
          </p>
        )}
      </div>

      <div className={styles.meta}>
        <span className={styles.progress}>
          {progress}% Complete
        </span>

        {currentStepConfig.estimatedMinutes && (
          <span className={styles.time}>
            ≈ {currentStepConfig.estimatedMinutes} min
          </span>
        )}
      </div>
    </header>
  );
}

export default WizardHeader;