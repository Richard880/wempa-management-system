
import PropTypes from "prop-types";
import useApplicationFormStep from "../../hooks/useApplicationFormStep";
import { FormSection, FormGrid, DynamicField } from "../../../../components/forms";
import defaultValues from "./defaultValues";
import maritimeInformationFields from "./maritimeInformationFields";
import maritimeInformationSchema from "./maritimeInformationSchema";
import styles from "./MaritimeInformation.module.css";
import WizardFooter from "../../../../components/workflow/WizardFooter"; // Import your footer component

export default function MaritimeInformation({ initialData, formId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    application, // Provides { saveStepData, isSaving } from your unified hook
  } = useApplicationFormStep({
    schema: maritimeInformationSchema,
    defaultValues: defaultValues, 
    values: initialData || defaultValues, 
    section: "maritime",
    currentStep: 4, // Kept in sync with your step configuration
  });

  const onSubmit = async (data) => {
    try {
      console.log("Saving Maritime Information to Firestore:", data);
      // Serializes proxy objects, updates your Firestore collection, and triggers nextStep() automatically
      const success = await application.saveStepData(data);
      if (success) {
        console.log("Maritime Information Step Successfully Saved.");
      }
    } catch (err) {
      console.error("Failed to save Maritime Information step:", err);
    }
  };

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <FormSection
        title="Maritime Information"
        description="Provide your maritime background, qualifications, and professional experience."
      >
        <FormGrid>
          {maritimeInformationFields.map((field) => (
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

MaritimeInformation.propTypes = {
  initialData: PropTypes.object,
  formId: PropTypes.string.isRequired,
};
