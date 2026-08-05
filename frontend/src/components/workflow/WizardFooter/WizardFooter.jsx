
import PropTypes from "prop-types";
import Button from "../../ui/Button";
import useWizard from "../WizardProvider/useWizard";
import styles from "./WizardFooter.module.css";

function WizardFooter({ onSaveDraft, loading = false }) {
  const { state, actions } = useWizard();
  
  if (!state || !actions) return null;

  const { isFirstStep, isLastStep, currentStep, steps } = state;
  const { previousStep } = actions;

  const handlePrimaryAction = () => {
    // ALWAYS call onSaveDraft so the active child form validation/submission fires
    if (typeof onSaveDraft === "function") {
      onSaveDraft();
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <Button
          variant="secondary"
          type="button"
          onClick={previousStep}
          disabled={isFirstStep || loading}
        >
          <i className="fas fa-chevron-left me-2"></i> Previous
        </Button>
      </div>

      <div className={styles.center}>
        <div className={styles.progressInfo}>
          <span className={styles.stepText}>
            Step {currentStep} of {steps.length}
          </span>
          {loading && (
            <span className={styles.syncText}>
              <i className="fas fa-cloud-upload-alt fa-spin ms-2"></i> Syncing...
            </span>
          )}
        </div>
      </div>

      <div className={styles.right}>
        <Button
          variant={isLastStep ? "success" : "primary"}
          type="button"
          onClick={handlePrimaryAction}
          disabled={loading}
        >
          {loading ? (
            "Processing..."
          ) : isLastStep ? (
            <>Submit Application <i className="fas fa-check-circle ms-2"></i></>
          ) : (
            <>Save & Next <i className="fas fa-chevron-right ms-2"></i></>
          )}
        </Button>
      </div>
    </footer>
  );
}

WizardFooter.propTypes = {
  onSaveDraft: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default WizardFooter;
