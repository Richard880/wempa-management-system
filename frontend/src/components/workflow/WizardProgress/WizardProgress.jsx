import styles from "./WizardProgress.module.css";

import useWizard from "../WizardProvider/useWizard";

function WizardProgress() {
  const { state } = useWizard();

  const {
    progress,
    currentStep,
    totalSteps,
  } = state;

  return (
    <section className={styles.progressContainer}>
      <div className={styles.header}>
        <span className={styles.title}>
          Application Progress
        </span>

        <span className={styles.percentage}>
          {progress}%
        </span>
      </div>

      <div
        className={styles.progressBar}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className={styles.footer}>
        <small>
          Step {currentStep + 1} of {totalSteps}
        </small>
      </div>
    </section>
  );
}

export default WizardProgress;