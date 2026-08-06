import  { useMemo } from "react";
import PropTypes from "prop-types";
import useApplicationFormStep from "../../hooks/useApplicationFormStep";
import { FormSection } from "../../../../components/forms";
import useApplicationForm from "../../hooks/useApplicationForm";

import DeclarationAgreement from "./components/DeclarationAgreement";
import DeclarationChecklist from "./components/DeclarationChecklist";
import SubmissionNotice from "./components/SubmissionNotice";

import declarationSchema from "./validation/declarationSchema";
import defaultValues from "./validation/defaultValues";
import styles from "./Declaration.module.css";

export default function Declaration({ initialData, formId }) {
  const { submitApplication } = useApplicationForm();

  const stableValues = useMemo(() => {
    return {
      declarationAccepted: initialData?.declarationAccepted ?? false,
      informationAccurate: initialData?.informationAccurate ?? false,
      termsAccepted: initialData?.termsAccepted ?? false,
    };
  }, [initialData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useApplicationFormStep({
    schema: declarationSchema,
    defaultValues: defaultValues, 
    values: stableValues,         
    section: "declaration",
    currentStep: 9, 
  });

  const onSubmit = async (data) => {
    try {
      console.log("Executing final submission process with data:", data);
      await submitApplication(data);
    } catch (err) {
      console.error("Failed to complete final application submission:", err);
    }
  };

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <FormSection
        title="Review & Declaration"
        description="Please read through the conditions below and confirm your legal declaration before submitting your application."
      >
        <DeclarationAgreement />
        <DeclarationChecklist register={register} errors={errors} />
        <SubmissionNotice />
      </FormSection>
    </form>
  );
}

Declaration.propTypes = {
  initialData: PropTypes.object,
  formId: PropTypes.string.isRequired,
};
