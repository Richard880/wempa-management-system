import { useRef } from "react";
import PropTypes from "prop-types";
import Button from "../../../../../components/ui/Button";
import DocumentPreview from "./DocumentPreview";
import DocumentStatusBadge from "./DocumentStatusBadge";
import UploadProgress from "./UploadProgress";
import styles from "../Documents.module.css";

function DocumentUploadCard({
  document,
  onUpload,
  onReplace,
  onRemove,
  onRetry,
  onCancel,
}) {
  const {
  
    title,
    description,
    required,
    status = "pending",
    file,
    previewUrl,
    acceptedTypes,
    uploadProgress = 0,
  } = document;

  const fileInputRef = useRef(null);
  const hasDocument = Boolean(file) || Boolean(previewUrl);

  const handleChooseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    // FIX: Added [0] to correctly capture the first selected file
    const selectedFile = event.target.files?.[0];
    
    if (!selectedFile) return;

    if (hasDocument) {
      onReplace?.(selectedFile);
    } else {
      onUpload?.(selectedFile);
    }

    // Reset the input value so the same file can be re-selected if needed
    event.target.value = ""; 
  };

  return (
    <article className={styles.card}>
      <header className={styles.cardHeader}>
        <div>
          <h5 className={styles.cardTitle}>
            {title}
            {required && <span className={styles.required} aria-hidden="true">*</span>}
          </h5>
          {description && <p className={styles.cardDescription}>{description}</p>}
        </div>
        <DocumentStatusBadge status={status} />
      </header>

      <DocumentPreview file={file} previewUrl={previewUrl} />

      <UploadProgress uploading={status === "uploading"} progress={uploadProgress} />

      <footer className={styles.cardFooter}>
        <input
          type="file"
          ref={fileInputRef}
          hidden
          accept={acceptedTypes}
          onChange={handleFileChange}
        />

        {(status === "pending" ||
          status === "uploaded" ||
          status === "verified" ||
          status === "rejected" ||
          status === "failed") && (
          <Button
            type="button"
            onClick={handleChooseClick}
          >
            {hasDocument ? "Replace Document" : "Choose Document"}
          </Button>
        )}

        {hasDocument && (
          <Button type="button" variant="danger" onClick={onRemove}>
            Remove
          </Button>
        )}

        {status === "failed" && (
          <Button type="button" variant="secondary" onClick={onRetry}>
            Retry Upload
          </Button>
        )}

        {status === "uploading" && (
          <Button type="button" variant="warning" onClick={onCancel}>
            Cancel Upload
          </Button>
        )}
      </footer>
    </article>
  );
}

DocumentUploadCard.propTypes = {
  document: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    required: PropTypes.bool,
    status: PropTypes.string,
    file: PropTypes.any,
    previewUrl: PropTypes.string,
    acceptedTypes: PropTypes.string,
    uploadProgress: PropTypes.number,
  }).isRequired,
  onUpload: PropTypes.func,
  onReplace: PropTypes.func,
  onRemove: PropTypes.func,
  onRetry: PropTypes.func,
  onCancel: PropTypes.func,
};

export default DocumentUploadCard;
