import { useCallback, useMemo, useState } from "react";

export default function useUploadQueue() {
  /*
  ----------------------------------------
  Queue State
  ----------------------------------------
  */

  const [queue, setQueue] = useState([]);

  const [processing, setProcessing] = useState(false);

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

      return [...previous, job];
    });
  }, []);

  const enqueueMany = useCallback((jobs = []) => {
    if (!Array.isArray(jobs) || jobs.length === 0) {
      return;
    }

    setQueue((previous) => {
      const existingJobIds = new Set(previous.map((job) => job.id));

      const validJobs = jobs.filter(
        (job) => job?.id && !existingJobIds.has(job.id)
      );

      return [...previous, ...validJobs];
    });
  }, []);

  /*
  ----------------------------------------
  Read & Dequeue Next Job
  ----------------------------------------
  CRITICAL FIX: Atomically extract the job and remove it from the
  pending state array immediately. This guarantees that your background
  processor useEffect never catches the same job twice in a fast loop.
  */

     /*
  ----------------------------------------
  Read Next Job (Synchronous View)
  ----------------------------------------
  */
  const getNextJob = useCallback(() => {
    return queue[0] ?? null;
  }, [queue]);

  /*
  ----------------------------------------
  Dequeue Next Job (Atomic Shift)
  ----------------------------------------
  */
  const dequeue = useCallback(() => {
    setQueue((previous) => previous.slice(1));
  }, []);

  /*
  ----------------------------------------
  Remove Job By Unique Job ID
  ----------------------------------------
  Kept for legacy fallbacks or manual interventions.
  */

  const removeJob = useCallback((jobId) => {
    if (!jobId) {
      return;
    }

    setQueue((previous) => previous.filter((job) => job.id !== jobId));
  }, []);

  /*
  ----------------------------------------
  Remove Jobs By Document ID
  ----------------------------------------
  Used by the member document upload system to pull files from the queue
  before they begin processing.
  */

  const removeDocumentJob = useCallback((documentId) => {
    if (!documentId) {
      return;
    }

    setQueue((previous) =>
      previous.filter((job) => job.documentId !== documentId)
    );
  }, []);

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

  const queueLength = useMemo(() => queue.length, [queue]);

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
    dequeue, // <-- Add this here
    removeJob,
    removeDocumentJob,
    clearQueue,
    startProcessing,
    stopProcessing,
  };


  
}
