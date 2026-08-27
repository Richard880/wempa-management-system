import { useCallback } from "react";

import validateDocument from "../utils/validateDocument";
import createPreview from "../utils/createPreview";
import revokePreview from "../utils/revokePreview";

export default function useDocumentActions({
  documents,
  updateDocument,
}) {
  /*
  ----------------------------------------
  Find Document
  ----------------------------------------
  */

  const findDocument = useCallback(
    (documentId) =>
      documents.find(
        (document) => document.id === documentId
      ),
    [documents]
  );

  /*
  ----------------------------------------
  Select File (State Integrity Fix)
  ----------------------------------------
  */

  const selectFile = useCallback(
    (documentId, file) => {
      const document = findDocument(documentId);

      if (!document || !file) {
        return;
      }

      // Run local size and type constraints validation checks
      validateDocument(document, file);

      // Free up browser hardware memory from old cached blob references
      revokePreview(document.previewUrl);

      const preview = createPreview(file);

      /*
      CRITICAL FIX: Merge the preview parameters safely. 
      Do NOT inject structural system status words like 'selected' or 'uploading: false' 
      here, as they will override the active background task processor threads.
      */
      updateDocument(documentId, {
        file,
        fileName: preview.fileName,
        fileSize: preview.fileSize,
        fileType: preview.fileType,
        isImage: preview.isImage,
        previewUrl: preview.previewUrl,
        error: null
      });
    },
    [findDocument, updateDocument]
  );

  /*
  ----------------------------------------
  Remove File
  ----------------------------------------
  */

  const removeFile = useCallback(
    (documentId) => {
      const document = findDocument(documentId);

      if (!document) {
        return;
      }

      revokePreview(document.previewUrl);

      updateDocument(documentId, {
        file: null,

        fileName: "",

        fileSize: 0,

        fileType: "",

        previewUrl: "",

        downloadURL: "",

        uploadProgress: 0,

        uploading: false,

        verified: false,

        uploadedAt: null,

        status: "pending", // Reverts cleanly to baseline default

        error: null,
      });
    },
    [findDocument, updateDocument]
  );

  /*
  ----------------------------------------
  Replace File
  ----------------------------------------
  */

  const replaceFile = useCallback(
    (documentId, file) => {
      removeFile(documentId);

      selectFile(documentId, file);
    },
    [removeFile, selectFile]
  );

  return {
    selectFile,

    removeFile,

    replaceFile,
  };
}
