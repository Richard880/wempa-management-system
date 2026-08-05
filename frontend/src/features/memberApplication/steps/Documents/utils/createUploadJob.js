/**
 * ----------------------------------------
 * Create Upload Job
 * ----------------------------------------
 *
 * Normalizes every upload before it enters
 * the upload queue.
 */

export default function createUploadJob({
  documentId,
  file,
  path = "",
  metadata = {},
}) {
  return {
    /*
    ----------------------------------------
    Identity
    ----------------------------------------
    */

    id:
      crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}`,

    documentId,

    /*
    ----------------------------------------
    File
    ----------------------------------------
    */

    file,

    fileName: file?.name ?? "",

    fileSize: file?.size ?? 0,

    fileType: file?.type ?? "",

    /*
    ----------------------------------------
    Storage
    ----------------------------------------
    */

    path,

    metadata,

    /*
    ----------------------------------------
    Status
    ----------------------------------------
    */

    status: "queued",

    progress: 0,

    retries: 0,

    error: null,

    downloadURL: "",

    /*
    ----------------------------------------
    Timestamps
    ----------------------------------------
    */

    createdAt: Date.now(),

    startedAt: null,

    completedAt: null,
  };
}