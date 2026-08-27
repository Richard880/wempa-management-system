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

// 1. IMPORT YOUR AUTH HOOK DIRECTLY INTO THIS FILE
import { useAuth } from "../../../auth/hooks/useAuth"; 

export default function Documents({ initialData, formId }) {
  const { state } = useWizard();
  const dynamicStepIndex = state?.currentStep || 3; 

  // 2. EXTRACT THE LIVE USER OBJECT DIRECTLY FROM AUTH
  const { auth } = useAuth();
  const directUser = auth?.currentUser;
  const currentUserId = directUser?.uid;

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

  // 👇 MOVE HOOK HERE: Initialize hook first so its methods are defined throughout the entire file scope
  const {
    documents,
    resetDocuments,
    uploadDocument,
    replaceDocument,
    removeDocument,
    retryDocument,
    cancelDocument,
    processing,
  } = useDocumentUpload(stableValues.documents, currentUserId);

  // 👇 LOADING GUARD: Safely blocks rendering elements below if user is not loaded yet
  if (!currentUserId) {
    return (
      <div className={styles.loadingContainer}>
        <i className="fas fa-spinner fa-spin me-2"></i> 
        Verifying secure user session...
      </div>
    );
  }

  /*
  ----------------------------------------
  Safe State Mapping Engine (Infinite Loop Prevention)
  ----------------------------------------
  */
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
  }, [documents, setValue]); 

  /*
  ----------------------------------------
  Hardened Step Data Submission
  ----------------------------------------
  */
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
        console.log("Documents Step Successfully Synchronized to Cloud.");
      }
    } catch (err) {
      console.error("Failed to execute documents form submission:", err);
    }
  };

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>Supporting Documents</h2>
        <p className={styles.description}>
          Upload the required supporting documents before submitting your application.
        </p>
      </header>

      <DocumentGrid
        documents={documents ?? []}
        processing={processing}
        onUpload={uploadDocument}
        onReplace={replaceDocument}
        onRemove={removeDocument}
        onRetry={retryDocument}
        onCancel={cancelDocument}
        errors={errors?.documents}
      />

      <WizardFooter loading={application?.isSaving || processing} />
    </form>
  );
}

Documents.propTypes = {
  initialData: PropTypes.object,
  formId: PropTypes.string.isRequired,
};
