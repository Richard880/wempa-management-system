import { useCallback, useMemo, useState } from "react";

import documentRequirements from "../constants/documentRequirements";

import initializeDocumentState from "../utils/initializeDocumentState";
import mergeDocuments from "../utils/mergeDocuments";
import cleanupDocumentPreviews from "../utils/cleanupDocumentPreviews";
import createUploadJob from "../utils/createUploadJob";

import useDocumentActions from "./useDocumentActions";
import useUploadQueue from "./useUploadQueue";
import useUploadProcessor from "./useUploadProcessor";

import { deleteFile } from "../services/storageService";

export default function useDocumentUpload(
  savedDocuments = {}
) {
  /*
  ----------------------------------------
  Document State
  ----------------------------------------
  */

  const [documentState, setDocumentState] =
    useState(() =>
      initializeDocumentState(savedDocuments)
    );

  /*
  ----------------------------------------
  Merge Requirements + State
  ----------------------------------------
  */

  const documents = useMemo(() => {
    return mergeDocuments(
      documentRequirements,
      documentState
    );
  }, [documentState]);

  /*
  ----------------------------------------
  Update One Document
  ----------------------------------------
  */

  const updateDocument = useCallback(
    (documentId, updates) => {
      setDocumentState((previous) => ({
        ...previous,

        [documentId]: {
          ...(previous[documentId] ?? {}),

          ...updates,
        },
      }));
    },
    []
  );

  /*
  ----------------------------------------
  Reset Documents
  ----------------------------------------
  */

  const resetDocuments = useCallback(
    (saved = {}) => {
      cleanupDocumentPreviews(documentState);

      setDocumentState(
        initializeDocumentState(saved)
      );
    },
    [documentState]
  );

  /*
  ----------------------------------------
  Upload Queue
  ----------------------------------------
  */

  const uploadQueue = useUploadQueue();

  /*
  ----------------------------------------
  Document Actions
  ----------------------------------------
  */

  const actions = useDocumentActions({
    documents,

    updateDocument,
  });

  /*
  ----------------------------------------
  Queue Upload Helper
  ----------------------------------------
  */

 /*
----------------------------------------
Upload Document
----------------------------------------
*/

const uploadDocument = useCallback(
  ({
    documentId,
    file,
    path,
    metadata = {},
  }) => {
    /*
    Validate and prepare document
    */

    actions.selectFile(
      documentId,
      file
    );

    /*
    Create upload job
    */

    const job = createUploadJob({
      documentId,

      file,

      path,

      metadata,
    });

    /*
    Add to upload queue
    */

    uploadQueue.enqueue(job);

    return job;
  },
  [
    actions,
    uploadQueue,
  ]
);


/*
----------------------------------------
Replace Document
----------------------------------------
*/

const replaceDocument = useCallback(
  ({
    documentId,
    file,
    path,
    metadata = {},
  }) => {
    /*
    Remove existing document state
    */

    actions.removeFile(documentId);

    /*
    Upload replacement
    */

    return uploadDocument({
      documentId,

      file,

      path,

      metadata,
    });
  },
  [
    actions,
    uploadDocument,
  ]
);

/*
----------------------------------------
Remove Document
----------------------------------------
*/

const removeDocument = useCallback(
  async (documentId) => {
    /*
    Find current document
    */

    const document = documents.find(
      (item) => item.id === documentId
    );

    if (!document) {
      return;
    }

    /*
    Cancel queued upload
    */

    uploadQueue.removeJob(documentId);

    /*
    Delete uploaded file
    */

    if (document.storagePath) {
      try {
        await deleteFile(
          document.storagePath
        );
      } catch (error) {
        console.error(
          "Unable to delete document:",
          error
        );
      }
    }

    /*
    Reset local state
    */

    actions.removeFile(documentId);
  },
  [
    documents,
    uploadQueue,
    actions,
  ]
);


/*
----------------------------------------
Retry Document Upload
----------------------------------------
*/

const retryDocument = useCallback(
  (documentId) => {
    const document = documents.find(
      (item) => item.id === documentId
    );

    if (!document?.file) {
      return;
    }

    /*
    Reset upload state
    */

    updateDocument(documentId, {
      status: "queued",

      uploadProgress: 0,

      error: null,
    });

    /*
    Create fresh upload job
    */

    const job = createUploadJob({
      documentId,

      file: document.file,

      path: document.storagePath,

      metadata: document.metadata,
    });

    uploadQueue.enqueue(job);

    return job;
  },
  [
    documents,
    updateDocument,
    uploadQueue,
  ]
);


/*
----------------------------------------
Cancel Document Upload
----------------------------------------
*/

const cancelDocument = useCallback(
  (documentId) => {
    /*
    Remove queued upload job
    */

    uploadQueue.removeDocumentJob(documentId);

    /*
    Reset document upload state
    */

    updateDocument(documentId, {
      status: "cancelled",

      uploadProgress: 0,

      error: null,
    });
  },
  [
    uploadQueue,
    updateDocument,
  ]
);


  /*
  ----------------------------------------
  Upload Processor
  ----------------------------------------
  */

  useUploadProcessor({
    queue: uploadQueue.queue,

    processing: uploadQueue.processing,

    startProcessing:
      uploadQueue.startProcessing,

    stopProcessing:
      uploadQueue.stopProcessing,

    dequeue: uploadQueue.dequeue,

    updateDocument,
  });

  /*
  ----------------------------------------
  Public API
  ----------------------------------------
  */

  return {
  documents,

  documentState,

  updateDocument,

  resetDocuments,

  uploadDocument,

  replaceDocument,

  removeDocument,

    retryDocument,

    cancelDocument,


  processing:
    uploadQueue.processing,

  queueLength:
    uploadQueue.queueLength,

  hasJobs:
    uploadQueue.hasJobs,

  clearQueue:
    uploadQueue.clearQueue,

 
};
};