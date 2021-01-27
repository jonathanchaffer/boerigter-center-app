const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.createUser = functions.auth.user().onCreate(user => {
  return db.doc(`users/${user.uid}`).set({ isAdmin: false });
});

exports.deleteUser = functions.auth.user().onDelete(user => {
  return db.doc(`users/${user.uid}`).delete();
});
