import {
  useCallback,
  useEffect,
  useState,
} from "react";

import useUploadQueue from "../../memberApplication/steps/Documents/hooks/useUploadQueue";
import useUploadProcessor from "../../memberApplication/steps/Documents/hooks/useUploadProcessor";

import createUploadJob from "../../memberApplication/steps/Documents/utils/createUploadJob";

import {
  deleteFile,
} from "../../memberApplication/steps/Documents/services/storageService";

import createPreview from "../../memberApplication/steps/Documents/utils/createPreview";
import revokePreview from "../../memberApplication/steps/Documents/utils/revokePreview";

import createEventPosterPath from "../utils/createEventPosterPath";
import validateEventPoster from "../utils/validateEventPoster";

/**
 * ==========================================
 * Event Poster Upload Hook
 * ==========================================
 *
 * Manages a single event poster and reuses
 * the centralized WEMPA upload infrastructure.
 */
export default function useEventPosterUpload({
  eventId,
  value = null,
  onChange,
} = {}) {
  /* ==========================================
     Poster State
     ========================================== */

  const [poster, setPoster] = useState(() => ({
    file: null,

    fileName:
      value?.fileName ?? "",

    fileSize:
      value?.fileSize ?? 0,

    fileType:
      value?.fileType ?? "",

    previewUrl:
      value?.posterUrl ??
      value?.downloadURL ??
      "",

    downloadURL:
      value?.posterUrl ??
      value?.downloadURL ??
      "",

    storagePath:
      value?.posterStoragePath ??
      value?.storagePath ??
      "",

    status:
      value?.posterUrl ||
      value?.downloadURL
        ? "uploaded"
        : "pending",

    uploadProgress:
      value?.posterUrl ||
      value?.downloadURL
        ? 100
        : 0,

    error: null,

    uploadedAt:
      value?.uploadedAt ?? null,
  }));

  /* ==========================================
     Upload Queue
     ========================================== */

  const uploadQueue = useUploadQueue();

  /* ==========================================
     Update Poster
     ========================================== */

  const updatePoster = useCallback((updates) => {
    setPoster((previous) => ({
      ...previous,
      ...updates,
    }));
  }, []);

  /* ==========================================
     Sync Parent Value
     ========================================== */

  useEffect(() => {
    if (!onChange) {
      return;
    }

    onChange({
      fileName: poster.fileName,
      fileSize: poster.fileSize,
      fileType: poster.fileType,

      posterUrl:
        poster.downloadURL || null,

      posterStoragePath:
        poster.storagePath || null,

      uploadedAt:
        poster.uploadedAt ?? null,

      status:
        poster.status,
    });
  }, [
    poster.fileName,
    poster.fileSize,
    poster.fileType,
    poster.downloadURL,
    poster.storagePath,
    poster.uploadedAt,
    poster.status,
    onChange,
  ]);

  /* ==========================================
     Select Poster
     ========================================== */

  const selectPoster = useCallback(
    (file) => {
      if (!file) {
        return;
      }

      validateEventPoster(file);

      /*
       * Remove an existing local preview URL.
       */
      if (
        poster.previewUrl?.startsWith("blob:")
      ) {
        revokePreview(poster.previewUrl);
      }

      /*
       * Create the new local preview.
       */
      const preview = createPreview(file);

      updatePoster({
        ...preview,

        fileName: file.name,

        fileSize: file.size,

        fileType: file.type,

        /*
         * Clear uploaded file information.
         *
         * The new file has not reached Firebase
         * Storage yet.
         */
        downloadURL: "",

        storagePath: "",

        status: "selected",

        uploadProgress: 0,

        error: null,

        uploadedAt: null,
      });
    },
    [
      poster.previewUrl,
      updatePoster,
    ]
  );

  /* ==========================================
     Upload Poster
     ========================================== */

  const uploadPoster = useCallback(() => {
    if (!eventId) {
      throw new Error(
        "An event ID is required before uploading a poster."
      );
    }

    if (!poster.file) {
      throw new Error(
        "Please select an event poster before uploading."
      );
    }

    /*
     * Prevent duplicate uploads while this
     * poster is already queued or uploading.
     */
    if (
      poster.status === "queued" ||
      poster.status === "uploading"
    ) {
      return;
    }

    /*
     * Build the Firebase Storage path.
     */
    const path = createEventPosterPath({
      eventId,
      fileName: poster.file.name,
    });

    /*
     * Create standardized upload job.
     */
    const job = createUploadJob({
      documentId: "eventPoster",

      file: poster.file,

      path,

      metadata: {
        contentType: poster.file.type,

        customMetadata: {
          eventId,
          uploadType: "eventPoster",
        },
      },
    });

    /*
     * Update UI state before queuing.
     *
     * Do NOT set storagePath here.
     * The actual Firebase path is only stored
     * after upload succeeds.
     */
    updatePoster({
      status: "queued",
      uploadProgress: 0,
      error: null,
    });

    uploadQueue.enqueue(job);

    return job;
  }, [
    eventId,
    poster.file,
    poster.status,
    updatePoster,
    uploadQueue,
  ]);

  /* ==========================================
     Select And Upload Poster
     ========================================== */

  const selectAndUploadPoster = useCallback(
    (file) => {
      if (!file) {
        return;
      }

      validateEventPoster(file);

      /*
       * Revoke the old local preview.
       */
      if (
        poster.previewUrl?.startsWith("blob:")
      ) {
        revokePreview(poster.previewUrl);
      }

      /*
       * Create preview.
       */
      const preview = createPreview(file);

      /*
       * An event ID is required because this
       * determines the Firebase Storage path.
       */
      if (!eventId) {
        throw new Error(
          "An event ID is required before uploading a poster."
        );
      }

      const path = createEventPosterPath({
        eventId,
        fileName: file.name,
      });

      /*
       * Immediately show the selected image.
       *
       * Do not save storagePath yet because
       * the upload has not completed.
       */
      updatePoster({
        ...preview,

        fileName: file.name,

        fileSize: file.size,

        fileType: file.type,

        downloadURL: "",

        storagePath: "",

        status: "queued",

        uploadProgress: 0,

        error: null,

        uploadedAt: null,
      });

      const job = createUploadJob({
        documentId: "eventPoster",

        file,

        path,

        metadata: {
          contentType: file.type,

          customMetadata: {
            eventId,
            uploadType: "eventPoster",
          },
        },
      });

      uploadQueue.enqueue(job);

      return job;
    },
    [
      eventId,
      poster.previewUrl,
      updatePoster,
      uploadQueue,
    ]
  );

  /* ==========================================
     Remove Poster
     ========================================== */

  const removePoster = useCallback(
    async () => {
      /*
       * Remove any queued upload first.
       */
      uploadQueue.removeDocumentJob(
        "eventPoster"
      );

      /*
       * Delete from Firebase Storage only if
       * an upload actually completed and gave
       * us a confirmed storage path.
       */
      if (poster.storagePath) {
        try {
          await deleteFile(
            poster.storagePath
          );
        } catch (error) {
          console.error(
            "Unable to delete event poster:",
            error
          );

          throw error;
        }
      }

      /*
       * Revoke local object URL.
       */
      if (
        poster.previewUrl?.startsWith("blob:")
      ) {
        revokePreview(
          poster.previewUrl
        );
      }

      /*
       * Reset poster state.
       */
      setPoster({
        file: null,
        fileName: "",
        fileSize: 0,
        fileType: "",
        previewUrl: "",
        downloadURL: "",
        storagePath: "",
        status: "pending",
        uploadProgress: 0,
        error: null,
        uploadedAt: null,
      });
    },
    [
      poster.storagePath,
      poster.previewUrl,
      uploadQueue,
    ]
  );

  /* ==========================================
     Retry Upload
     ========================================== */

  const retryUpload = useCallback(() => {
    if (!poster.file) {
      return;
    }

    updatePoster({
      status: "selected",
      uploadProgress: 0,
      error: null,
    });

    return uploadPoster();
  }, [
    poster.file,
    updatePoster,
    uploadPoster,
  ]);

  /* ==========================================
     Upload Processor Adapter
     ========================================== */

  const updateUploadState = useCallback(
    (documentId, updates) => {
      if (
        documentId !== "eventPoster"
      ) {
        return;
      }

      updatePoster(updates);
    },
    [updatePoster]
  );

  useUploadProcessor({
    queue: uploadQueue.queue,

    processing:
      uploadQueue.processing,

    startProcessing:
      uploadQueue.startProcessing,

    stopProcessing:
      uploadQueue.stopProcessing,

    getNextJob:
      uploadQueue.getNextJob,

    removeJob:
      uploadQueue.removeJob,

    updateDocument:
      updateUploadState,
  });

  /* ==========================================
     Cleanup Preview
     ========================================== */

  useEffect(() => {
    return () => {
      if (
        poster.previewUrl?.startsWith("blob:")
      ) {
        revokePreview(
          poster.previewUrl
        );
      }
    };
  }, [poster.previewUrl]);

  /* ==========================================
     Public API
     ========================================== */

  return {
    poster,

    selectPoster,

    selectAndUploadPoster,

    uploadPoster,

    removePoster,

    retryUpload,

    processing:
      uploadQueue.processing,

    uploading:
      poster.status === "uploading",

    uploadProgress:
      poster.uploadProgress,

    error:
      poster.error,

    isUploaded:
      poster.status === "uploaded",

    hasPoster:
      Boolean(
        poster.previewUrl ||
        poster.downloadURL ||
        poster.file
      ),
  };
}