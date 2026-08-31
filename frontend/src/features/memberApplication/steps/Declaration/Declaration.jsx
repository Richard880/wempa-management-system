// src/features/members/steps/Declaration/Declaration.jsx
import { useMemo } from "react";
import PropTypes from "prop-types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSection } from "../../../../components/forms";
import useApplicationForm from "../../hooks/useApplicationForm";
import useWizard from "../../../../components/workflow/WizardProvider/useWizard";

import Review from "../Review/Review"; 
import DeclarationAgreement from "./components/DeclarationAgreement";
import styles from "./Declaration.module.css";

// 🟢 BULLETPROOF INLINE SCHEMA VALIDATION
const declarationSchema = z.object({
  declarationAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the truthfulness declaration." }),
  }),
  informationAccurate: z.literal(true, {
    errorMap: () => ({ message: "You must authorize information verification." }),
  }),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions to proceed." }),
  }),
});

export default function Declaration({ initialData, formId, profile }) {
  const { saveSection, application } = useApplicationForm();
  const { actions } = useWizard();

  const stableValues = useMemo(() => {
    return {
      declarationAccepted: initialData?.declarationAccepted ?? false,
      informationAccurate: initialData?.informationAccurate ?? false,
      termsAccepted: initialData?.termsAccepted ?? false,
    };
  }, [initialData]);

  // Natively orchestrate the form controller to prevent nested hook tracking bugs
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(declarationSchema),
    defaultValues: stableValues,
  });

  const onSubmit = async (data) => {
    try {
      console.log("🟢 Validation passed! Committing declaration signatures to cloud...", data);
      
      // 1. Save data under the "declaration" sub-node inside Firestore
      await saveSection("declaration", data, 6);
      
      // 2. Advance the wizard UI view directly to Step 6 (M-Pesa Payment Checkout)
      if (actions?.nextStep) {
        actions.nextStep();
      }
    } catch (err) {
      console.error("Failed to save declaration phase:", err);
    }
  };

  return (
    <div className={styles.masterWrapper}>
      {/* SECTION 1: Expansive, clean read-only summary grid panel review */}
      <Review application={application} profile={profile} />

      {/* SECTION 2: Legal Checklist and Master Form Processing Engine */}
      <form id={formId} onSubmit={handleSubmit(onSubmit)} className={styles.container} noValidate>
        <FormSection
          title="Review & Legal Declaration"
          description="Please verify your submitted registration parameters on top. Read through the regulatory conditions below to sign off your credentials before transitioning to checkout."
        >
          {/* Renders the legal conditions scroll window text box */}
          <DeclarationAgreement />

          {/* 🟢 INTEGRATED ULTRA-HIGH CONTRAST INTERACTIVE CHECKBOXES */}
          <div className={styles.checklist}>
            
            {/* Box 1 */}
            <div className="form-check">
              <input
                id="declarationAccepted"
                type="checkbox"
                className="form-check-input"
                {...register("declarationAccepted")}
              />
              <label htmlFor="declarationAccepted" className="form-check-label">
                I declare that all information provided in this application is true and complete.
              </label>
            </div>
            {errors.declarationAccepted && (
              <div className={styles.errorMessage}>✕ {errors.declarationAccepted.message}</div>
            )}

            {/* Box 2 */}
            <div className="form-check">
              <input
                id="informationAccurate"
                type="checkbox"
                className="form-check-input"
                {...register("informationAccurate")}
              />
              <label htmlFor="informationAccurate" className="form-check-label">
                I understand that WEMPA may verify the information and supporting documents submitted.
              </label>
            </div>
            {errors.informationAccurate && (
              <div className={styles.errorMessage}>✕ {errors.informationAccurate.message}</div>
            )}

            {/* Box 3 */}
            <div className="form-check">
              <input
                id="termsAccepted"
                type="checkbox"
                className="form-check-input"
                {...register("termsAccepted")}
              />
              <label htmlFor="termsAccepted" className="form-check-label">
                I agree to abide by the WEMPA Constitution, Membership Policies, Code of Conduct, and Terms & Conditions.
              </label>
            </div>
            {errors.termsAccepted && (
              <div className={styles.errorMessage}>✕ {errors.termsAccepted.message}</div>
            )}

          </div>
        </FormSection>
      </form>
    </div>
  );
}

Declaration.propTypes = {
  initialData: PropTypes.object,
  formId: PropTypes.string.isRequired,
  profile: PropTypes.object,
};
