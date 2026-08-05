import  { useMemo } from "react";
import PropTypes from "prop-types";
import useApplicationFormStep from "../../hooks/useApplicationFormStep";
import { FormSection, FormGrid, DynamicField } from "../../../../components/forms";
import employmentInformationSchema from "./employmentInformationSchema";
import employmentInformationFields from "./employmentInformationFields";
import defaultValues from "./defaultValues";
import styles from "./EmploymentInformation.module.css";
import WizardFooter from "../../../../components/workflow/WizardFooter"; // Updated to use your correct path

// formId is passed as a prop from MemberApplicationPage to connect to the WizardFooter
export default function EmploymentInformation({ initialData, formId }) {
  // Memoize values to ensure the object reference remains stable across renders
  const stableValues = useMemo(() => {
    return {
      ...defaultValues,
      ...(initialData || {}),
    };
  }, [initialData]);

  // Extract form methods from the custom hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    application, // Provides { saveStepData, isSaving } from your unified hook
  } = useApplicationFormStep({
    schema: employmentInformationSchema,
    defaultValues: defaultValues,       
    values: stableValues,               
    section: "employment",
    currentStep: 3,
  });

  const onSubmit = async (data) => {
    try {
      console.log("Saving Employment Information to Firestore:", data);
      // Serializes proxy state data, writes to your Firestore backend collection, and updates wizard step
      const success = await application.saveStepData(data);
      if (success) {
        console.log("Employment Information Step Successfully Saved.");
      }
    } catch (err) {
      console.error("Failed to execute employment form submission:", err);
    }
  };

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <FormSection
        title="Employment Information"
        description="Tell us about your current employment and professional engagement within the maritime sector."
      >
        <FormGrid>
          {employmentInformationFields.map((field) => (
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
        CRITICAL: Mounted inside the form so that type="submit" 
        wireframes into the handleSubmit pipeline effortlessly.
      */}
      <WizardFooter loading={application.isSaving} />
    </form>
  );
}

EmploymentInformation.propTypes = {
  initialData: PropTypes.object,
  formId: PropTypes.string.isRequired,
};
