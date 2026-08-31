// src/features/members/pages/MemberApplicationPage/MemberApplicationPage.jsx

import Spinner from "../../../../components/ui/Spinner";
import WizardProvider from "../../../../components/workflow/WizardProvider";
import WizardLayout from "../../../../components/workflow/WizardLayout";
import WizardSidebar from "../../../../components/workflow/WizardSidebar";
import WizardHeader from "../../../../components/workflow/WizardHeader";
import WizardBody from "../../../../components/workflow/WizardBody";
import WizardFooter from "../../../../components/workflow/WizardFooter";

import APPLICATION_STEPS_CONFIG from "../../config/applicationSteps";
import useApplicationForm from "../../hooks/useApplicationForm";

import PersonalInformation from "../../steps/PersonalInformation";
import ContactInformation from "../../steps/ContactInformation";
import EmploymentInformation from "../../steps/EmploymentInformation";
import Documents from "../../steps/Documents";
import Declaration from "../../steps/Declaration";
import MpesaPayment from "../../steps/payment/MpesaPayment";

import styles from "./MemberApplicationPage.module.css";

const STEPS = Array.isArray(APPLICATION_STEPS_CONFIG) 
  ? APPLICATION_STEPS_CONFIG 
  : (APPLICATION_STEPS_CONFIG?.APPLICATION_STEPS || []);

export default function MemberApplicationPage() {
  const {
    loading,
    saving,
    profile,
    application,
    currentStep,
    completedSteps,
    progress,
    nextStep,
    previousStep,
    goToStep,
    saveSection,
    submitApplication,
  } = useApplicationForm();

  const formId = `step-form-${currentStep}`;

  if (loading || !application) {
    return (
      <div className={styles.loading}>
        <Spinner size="lg" />
        <span className={styles.loadingText}>INITIALIZING MARITIME REGISTRY...</span>
      </div>
    );
  }

  /**
   * Orchestrates the rendering of specific step components.
   * Maps currentStep to the HTML tree segments cleanly.
   */
  const renderStepComponent = () => {
    const commonProps = { formId, isLocked: application.isLocked };

    switch (currentStep) {
      case 1:
        return <PersonalInformation {...commonProps} profile={profile} initialData={application.personal || {}} />;
      case 2:
        return <ContactInformation {...commonProps} profile={profile} initialData={application.contact || {}} />;
      case 3:
        return <EmploymentInformation {...commonProps} initialData={application.employment || {}} />;
      case 4:
        return <Documents {...commonProps} initialData={application.documents || {}} />;
      case 5:
        return (
          <Declaration 
            {...commonProps} 
            profile={profile} 
            initialData={application.declaration || {}} 
          />
        );
      case 6:
        return (
          <MpesaPayment 
            application={application} 
            saveSection={saveSection} 
            submitApplication={submitApplication} 
          />
        );
      default:
        return <PersonalInformation {...commonProps} profile={profile} initialData={application.personal || {}} />;
    }
  };

  /**
   * Remote-trigger click handler for form actions.
   * Finds the current mounted form and submits it programmatically.
   */
  const handleRemoteSave = () => {
    if (application.isLocked) return;

    const activeForm = document.getElementById(formId);
    if (activeForm) {
      if (typeof activeForm.requestSubmit === 'function') {
        activeForm.requestSubmit(); // Fires React Hook Form handleSubmit natively
      } else {
        activeForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    } else {
      // 🟢 CONTROL FALLBACK: If no explicit form element handles the view context, 
      // advance the step layout manually using the navigation hooks.
      if (currentStep < 6) {
        nextStep();
      }
    }
  };

  return (
    <div className={styles.page}>
      <WizardProvider
        steps={STEPS}
        currentStep={currentStep}
        completedSteps={completedSteps}
        progress={progress}
        nextStep={nextStep}
        previousStep={previousStep}
        goToStep={goToStep}
        submit={submitApplication}
      >
        <WizardLayout>
          <WizardSidebar />
          
          <div className={styles.content}>
            <WizardHeader />
            
            <div className={styles.scrollContainer}>
              <div className={styles.formMaxWrapper}>
                <WizardBody>
                  {renderStepComponent()}
                </WizardBody>
              </div>
            </div>
            
            <WizardFooter 
              loading={saving} 
              onSaveDraft={handleRemoteSave}
              /* 🟢 FIXED: The button will only turn green and display "Submit Application" 
                 when the user hits Step 6 (M-Pesa Checkout) */
              isLastStep={currentStep === 6}
              disabled={application.isLocked} 
            />
          </div>
        </WizardLayout>
      </WizardProvider>
    </div>
  );
}
