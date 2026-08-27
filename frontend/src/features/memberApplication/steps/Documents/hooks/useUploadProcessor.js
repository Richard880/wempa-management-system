import { useCallback, useEffect, useRef } from "react";
import { uploadFile } from "../services/storageService";

export default function useUploadProcessor({
  queue,
  startProcessing,
  stopProcessing,
  getNextJob,
  dequeue,
  updateDocument,
}) {
  // Retains references to active native Firebase byte streams across re-renders
  const activeTasks = useRef(new Map());
  // Tracks job IDs currently being processed to prevent duplicate executions
  const processingJobs = useRef(new Set());

  // SAFELY ABSTRACT indicators if parent hooks (like News/Events) omit them
  const safeUpdate = useCallback((docId, data) => {
    if (typeof updateDocument === "function") {
      updateDocument(docId, data);
    } else {
      console.log(`[Upload Update Info] Asset ID: ${docId}`, data);
    }
  }, [updateDocument]);

  const processNextUpload = useCallback(async () => {
    // 1. Peek at the next job in the queue array synchronously
    if (typeof getNextJob !== "function") return;
    const job = getNextJob();
    if (!job) return;

    // 2. CRITICAL CONCURRENCY CHECK: If this exact job is already spinning up, bypass it
    if (processingJobs.current.has(job.id)) return;

    // Mark this job ID as actively executing before any asynchronous delays
    processingJobs.current.add(job.id);

    // 3. FIX: Safely slice it off the queue array if the method exists
    if (typeof dequeue === "function") {
      dequeue();
    } else {
      // Fallback for simpler arrays where dequeue wasn't mapped into the hook parameters
      console.log("Processing unstructured single item payload asset queue item.");
    }
    
    if (typeof startProcessing === "function") startProcessing();

    try {
      // 4. Update UI status indicators to uploading
      safeUpdate(job.documentId, {
        status: "uploading",
        uploadProgress: 0,
        error: null,
      });

      // 5. Fire parallel data pipe directly to Firebase
      const uploadTask = uploadFile({
        path: job.path,
        file: job.file,
        metadata: job.metadata,
        onProgress: (progress) => {
          safeUpdate(job.documentId, {
            uploadProgress: progress,
          });
        },
        onComplete: ({ downloadURL, fullPath }) => {
          safeUpdate(job.documentId, {
            status: "uploaded",
            uploadProgress: 100,
            downloadURL,
            storagePath: fullPath,
            uploadedAt: Date.now(),
            error: null,
          });
          
          // Cleanup task tracking memory
          activeTasks.current.delete(job.documentId);
          processingJobs.current.delete(job.id);
          
          if (activeTasks.current.size === 0 && typeof stopProcessing === "function") {
            stopProcessing();
          }
        },
        onError: (error) => {
          if (error.code === "storage/canceled") return;

          safeUpdate(job.documentId, {
            status: "failed",
            uploadProgress: 0,
            error: error.message ?? "Upload failed.",
          });
          
          activeTasks.current.delete(job.documentId);
          processingJobs.current.delete(job.id);
          
          if (activeTasks.current.size === 0 && typeof stopProcessing === "function") {
            stopProcessing();
          }
        },
      });

      // Secure live thread handle inside hardware cache map
      activeTasks.current.set(job.documentId, uploadTask);

    } catch (error) {
      safeUpdate(job.documentId, {
        status: "failed",
        uploadProgress: 0,
        error: error.message ?? "Failed to instantiate upload process.",
      });
      processingJobs.current.delete(job.id);
      if (activeTasks.current.size === 0 && typeof stopProcessing === "function") {
        stopProcessing();
      }
    }
  }, [getNextJob, dequeue, startProcessing, stopProcessing, safeUpdate]);

  /*
  ----------------------------------------
  Watch Upload Queue
  ----------------------------------------
  Loops recursively through the available queue items to start 
  all files simultaneously in separate threads.
  */
  useEffect(() => {
    if (!queue || queue.length === 0) return;

    // Fire processing execution thread
    processNextUpload();
  }, [queue?.length, processNextUpload]);

  const cancelActiveTask = useCallback((documentId) => {
    const runningTask = activeTasks.current.get(documentId);
    if (runningTask && typeof runningTask.cancel === "function") {
      runningTask.cancel();
      activeTasks.current.delete(documentId);
    }
    if (activeTasks.current.size === 0 && typeof stopProcessing === "function") {
      stopProcessing();
    }
  }, [stopProcessing]);

  return {
    processNextUpload,
    cancelActiveTask,
  };
}
