// src/features/members/steps/EmploymentInformation/EmploymentInformation.jsx
import { useMemo } from "react";
import PropTypes from "prop-types";
import { FormSection, FormGrid, DynamicField } from "../../../../components/forms";
import useApplicationFormStep from "../../hooks/useApplicationFormStep";
import employmentInformationSchema from "./EmploymentInformationSchema";
import employmentInformationFields from "./EmploymentInformationFields";
import defaultValues from "./defaultValues";
import styles from "./EmploymentInformation.module.css";
import WizardFooter from "../../../../components/workflow/WizardFooter";

export default function EmploymentInformation({ initialData, formId }) {
  
  /**
   * 🟢 DATABASE PROFILE FIELD SYNCHRONIZATION FIXED
   * Maps properties precisely matching your configuration keys so that values load
   * cleanly from Firestore and pass through Zod validations without blocking signatures.
   */
  const stableValues = useMemo(() => {
    const empData = initialData?.employment || initialData || {};
    
    return {
      employmentStatus: empData.employmentStatus ?? "",
      employerName: empData.employerName ?? "",
      organizationType: empData.organizationType ?? "",
      jobTitle: empData.jobTitle ?? "",
      department: empData.department ?? "",
      Specialization: empData.Specialization ?? "",
      "Years Of Maritime Experience": empData["Years Of Maritime Experience"] ?? empData.yearsOfExperience ?? "",
    };
  }, [initialData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    application,
  } = useApplicationFormStep({
    schema: employmentInformationSchema,
    defaultValues: defaultValues,       
    values: stableValues,               
    section: "employment",
    currentStep: 3,
  });

  const onSubmit = async (data) => {
    try {
      console.log("Committing synchronized employment payload data directly to Firestore:", data);
      
      // Fires serialization pipelines and saves values to the members collection securely
      const success = await application.saveStepData(data);
      if (success) {
        console.log("Employment section successfully updated in the database registry.");
      }
    } catch (err) {
      console.error("Failed to commit employment section fields update:", err);
    }
  };

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className={styles.container} noValidate>
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

      <WizardFooter loading={application.isSaving} />
    </form>
  );
}

EmploymentInformation.propTypes = {
  initialData: PropTypes.object,
  formId: PropTypes.string.isRequired,
};
