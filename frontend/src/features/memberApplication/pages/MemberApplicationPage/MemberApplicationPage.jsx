
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
// import EmploymentInformation from "../../steps/EmploymentInformation";
// import MaritimeInformation from "../../steps/MaritimeInformation";
// import EmergencyContact from "../../steps/EmergencyContact";
// import NextOfKin from "../../steps/NextOfKin";
import Documents from "../../steps/Documents";
import Review from "../../steps/Review";
import Declaration from "../../steps/Declaration";

import styles from "./MemberApplicationPage.module.css";

// Safely normalize steps configuration
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
    submitApplication,
  } = useApplicationForm();

  // Stable ID for connecting the footer button to the active form in the body
  const formId = `step-form-${currentStep}`;

  if (loading || !application) {
    return (
      <div className={styles.loading}>
        <Spinner size="lg" label="Initializing application system..." />
      </div>
    );
  }

  /**
   * Orchestrates step rendering.
   * Steps 1-7: Standard data entry.
   * Step 8 (Review): Editable summary that saves changes to Firestore before moving to Step 9.
   * Step 9 (Declaration): Final checkbox stage that locks the data.
   */
  const renderStepComponent = () => {
    // Props passed to ensure all forms are connected to the WizardFooter trigger
    const commonProps = { formId, isLocked: application.isLocked };

    switch (currentStep) {
      case 1:
        return <PersonalInformation {...commonProps} profile={profile} initialData={application.personal || {}} />;
      case 2:
        return <ContactInformation {...commonProps} profile={profile} initialData={application.contact || {}} />;
      // case 3:
      //   return <EmploymentInformation {...commonProps} initialData={application.employment || {}} />;
      // case 4:
      //   return <MaritimeInformation {...commonProps} initialData={application.maritime || {}} />;
      // case 5:
      //   return <EmergencyContact {...commonProps} initialData={application.emergencyContact || {}} />;
      // case 6:
      //   return <NextOfKin {...commonProps} initialData={application.nextOfKin || {}} />;
      case 3:
        return <Documents {...commonProps} initialData={application.documents || {}} />;
      case 4:
        // Adjusted to perfectly match the application payload requirements of the Review component
        return <Review formId={formId} application={application} />;
      case 5:
        return <Declaration {...commonProps} initialData={application.declaration || {}} />;
      default:
        return <PersonalInformation {...commonProps} profile={profile} initialData={application.personal || {}} />;
    }
  };

  /**
   * Remote Form Trigger System:
   * Programmatically triggers validation and submission of the active child step form.
   */
  const handleRemoteSave = () => {
    if (application.isLocked) return;

    const activeForm = document.getElementById(formId);
    if (activeForm) {
      // requestSubmit() is the production standard for remote triggers as it runs HTML5 validation
      if (typeof activeForm.requestSubmit === 'function') {
        activeForm.requestSubmit();
      } else {
        // Fallback execution branch for legacy browsers
        activeForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    } else if (currentStep === 8) {
      nextStep();
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
            <WizardBody>
              {renderStepComponent()}
            </WizardBody>
            <WizardFooter 
              loading={saving} 
              onSaveDraft={handleRemoteSave}
              isLastStep={currentStep === 9}
              disabled={application.isLocked} // Disables navigation controls when locked down
            />
          </div>
        </WizardLayout>
      </WizardProvider>
    </div>
  );
}
