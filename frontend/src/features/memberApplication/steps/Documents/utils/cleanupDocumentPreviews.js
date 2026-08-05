import revokePreview from "./revokePreview";

export default function cleanupDocumentPreviews(
  documentState = {}
) {
  Object.values(documentState).forEach(
    (document) => {
      revokePreview(document?.previewUrl);
    }
  );
}