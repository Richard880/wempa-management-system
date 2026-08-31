// src/features/members/steps/Documents/Documents.jsx
import { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import useApplicationFormStep from "../../hooks/useApplicationFormStep";
import DocumentGrid from "./components/DocumentGrid";
import documentsSchema from "./documentsSchema";
import defaultValues from "./defaultValues";
import useDocumentUpload from "./hooks/useDocumentUpload";
import styles from "./Documents.module.css";
import WizardFooter from "../../../../components/workflow/WizardFooter"; 
import useWizard from "../../../../components/workflow/WizardProvider/useWizard"; 
import { useAuth } from "../../../auth/hooks/useAuth"; 

export default function Documents({ initialData, formId }) {
  const { state } = useWizard();
  const { auth } = useAuth();
  
  const dynamicStepIndex = state?.currentStep || 3; 
  const currentUserId = auth?.currentUser?.uid || "";

  // Stabilize initialData input parsing baseline using useMemo
  const stableValues = useMemo(() => {
    return {
      documents: initialData?.documents || defaultValues.documents || {},
    };
  }, [initialData]);

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
    application, 
  } = useApplicationFormStep({
    section: "documents",
    currentStep: dynamicStepIndex, 
    schema: documentsSchema,
    defaultValues: defaultValues,
    values: stableValues,
  });

  const documentValues = watch("documents") || {};

  // 🟢 HOOK MODEL ALIGNMENT: Mounted uniformly without conditional short-circuit breaks above it
  const {
    documents,
    resetDocuments,
    uploadDocument,
    replaceDocument,
    removeDocument,
    retryDocument,
    cancelDocument,
    processing,
  } = useDocumentUpload(stableValues.documents, currentUserId || "fallback_uid");

  useEffect(() => {
    if (initialData?.documents) {
      resetDocuments(initialData.documents);
    }
  }, [initialData?.documents, resetDocuments]);

  useEffect(() => {
    if (!documents) return;
    
    const persisted = {};
    let hasStructuralChanges = false;

    documents.forEach((docItem) => {
      const existing = documentValues[docItem.id];

      if (
        !existing ||
        existing.status !== docItem.status ||
        existing.downloadURL !== docItem.downloadURL
      ) {
        hasStructuralChanges = true;
      }

      persisted[docItem.id] = {
        status: docItem.status,
        fileName: docItem.fileName || "",
        downloadURL: docItem.downloadURL || "",
        storagePath: docItem.storagePath || "",
        verified: docItem.verified ?? false,
        uploadedAt: docItem.uploadedAt || null,
      };
    });

    if (hasStructuralChanges && Object.keys(persisted).length > 0) {
      setValue("documents", persisted, { 
        shouldDirty: true, 
        shouldValidate: true 
      });
    }
  }, [documents, setValue, documentValues]); 

  const onSubmit = async (data) => {
    try {
      console.log("Preparing form data payload for Firestore save...", data);
      const sanitizedDocumentsPayload = {};
      
      documents.forEach((doc) => {
        sanitizedDocumentsPayload[doc.id] = {
          status: doc.status || "pending",
          fileName: doc.fileName || doc.file?.name || "",
          downloadURL: doc.downloadURL || "",
          storagePath: doc.storagePath || "",
          verified: doc.verified ?? false,
          uploadedAt: doc.uploadedAt || null,
        };
      });

      const finalSubmissionPayload = {
        ...data,
        documents: sanitizedDocumentsPayload, 
      };

      console.log("Committing clean document tree to Firestore:", finalSubmissionPayload);
      const success = await application.saveStepData(finalSubmissionPayload);
      if (success) {
        console.log("Documents Step Successfully Saved to Firestore.");
      }
    } catch (err) {
      console.error("Failed to execute documents form submission:", err);
    }
  };

  // 🟢 SAFE LAYOUT RENDER GUARD: Placed beneath hook calculations to honor React's execution framework
  if (!currentUserId) {
    return (
      <div className={styles.loadingContainer}>
        <div className="spinner-border spinner-border-sm text-info me-2" role="status" />
        <span>Verifying active registry session credentials...</span>
      </div>
    );
  }

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>Supporting Documents</h2>
        <p className={styles.description}>
          Upload the required supporting compliance documents and a passport photo before submitting your application.
        </p>
      </header>

    <DocumentGrid
  documents={documents ?? []}
  processing={processing}
  onUpload={uploadDocument}   // Calls the hook to assign uid storage paths
  onReplace={replaceDocument} // Fires cleanup routines for old storage paths
  onRemove={removeDocument}   // Releases local object URL memory blocks
  onRetry={retryDocument}     // Retries failed upload tasks
  onCancel={cancelDocument}   // Safely aborts the active stream task
  errors={errors?.documents}
/>


      <WizardFooter loading={application.isSaving || processing} />
    </form>
  );
}

Documents.propTypes = {
  initialData: PropTypes.object,
  formId: PropTypes.string.isRequired,
};
