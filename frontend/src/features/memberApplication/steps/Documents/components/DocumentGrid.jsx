import PropTypes from "prop-types";

import DocumentUploadCard from "./DocumentUploadCard";

import styles from "../Documents.module.css";

function DocumentGrid({
  documents,

  onUpload,

  onReplace,

  onRemove,

  onRetry,

  onCancel,
}) {
  return (
    <div className={styles.grid}>
      {documents.map((document) => (
        <DocumentUploadCard
          key={document.id}
          document={document}
          onUpload={(file) =>
            onUpload?.({
              documentId: document.id,
              file,
            })
          }
          onReplace={(file) =>
            onReplace?.({
              documentId: document.id,
              file,
            })
          }
          onRemove={() =>
            onRemove?.(document.id)
          }
          onRetry={() =>
            onRetry?.(document.id)
          }
          onCancel={() =>
            onCancel?.(document.id)
          }
        />
      ))}
    </div>
  );
}

DocumentGrid.propTypes = {
  documents: PropTypes.array.isRequired,

  onUpload: PropTypes.func,

  onReplace: PropTypes.func,

  onRemove: PropTypes.func,

  onRetry: PropTypes.func,

  onCancel: PropTypes.func,
};

export default DocumentGrid;