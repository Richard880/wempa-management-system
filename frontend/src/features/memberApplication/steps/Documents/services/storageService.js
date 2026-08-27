import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../../../../firebase";

export function createStoragePath({ uid, documentId, fileName }) {
  return `members/${uid}/documents/${documentId}/${fileName}`;
}

export function uploadFile({ path, file, metadata, onProgress, onComplete, onError }) {
  const storageRef = ref(storage, path);
  
  // Initialize the resumable task
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  // Monitor state changes
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      onProgress?.(progress);
      
      // Let your UI know if Firebase is actively trying to reconnect
      if (snapshot.state === 'paused') {
        console.warn("Upload paused or network interrupted. Retrying...");
      }
    },
    (error) => {
      // Handle known Firebase Storage error codes gracefully
      switch (error.code) {
        case 'storage/unauthorized':
          console.error("User doesn't have permission to upload to this path.");
          break;
        case 'storage/canceled':
          console.log("Upload was intentionally canceled by the user.");
          break;
        case 'storage/unknown':
          console.error("Unknown error occurred:", error.serverResponse);
          break;
        default:
          console.error("Upload failed:", error.message);
      }
      onError?.(error);
    },
    async () => {
      // Success callback
      try {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        onComplete?.({
          downloadURL,
          fullPath: uploadTask.snapshot.ref.fullPath,
        });
      } catch (err) {
        onError?.(err);
      }
    }
  );

  // CRITICAL: Return the control task back to the component
  return uploadTask;
}

export async function deleteFile(path) {
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
}
