import firebase from "firebase";
import { storageRef } from "index";
import { CuratedAlum } from "models";

/**
 * Uploads a profile photo for an alum.
 * @param file The file to be uploaded.
 * @param alum The alum to which the profile photo is assigned.
 * @returns An UploadTask that allows you to monitor and manage the upload.
 */
export function uploadProfilePhoto(file: File, alum: CuratedAlum): firebase.storage.UploadTask {
  return storageRef
    .child("profilePhotos")
    .child(alum.id || file.name)
    .put(file);
}
