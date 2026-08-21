import { useCallback, useMemo, useState } from "react";

export default function useUploadQueue() {
  /*
  ----------------------------------------
  Queue State
  ----------------------------------------
  */

  const [queue, setQueue] = useState([]);

  const [processing, setProcessing] =
    useState(false);

  /*
  ----------------------------------------
  Add Jobs
  ----------------------------------------
  */

  const enqueue = useCallback((job) => {
    if (!job?.id) {
      return;
    }

    setQueue((previous) => {
      /*
      Prevent the exact same job from being
      added to the queue more than once.
      */

      const alreadyExists = previous.some(
        (queuedJob) => queuedJob.id === job.id
      );

      if (alreadyExists) {
        return previous;
      }

      return [
        ...previous,
        job,
      ];
    });
  }, []);

  const enqueueMany = useCallback((jobs = []) => {
    if (!Array.isArray(jobs) || jobs.length === 0) {
      return;
    }

    setQueue((previous) => {
      const existingJobIds = new Set(
        previous.map((job) => job.id)
      );

      const validJobs = jobs.filter(
        (job) =>
          job?.id &&
          !existingJobIds.has(job.id)
      );

      return [
        ...previous,
        ...validJobs,
      ];
    });
  }, []);

  /*
  ----------------------------------------
  Read Next Job
  ----------------------------------------

  This DOES NOT remove the job.

  The processor should explicitly remove the
  completed job after processing finishes.
  */

  const getNextJob = useCallback(() => {
    return queue[0] ?? null;
  }, [queue]);

  /*
  ----------------------------------------
  Remove Job By Unique Job ID
  ----------------------------------------
  */

  const removeJob = useCallback((jobId) => {
    if (!jobId) {
      return;
    }

    setQueue((previous) =>
      previous.filter(
        (job) => job.id !== jobId
      )
    );
  }, []);

  /*
  ----------------------------------------
  Remove Jobs By Document ID
  ----------------------------------------

  Used by the member document upload system.

  This removes any queued job associated with
  the specified document.
  */

  const removeDocumentJob = useCallback(
    (documentId) => {
      if (!documentId) {
        return;
      }

      setQueue((previous) =>
        previous.filter(
          (job) =>
            job.documentId !== documentId
        )
      );
    },
    []
  );

  /*
  ----------------------------------------
  Clear Queue
  ----------------------------------------
  */

  const clearQueue = useCallback(() => {
    setQueue([]);
  }, []);

  /*
  ----------------------------------------
  Processing State
  ----------------------------------------
  */

  const startProcessing = useCallback(() => {
    setProcessing(true);
  }, []);

  const stopProcessing = useCallback(() => {
    setProcessing(false);
  }, []);

  /*
  ----------------------------------------
  Queue Status
  ----------------------------------------
  */

  const queueLength = useMemo(
    () => queue.length,
    [queue]
  );

  const hasJobs = queueLength > 0;

  /*
  ----------------------------------------
  Public API
  ----------------------------------------
  */

  return {
    queue,

    processing,

    queueLength,

    hasJobs,

    enqueue,

    enqueueMany,

    getNextJob,

    removeJob,

    removeDocumentJob,

    clearQueue,

    startProcessing,

    stopProcessing,
  };
}