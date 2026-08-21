import { useCallback, useEffect } from "react";

import {
  uploadFile,
} from "../services/storageService";

export default function useUploadProcessor({
  queue,
  processing,
  startProcessing,
  stopProcessing,
  getNextJob,
  removeJob,
  updateDocument,
}) {
  /*
  ----------------------------------------
  Process Next Upload
  ----------------------------------------
  */

  const processNextUpload = useCallback(
    async () => {
      /*
      Do not start another upload while one
      is already being processed.
      */

      if (processing) {
        return;
      }

      /*
      Get the next queued upload without
      removing it from the queue yet.
      */

      const job = getNextJob();

      if (!job) {
        return;
      }

      /*
      Mark the queue as processing.
      */

      startProcessing();

      try {
        /*
        ----------------------------------------
        Upload Started
        ----------------------------------------
        */

        updateDocument(job.documentId, {
          status: "uploading",

          uploadProgress: 0,

          error: null,
        });

        /*
        ----------------------------------------
        Firebase Upload
        ----------------------------------------
        */

        const result = await uploadFile({
          path: job.path,

          file: job.file,

          metadata: job.metadata,

          onProgress(progress) {
            updateDocument(job.documentId, {
              uploadProgress: progress,
            });
          },
        });

        /*
        ----------------------------------------
        Upload Complete
        ----------------------------------------
        */

        updateDocument(job.documentId, {
          status: "uploaded",

          uploadProgress: 100,

          downloadURL: result.downloadURL,

          storagePath: result.fullPath,

          uploadedAt: Date.now(),

          error: null,
        });

        /*
        Remove the successfully completed job.
        */

        removeJob(job.id);
      } catch (error) {
        /*
        ----------------------------------------
        Upload Failed
        ----------------------------------------
        */

        updateDocument(job.documentId, {
          status: "failed",

          uploadProgress: 0,

          error:
            error.message ??
            "Upload failed.",
        });

        /*
        Remove the failed job from the queue.

        The document state still retains the
        selected file and error information,
        allowing retryDocument() to create
        a fresh upload job.
        */

        removeJob(job.id);
      } finally {
        /*
        Always release the processing lock.
        */

        stopProcessing();
      }
    },
    [
      processing,
      getNextJob,
      removeJob,
      startProcessing,
      stopProcessing,
      updateDocument,
    ]
  );

  /*
  ----------------------------------------
  Watch Upload Queue
  ----------------------------------------

  Whenever jobs exist and no upload is
  currently processing, begin processing
  the next job.
  */

  useEffect(() => {
    if (
      queue.length === 0 ||
      processing
    ) {
      return;
    }

    processNextUpload();
  }, [
    queue.length,
    processing,
    processNextUpload,
  ]);

  /*
  ----------------------------------------
  Public API
  ----------------------------------------
  */

  return {
    processNextUpload,
  };
}