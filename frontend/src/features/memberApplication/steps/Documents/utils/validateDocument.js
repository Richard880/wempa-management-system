export default function validateDocument(
  document,
  file
) {
  if (!file) {
    throw new Error("No file selected.");
  }

  /*
  ----------------------------------------
  File Type Validation
  ----------------------------------------
  */

  const extension = file.name
    .split(".")
    .pop()
    ?.toLowerCase();

  const allowedExtensions =
    document.acceptedTypes
      .split(",")
      .map((type) =>
        type.trim().replace(".", "").toLowerCase()
      );

  if (
    !extension ||
    !allowedExtensions.includes(extension)
  ) {
    throw new Error(
      `Unsupported file type. Allowed formats: ${document.acceptedTypes}`
    );
  }

  /*
  ----------------------------------------
  File Size Validation
  ----------------------------------------
  */

  if (file.size > document.maxSize) {
    const maxSizeMB = (
      document.maxSize /
      1024 /
      1024
    ).toFixed(0);

    throw new Error(
      `File exceeds the maximum size of ${maxSizeMB} MB.`
    );
  }

  return true;
}