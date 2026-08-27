import { useCallback, useMemo, useState } from "react";
import documentRequirements from "../constants/documentRequirements";
import initializeDocumentState from "../utils/initializeDocumentState";
import mergeDocuments from "../utils/mergeDocuments";
import cleanupDocumentPreviews from "../utils/cleanupDocumentPreviews";
import createUploadJob from "../utils/createUploadJob";
import createPreview from "../utils/createPreview";
import useDocumentActions from "./useDocumentActions";
import useUploadQueue from "./useUploadQueue";
import useUploadProcessor from "./useUploadProcessor";
import { deleteFile, createStoragePath } from "../services/storageService";

export default function useDocumentUpload(
  savedDocuments = {},
  uid // CRITICAL FIX: Accepting uid parameter to dynamically compile storage paths
) {
  /*
  ----------------------------------------
  Document State
  ----------------------------------------
  */
  const [documentState, setDocumentState] = useState(() =>
    initializeDocumentState(savedDocuments)
  );

  /*
  ----------------------------------------
  Merge Requirements + State
  ----------------------------------------
  */
  const documents = useMemo(() => {
    return mergeDocuments(documentRequirements, documentState);
  }, [documentState]);

  /*
  ----------------------------------------
  Update One Document
  ----------------------------------------
  */
  const updateDocument = useCallback((documentId, updates) => {
    setDocumentState((previous) => ({
      ...previous,
      [documentId]: {
        ...(previous[documentId] ?? {}),
        ...updates,
      },
    }));
  }, []);

  /*
  ----------------------------------------
  Reset Documents
  ----------------------------------------
  */
  const resetDocuments = useCallback((saved = {}) => {
    cleanupDocumentPreviews(documentState);
    setDocumentState(initializeDocumentState(saved));
  }, [documentState]);

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
  Upload Processor Instance
  ----------------------------------------
  */
  const processor = useUploadProcessor({
    queue: uploadQueue.queue,
    startProcessing: uploadQueue.startProcessing,
    stopProcessing: uploadQueue.stopProcessing,
    getNextJob: uploadQueue.getNextJob,
    dequeue: uploadQueue.dequeue,
    updateDocument,
  });

  /*
  ----------------------------------------
  Upload Document
  ----------------------------------------
  */
  const uploadDocument = useCallback(
    ({ documentId, file, metadata = {} }) => {
      // 👇 Safety lock: Stop execution if UID isn't resolved yet
      if (!uid) {
        console.error(`Upload rejected for [${documentId}]: Auth profile state resolving. User UID is missing.`);
        alert("Authentication context is initializing. Please wait a second and retry your upload.");
        return;
      }

      /* Validate and prepare document */
      actions.selectFile(documentId, file);

      /* Create file local blob preview details and register path safely */
      const previewData = createPreview(file);
      const storagePath = createStoragePath({
        uid,
        documentId,
        fileName: file.name,
      });

      updateDocument(documentId, {
        fileName: file.name,
        previewUrl: previewData.previewUrl,
        isImage: previewData.isImage,
        status: "queued",
        error: null,
      });

      /* Create upload job with robust path allocations */
      const job = createUploadJob({
        documentId,
        file,
        path: storagePath,
        metadata,
      });

      /* Add to upload queue */
      uploadQueue.enqueue(job);
      return job;
    },
    [actions, uploadQueue, updateDocument, uid]
  ); // 🌟 Closed and verified bracket dependencies mapping loop

  /*
  ----------------------------------------
  Replace Document
  ----------------------------------------
  */
  const replaceDocument = useCallback(
    ({ documentId, file, metadata = {} }) => {
      /* Remove existing document state */
      actions.removeFile(documentId);

      /* Upload replacement */
      return uploadDocument({
        documentId,
        file,
        metadata,
      });
    },
    [actions, uploadDocument]
  );

  /*
  ----------------------------------------
  Remove Document
  ----------------------------------------
  */
  const removeDocument = useCallback(
    async (documentId) => {
      /* Find current document */
      const document = documents.find((item) => item.id === documentId);
      if (!document) return;

      /* Cancel queued upload */
      uploadQueue.removeJob(documentId);

      /* Terminate active background data stream */
      if (typeof processor?.cancelActiveTask === "function") {
        processor.cancelActiveTask(documentId);
      }

      /* Delete uploaded file */
      if (document.storagePath) {
        try {
          await deleteFile(document.storagePath);
        } catch (error) {
          console.error("Unable to delete document:", error);
        }
      }

      /* Reset local state */
      actions.removeFile(documentId);
    },
    [documents, uploadQueue, actions, processor]
  );

  /*
  ----------------------------------------
  Retry Document Upload
  ----------------------------------------
  */
  const retryDocument = useCallback(
    (documentId) => {
      const document = documents.find((item) => item.id === documentId);
      if (!document?.file) return;

      /* Reset upload state */
      updateDocument(documentId, {
        status: "queued",
        uploadProgress: 0,
        error: null,
      });

      /* Regenerate specific target destination paths */
      const storagePath =
        document.storagePath ||
        createStoragePath({
          uid,
          documentId,
          fileName: document.file.name,
        });

      /* Create fresh upload job */
      const job = createUploadJob({
        documentId,
        file: document.file,
        path: storagePath,
        metadata: document.metadata || {},
      });

      uploadQueue.enqueue(job);
      return job;
    },
    [documents, updateDocument, uploadQueue, uid]
  );

  /*
  ----------------------------------------
  Cancel Document Upload
  ----------------------------------------
  */
  const cancelDocument = useCallback(
    (documentId) => {
      /* Remove queued upload job */
      uploadQueue.removeDocumentJob?.(documentId) || uploadQueue.removeJob?.(documentId);

      /* Terminate background direct pipeline threads */
      if (typeof processor?.cancelActiveTask === "function") {
        processor.cancelActiveTask(documentId);
      }

      /* Reset document upload state */
      updateDocument(documentId, {
        status: "cancelled",
        uploadProgress: 0,
        error: null,
      });
    },
    [uploadQueue, updateDocument, processor]
  );

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
    processing: uploadQueue.processing,
    queueLength: uploadQueue.queueLength,
    hasJobs: uploadQueue.hasJobs,
    clearQueue: uploadQueue.clearQueue,
  };
}
