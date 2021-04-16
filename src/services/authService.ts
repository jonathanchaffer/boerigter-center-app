import * as firebase from "firebase";
import { auth } from "index";

/**
 * Logs in the user as an administrator.
 * @param email The email address to log in with.
 * @param password The password to log in with.
 * @returns A Promise containing the generated UserCredential.
 */
export function loginAsAdmin(
  email: string,
  password: string,
): Promise<firebase.auth.UserCredential> {
  return auth.signInWithEmailAndPassword(email, password);
}

/**
 * Logs out the user as administrator.
 * @returns A Promise representing the status of the logout.
 */
export function logout(): Promise<void> {
  return auth.signOut();
}

/**
 * Sends a password reset email to a user.
 * @param email The email address to send a password reset email to.
 * @returns A Promise representing the status of the operation.
 */
export function sendPasswordResetEmail(email: string): Promise<void> {
  return auth.sendPasswordResetEmail(email);
}
