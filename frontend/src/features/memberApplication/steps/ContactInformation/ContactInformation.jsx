import  { useMemo } from "react";
import PropTypes from "prop-types";
import useApplicationFormStep from "../../hooks/useApplicationFormStep";
import { FormSection, FormGrid, DynamicField } from "../../../../components/forms";
import contactInformationSchema from "./ContactInformationSchema";
import contactInformationFields from "./ContactInformationFields";
import defaultValues from "./defaultValues";
import styles from "./ContactInformation.module.css";
import WizardFooter from "../../../../components/workflow/WizardFooter"; // Verified absolute relative asset link

export default function ContactInformation({ profile, initialData, formId }) {
  // Fix: Memoize values so the object reference remains identical across renders.
  // Fix: Aligned alternativePhoneNumber property keys to match the fields array perfectly.
  const profileValues = useMemo(() => {
    return {
      ...defaultValues,
      email: initialData?.email ?? profile?.email ?? "",
      phoneNumber: initialData?.phoneNumber ?? profile?.phoneNumber ?? "",
      alternativePhoneNumber: initialData?.alternativePhoneNumber ?? profile?.alternativePhoneNumber ?? "",
      county: initialData?.county ?? profile?.county ?? "",
      subCounty: initialData?.subCounty ?? profile?.subCounty ?? "",
      ward: initialData?.ward ?? profile?.ward ?? "",
      town: initialData?.town ?? profile?.town ?? "",
      physicalAddress: initialData?.physicalAddress ?? profile?.physicalAddress ?? "",
      postalAddress: initialData?.postalAddress ?? profile?.postalAddress ?? "",
      postalCode: initialData?.postalCode ?? profile?.postalCode ?? "",
    };
  }, [initialData, profile]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    application, // Exposes { saveStepData, isSaving } from your unified hook layer
  } = useApplicationFormStep({
    schema: contactInformationSchema,
    defaultValues: defaultValues, 
    values: profileValues,        
    section: "contact", 
    currentStep: 2, // Keeps current operational order sync locked
  });

  const onSubmit = async (data) => {
    try {
      console.log("Saving Contact Information to Firestore:", data);
      // Serializes proxy state, securely writes to Firestore, and pushes navigation step forward
      const success = await application.saveStepData(data);
      if (success) {
        console.log("Contact Information Step Successfully Saved.");
      }
    } catch (err) {
      console.error("Failed to execute contact form submission:", err);
    }
  };

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <FormSection
        title="Contact Information"
        description="Provide your current contact details. Your email address is linked to your WEMPA account and cannot be changed here."
      >
        <FormGrid>
          {contactInformationFields.map((field) => (
            <DynamicField
              key={field.name}
              field={field}
              register={register}
              errors={errors}
            />
          ))}
        </FormGrid>
      </FormSection>

      {/* Surface sync status for the user if needed */}
      {application?.loading && (
        <div className="text-muted small mt-2 d-flex align-items-center gap-2">
          <div className="spinner-border spinner-border-sm" role="status"></div>
          <span>Syncing with Firestore...</span>
        </div>
      )}

      {/* 
        CRITICAL: Mounted inside the form so that type="submit" 
        wireframes into the handleSubmit pipeline effortlessly.
      */}
      <WizardFooter loading={application.isSaving} />
    </form>
  );
}

ContactInformation.propTypes = {
  profile: PropTypes.object,
  initialData: PropTypes.object,
  formId: PropTypes.string.isRequired,
};
