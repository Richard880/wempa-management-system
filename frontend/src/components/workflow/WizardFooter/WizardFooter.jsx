import PropTypes from "prop-types";
import Button from "../../ui/Button";
import useWizard from "../WizardProvider/useWizard";
import styles from "./WizardFooter.module.css";

function WizardFooter({ onSaveDraft, loading = false, disabled = false }) {
  const { state, actions } = useWizard();
  
  if (!state || !actions) return null;

  const { isFirstStep, isLastStep, currentStep, steps } = state;
  const { previousStep } = actions;

  /*
  ----------------------------------------
  Primary Navigation Interceptor
  ----------------------------------------
  If onSaveDraft is passed directly, intercept execution manually.
  Otherwise, let the native form "submit" event cascade naturally.
  */
  const handlePrimaryAction = (e) => {
    if (typeof onSaveDraft === "function") {
      e.preventDefault(); // Stop native submit only if handling saving via explicit overrides
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
          disabled={isFirstStep || loading || disabled}
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
          
          /* 
          CRITICAL FIX: Change from "button" to "submit".
          This allows the button to natively fire HTML onSubmit listeners
          on forms like Documents.jsx.
          */
          type="submit" 
          
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
  onSaveDraft: PropTypes.func, // FIX: Changed from .isRequired to optional to support native form submit panels
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default WizardFooter;
