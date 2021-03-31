import firebase from "firebase";
import { storageRef } from "index";
import { CuratedAlum } from "models";

export function uploadProfilePhoto(file: File, alum: CuratedAlum): firebase.storage.UploadTask {
  return storageRef.child("profilePhotos").child(alum.id).put(file);
}
