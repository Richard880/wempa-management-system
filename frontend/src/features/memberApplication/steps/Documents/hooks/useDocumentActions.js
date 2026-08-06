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
  Select File
  ----------------------------------------
  */

  const selectFile = useCallback(
    (documentId, file) => {
      const document = findDocument(documentId);

      if (!document || !file) {
        return;
      }

      validateDocument(document, file);

      revokePreview(document.previewUrl);

      const preview = createPreview(file);

      updateDocument(documentId, {
        ...preview,

        status: "selected",

        uploadProgress: 0,

        uploading: false,

        error: null,
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

        status: "pending",

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

  /*
  ----------------------------------------
  Upload Placeholder
  ----------------------------------------
  */

  const uploadFile = useCallback(
    async (documentId) => {
      /*
      Firebase Storage integration
      comes next.
      */

      console.log(
        "Uploading:",
        documentId
      );
    },
    []
  );

  /*
  ----------------------------------------
  Retry Upload Placeholder
  ----------------------------------------
  */

  const retryUpload = useCallback(
    async (documentId) => {
      console.log(
        "Retry upload:",
        documentId
      );
    },
    []
  );

  /*
  ----------------------------------------
  Cancel Upload Placeholder
  ----------------------------------------
  */

  const cancelUpload = useCallback(
    (documentId) => {
      console.log(
        "Cancel upload:",
        documentId
      );
    },
    []
  );

  return {
    selectFile,

    removeFile,

    replaceFile,

    uploadFile,

    retryUpload,

    cancelUpload,
  };
}