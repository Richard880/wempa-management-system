import { useMemo } from "react";
import PropTypes from "prop-types";
import useApplicationFormStep from "../../hooks/useApplicationFormStep";
import { FormSection, FormGrid, DynamicField } from "../../../../components/forms";
import defaultValues from "./defaultValues";
import nextOfKinFields from "./nextOfKinFields";
import nextOfKinSchema from "./nextOfKinSchema";
import styles from "./NextOfKin.module.css";
import WizardFooter from "../../../../components/workflow/WizardFooter"; // Verified structural asset hook

export default function NextOfKin({ initialData, formId }) {
  // Memoize values to ensure stability and prevent resets during data entry
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
    application, // Houses { saveStepData, isSaving } from File 2
  } = useApplicationFormStep({
    schema: nextOfKinSchema,
    defaultValues: defaultValues,
    values: stableValues,
    section: "nextOfKin",
    currentStep: 6, // Keeps current operational order sync locked
  });

  const onSubmit = async (data) => {
    try {
      console.log("Saving Next of Kin data to Firestore:", data);
      // Clean processing boundary: Serializes, saves to Firestore, and pushes navigation step forward
      const success = await application.saveStepData(data);
      if (success) {
        console.log("Next of Kin Step Successfully Committed.");
      }
    } catch (err) {
      console.error("Failed to save Next of Kin step:", err);
    }
  };

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <FormSection
        title="Next of Kin"
        description="Provide the details of your legally recognized next of kin."
      >
        <FormGrid>
          {nextOfKinFields.map((field) => (
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

NextOfKin.propTypes = {
  initialData: PropTypes.object,
  formId: PropTypes.string.isRequired,
};
