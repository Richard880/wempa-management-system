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
  Queue Operations
  ----------------------------------------
  */

  const enqueue = useCallback((job) => {
    setQueue((previous) => [
      ...previous,
      job,
    ]);
  }, []);

  const enqueueMany = useCallback((jobs) => {
    setQueue((previous) => [
      ...previous,
      ...jobs,
    ]);
  }, []);

  const dequeue = useCallback(() => {
    let removedJob = null;

    setQueue((previous) => {
      if (previous.length === 0) {
        return previous;
      }

      removedJob = previous[0];

      return previous.slice(1);
    });

    return removedJob;
  }, []);

  const clearQueue = useCallback(() => {
    setQueue([]);
  }, []);

  const removeJob = useCallback((jobId) => {
    setQueue((previous) =>
      previous.filter(
        (job) => job.id !== jobId
      )
    );
  }, []);

  /*
  ----------------------------------------
  Processing State
  ----------------------------------------
  */

  const startProcessing =
    useCallback(() => {
      setProcessing(true);
    }, []);

  const stopProcessing =
    useCallback(() => {
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

  return {
    queue,

    processing,

    queueLength,

    hasJobs,

    enqueue,

    enqueueMany,

    dequeue,

    removeJob,

    clearQueue,

    startProcessing,

    stopProcessing,
  };
}