export default function mergeDocuments(
  documentRequirements = [],
  documentState = {}
) {
  return documentRequirements
    .slice()
    .sort(
      (a, b) =>
        (a.displayOrder ?? 0) -
        (b.displayOrder ?? 0)
    )
    .map((requirement) => ({
      ...requirement,

      ...(documentState[requirement.id] ?? {
        status: "pending",

        file: null,

        fileName: "",

        previewUrl: "",

        downloadURL: "",

        uploadProgress: 0,

        uploading: false,

        verified: false,

        uploadedAt: null,
      }),
    }));
}