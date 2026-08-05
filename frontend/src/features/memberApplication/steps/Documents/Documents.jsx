import { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import useApplicationFormStep from "../../hooks/useApplicationFormStep";
import DocumentGrid from "./components/DocumentGrid";
import documentsSchema from "./documentsSchema";
import defaultValues from "./defaultValues";
import useDocumentUpload from "./hooks/useDocumentUpload";
import styles from "./Documents.module.css";
import WizardFooter from "../../../../components/workflow/WizardFooter"; // Verified absolute relative asset link

export default function Documents({ initialData, formId }) {
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
    application, // Exposes { saveStepData, isSaving } from your unified hook layer
  } = useApplicationFormStep({
    section: "documents",
    currentStep: 7, // Keeps current operational order sync locked
    schema: documentsSchema,
    defaultValues: defaultValues,
    values: stableValues,
  });

  const documentValues = watch("documents") || {};

  const {
    documents,
    resetDocuments,
    uploadDocument,
    replaceDocument,
    removeDocument,
    retryDocument,
    cancelDocument,
    processing,
  } = useDocumentUpload(stableValues.documents);

  useEffect(() => {
    if (initialData?.documents) {
      resetDocuments(initialData.documents);
    }
  }, [initialData?.documents, resetDocuments]);

  useEffect(() => {
    if (!documents) return;
    
    const persisted = {};
    let hasChanges = false;

    documents.forEach((docItem) => {
      const existing = documentValues[docItem.id];
      if (
        !existing ||
        existing.status !== docItem.status ||
        existing.downloadURL !== docItem.downloadURL
      ) {
        hasChanges = true;
      }

      persisted[docItem.id] = {
        status: docItem.status,
        fileName: docItem.fileName,
        downloadURL: docItem.downloadURL || "",
        storagePath: docItem.storagePath || "",
        verified: docItem.verified ?? false,
        uploadedAt: docItem.uploadedAt || null,
      };
    });

    if (hasChanges && Object.keys(persisted).length > 0) {
      setValue("documents", persisted, { shouldDirty: true, shouldValidate: true });
    }
  }, [documents, setValue, documentValues]);

  const onSubmit = async (data) => {
    try {
      console.log("Saving Document data to Firestore:", data);
      
      // Clean processing boundary: Serializes uploaded file paths, saves metadata to Firestore, and pushes wizard forward
      const success = await application.saveStepData(data);
      if (success) {
        console.log("Documents Step Successfully Saved to Firestore.");
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

      {/* 
        CRITICAL: Render footer inside the form so type="submit" 
        automatically executes handleSubmit(onSubmit) natively.
      */}
      <WizardFooter loading={application.isSaving || processing} />
    </form>
  );
}

Documents.propTypes = {
  initialData: PropTypes.object,
  formId: PropTypes.string.isRequired,
};
