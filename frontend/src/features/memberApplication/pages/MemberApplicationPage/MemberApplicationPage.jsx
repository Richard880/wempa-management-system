
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

// src/features/members/pages/MemberApplicationPage/MemberApplicationPage.jsx

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

  const formId = `step-form-${currentStep}`;

  if (loading || !application) {
    return (
      <div className={styles.loading}>
        <Spinner size="lg" label="Initializing application system..." />
      </div>
    );
  }

  const renderStepComponent = () => {
    const commonProps = { formId, isLocked: application.isLocked };

    switch (currentStep) {
      case 1:
        return <PersonalInformation {...commonProps} profile={profile} initialData={application.personal || {}} />;
      case 2:
        return <ContactInformation {...commonProps} profile={profile} initialData={application.contact || {}} />;
      case 3:
        return <Documents {...commonProps} initialData={application.documents || {}} />;
      case 4:
        return <Review formId={formId} application={application} />;
      case 5:
        return <Declaration {...commonProps} initialData={application.declaration || {}} />;
      default:
        return <PersonalInformation {...commonProps} profile={profile} initialData={application.personal || {}} />;
    }
  };

  const handleRemoteSave = () => {
    if (application.isLocked) return;

    const activeForm = document.getElementById(formId);
    if (activeForm) {
      if (typeof activeForm.requestSubmit === 'function') {
        activeForm.requestSubmit();
      } else {
        activeForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    } else if (currentStep === 4) { // 🟢 Updated to match Review step
      nextStep();
    }
  };

  // ... keep all imports and top functions exactly the same ...

 // ... keeping all your imports exactly the same ...

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
              {/* 	🏼 WRAPPED THE FORMS IN THE MAXIMUM READABILITY LAYER */}
              <div className={styles.formMaxWrapper}>
                <WizardBody>
                  {renderStepComponent()}
                </WizardBody>
              </div>
            </div>
            
            <WizardFooter 
              loading={saving} 
              onSaveDraft={handleRemoteSave}
              isLastStep={currentStep === 5} 
              disabled={application.isLocked} 
            />
          </div>
        </WizardLayout>
      </WizardProvider>
    </div>
  );
}





