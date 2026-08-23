import  { useMemo } from "react";
import PropTypes from "prop-types";
import { FormSection, FormGrid, DynamicField } from "../../../../components/forms";
import useApplicationFormStep from "../../hooks/useApplicationFormStep";
import personalInformationSchema from "./PersonalInformationSchema";
import personalInformationFields from "./PersonalInformationFields";
import defaultValues from "./defaultValues";
import styles from "./PersonalInformation.module.css";
import WizardFooter from "../../../../components/workflow/WizardFooter"; // Ensure your WizardFooter import path matches your directory layout

export default function PersonalInformation({ profile, initialData, formId }) {
  
  const profileValues = useMemo(() => {
    return {
      firstName: initialData?.firstName ?? profile?.firstName ?? "",
      middleName: initialData?.middleName ?? profile?.middleName ?? "",
      lastName: initialData?.lastName ?? profile?.lastName ?? "",
      gender: initialData?.gender ?? profile?.gender ?? "",
      dateOfBirth: initialData?.dateOfBirth ?? profile?.dateOfBirth ?? "",
      nationality: initialData?.nationality ?? profile?.nationality ?? "",
      idNumber: initialData?.idNumber ?? profile?.idNumber ?? "",
     // kraPin: initialData?.kraPin ?? profile?.kraPin ?? "",
    };
  }, [initialData, profile]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    application, // This contains { saveStepData, isSaving } from File 2
  } = useApplicationFormStep({
    schema: personalInformationSchema,
    defaultValues: defaultValues, 
    values: profileValues,        
    section: "personal",
    currentStep: 1,
  });

  const onSubmit = async (data) => {
    try {
      // 1. application.saveStepData handles clean data cloning, saving, and moving to the next step automatically.
      const success = await application.saveStepData(data);
      if (success) {
        console.log("Personal Info Successfully Saved to Firestore & Navigated Forward.");
      }
    } catch (err) {
      console.error("Failed to execute personal info submission:", err);
    }
  };

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <FormSection
        title="Personal Information"
        description="Verify your personal details. Information from your account has been automatically loaded for registration."
      >
        {application?.loading && (
          <div className="text-center p-3">
            <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
            <span className="ms-2 small text-muted">Syncing with profile...</span>
          </div>
        )}

        <FormGrid>
          {personalInformationFields.map((field) => (
            <DynamicField
              key={field.name}
              field={field}
              register={register}
              errors={errors}
            />
          ))}
        </FormGrid>
      </FormSection>

      {/* 
        CRITICAL: Mount your WizardFooter INSIDE the form element. 
        Because its button has type="submit", it naturally targets this form instance.
      */}
      <WizardFooter loading={application.isSaving} />
    </form>
  );
}

PersonalInformation.propTypes = {
  profile: PropTypes.object,
  initialData: PropTypes.object,
  formId: PropTypes.string.isRequired,
};
