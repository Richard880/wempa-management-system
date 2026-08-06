export default function createPreview(file) {
  if (!file) {
    throw new Error("No file provided.");
  }

  const isImage = file.type.startsWith("image/");

  return {
    file,

    fileName: file.name,

    fileSize: file.size,

    fileType: file.type,

    isImage,

    previewUrl: URL.createObjectURL(file),
  };
}