import  { useMemo } from "react";
import PropTypes from "prop-types";
import useApplicationFormStep from "../../hooks/useApplicationFormStep";
import { FormGrid, FormSection, DynamicField } from "../../../../components/forms";
import emergencyContactSchema from "./emergencyContactSchema";
import emergencyContactFields from "./emergencyContactFields";
import defaultValues from "./defaultValues";
import styles from "./EmergencyContact.module.css";
import WizardFooter from "../../../../components/workflow/WizardFooter"; // Verified absolute relative asset link

export default function EmergencyContact({ initialData, formId }) {
  // Memoize values so the object reference remains perfectly stable.
  // This keeps React Hook Form from triggering destructive form resets during active typing.
  const stableValues = useMemo(() => {
    return {
      ...defaultValues,
      ...(initialData || {}),
    };
  }, [initialData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    application, // Exposes { saveStepData, isSaving } from your unified hook layer
  } = useApplicationFormStep({
    schema: emergencyContactSchema,
    defaultValues: defaultValues,
    values: stableValues,
    section: "emergencyContact",
    currentStep: 5, // Kept in sync with your step configuration
  });

  const onSubmit = async (data) => {
    try {
      console.log("Saving Emergency Contact data to Firestore:", data);
      // Serializes proxy state, securely uploads to Firestore, and pushes navigation step forward
      const success = await application.saveStepData(data);
      if (success) {
        console.log("Emergency Contact Step Successfully Committed.");
      }
    } catch (err) {
      console.error("Failed to execute emergency contact form submission:", err);
    }
  };

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <FormSection
        title="Emergency Contact"
        description="Provide the person WEMPA should contact in case of an emergency."
      >
        <FormGrid>
          {emergencyContactFields.map((field) => (
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
        CRITICAL: Render footer inside the form so type="submit" 
        automatically executes handleSubmit(onSubmit) natively.
      */}
      <WizardFooter loading={application.isSaving} />
    </form>
  );
}

EmergencyContact.propTypes = {
  initialData: PropTypes.object,
  formId: PropTypes.string.isRequired,
};
