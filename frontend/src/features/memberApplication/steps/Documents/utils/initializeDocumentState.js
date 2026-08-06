export default function initializeDocumentState(
  savedDocuments = {}
) {
  return Object.entries(savedDocuments).reduce(
    (state, [id, document]) => {
      state[id] = {
        status:
          document.status ?? "pending",

        file: null,

        fileName:
          document.fileName ?? "",

        previewUrl:
          document.previewUrl ?? "",

        downloadURL:
          document.downloadURL ?? "",

        uploadProgress:
          document.uploadProgress ?? 0,

        uploading: false,

        verified:
          document.verified ?? false,

        uploadedAt:
          document.uploadedAt ?? null,
      };

      return state;
    },
    {}
  );
}