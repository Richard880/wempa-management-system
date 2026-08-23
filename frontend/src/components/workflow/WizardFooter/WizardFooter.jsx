// src/components/workflow/WizardFooter/WizardFooter.jsx
import PropTypes from "prop-types";
import Button from "../../ui/Button";
import useWizard from "../WizardProvider/useWizard";
import styles from "./WizardFooter.module.css";

function WizardFooter({ onSaveDraft, loading = false, disabled = false }) {
  const { state, actions } = useWizard();
  
  if (!state || !actions) return null;

  const { isFirstStep, isLastStep, currentStep, steps } = state;
  const { previousStep } = actions;

  const handlePrimaryAction = () => {
    // 🟢 Triggers the 'handleRemoteSave' in MemberApplicationPage.jsx
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
          // 🟢 Disable if it's the first step, currently loading, or if the form is locked
          disabled={isFirstStep || loading || disabled}
        >
          <i className="fas fa-chevron-left me-2"></i> Previous
        </Button>
      </div>

      <div className={styles.center}>
        <div className={styles.progressInfo}>
          {/* 🟢 This will now correctly show "Step X of 5" */}
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
          // 🟢 Success color only on the final Declaration step (Step 5)
          variant={isLastStep ? "success" : "primary"}
          type="button"
          onClick={handlePrimaryAction}
          disabled={loading || disabled}
        >
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin me-2"></i>
              Processing...
            </>
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
  disabled: PropTypes.bool, // 🟢 Added to handle locked applications
};

export default WizardFooter;
