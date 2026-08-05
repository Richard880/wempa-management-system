import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { storage } from "../../../../../firebase";

/*
----------------------------------------
Create Storage Path
----------------------------------------
*/

export function createStoragePath({
  uid,
  documentId,
  fileName,
}) {
  return `members/${uid}/documents/${documentId}/${fileName}`;
}

/*
----------------------------------------
Upload File
----------------------------------------
*/

export function uploadFile({
  path,
  file,
  metadata,
  onProgress,
}) {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path);

    const uploadTask =
      uploadBytesResumable(
        storageRef,
        file,
        metadata
      );

    uploadTask.on(
      "state_changed",

      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred /
            snapshot.totalBytes) *
            100
        );

        onProgress?.(progress);
      },

      reject,

      async () => {
        const downloadURL =
          await getDownloadURL(
            uploadTask.snapshot.ref
          );

        resolve({
          downloadURL,

          fullPath:
            uploadTask.snapshot.ref.fullPath,
        });
      }
    );
  });
}

/*
----------------------------------------
Delete File
----------------------------------------
*/

export async function deleteFile(path) {
  const storageRef = ref(storage, path);

  await deleteObject(storageRef);
}