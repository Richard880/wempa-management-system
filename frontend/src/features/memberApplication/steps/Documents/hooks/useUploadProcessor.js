import { useCallback, useEffect } from "react";

import {
  uploadFile,
} from "../services/storageService";

export default function useUploadProcessor({
  queue,
  processing,
  startProcessing,
  stopProcessing,
  dequeue,
  updateDocument,
}) {
  /*
  ----------------------------------------
  Process One Upload
  ----------------------------------------
  */

  const processNextUpload =
    useCallback(async () => {
      if (processing) {
        return;
      }

      const job = dequeue();

      if (!job) {
        return;
      }

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

        const result =
          await uploadFile({
            path: job.path,

            file: job.file,

            metadata: job.metadata,

            onProgress(progress) {
              updateDocument(
                job.documentId,
                {
                  uploadProgress:
                    progress,
                }
              );
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

          downloadURL:
            result.downloadURL,

          storagePath:
            result.fullPath,

          uploadedAt:
            Date.now(),

          error: null,
        });
      } catch (error) {
        updateDocument(job.documentId, {
          status: "failed",

          error:
            error.message ??
            "Upload failed.",
        });
      } finally {
        stopProcessing();
      }
    }, [
      dequeue,
      processing,
      startProcessing,
      stopProcessing,
      updateDocument,
    ]);

  /*
  ----------------------------------------
  Watch Queue
  ----------------------------------------
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
    queue,
    processing,
    processNextUpload,
  ]);

  return {
    processNextUpload,
  };
}