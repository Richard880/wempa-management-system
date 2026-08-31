// src/components/workflow/WizardFooter.jsx

import PropTypes from "prop-types";
import Button from "../../ui/Button";
import useWizard from "../WizardProvider/useWizard";
import styles from "./WizardFooter.module.css";

function WizardFooter({ onSaveDraft, loading = false, disabled = false }) {
  const { state, actions } = useWizard();
  
  if (!state || !actions) return null;

  const { isFirstStep, isLastStep, currentStep, steps } = state;
  const { previousStep } = actions;

  /**
   * Primary Action Navigation Interceptor Rule
   */
  const handlePrimaryAction = (e) => {
    if (typeof onSaveDraft === "function") {
      e.preventDefault(); 
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
          <i className="fas fa-chevron-left"></i> Previous
        </Button>
      </div>

      <div className={styles.center}>
        <div className={styles.progressInfo}>
          <span className={styles.stepText}>
            Step {currentStep} of {steps.length}
          </span>
          {loading && (
            <span className={styles.syncText}>
              <i className="fas fa-cloud-upload-alt fa-spin"></i> Syncing Registry...
            </span>
          )}
        </div>
      </div>

      <div className={styles.right}>
        <Button
          variant={isLastStep ? "success" : "primary"}
          type="submit" 
          onClick={handlePrimaryAction}
          disabled={loading || disabled}
        >
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i>
              Processing...
            </>
          ) : isLastStep ? (
            <>
              Submit Application <i className="fas fa-check-circle"></i>
            </>
          ) : (
            <>
              Save & Next <i className="fas fa-chevron-right"></i>
            </>
          )}
        </Button>
      </div>
    </footer>
  );
}

WizardFooter.propTypes = {
  onSaveDraft: PropTypes.func, 
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default WizardFooter;
