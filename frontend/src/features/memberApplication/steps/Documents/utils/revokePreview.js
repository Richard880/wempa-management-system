export default function revokePreview(previewUrl) {
  if (
    !previewUrl ||
    typeof previewUrl !== "string"
  ) {
    return;
  }

  if (!previewUrl.startsWith("blob:")) {
    return;
  }

  try {
    URL.revokeObjectURL(previewUrl);
  } catch (error) {
    console.warn(
      "Failed to revoke preview URL:",
      error
    );
  }
}