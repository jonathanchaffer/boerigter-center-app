import "firebase/storage";
import { CuratedAlum } from "models";
import { db } from "services";
import { dbCollections } from "utilities";

/**
 * Retrieves all curated alumni from the database.
 * @returns A Promise containing the retrieved documents as CuratedAlum objects.
 */
export async function getAlumniStories(): Promise<CuratedAlum[]> {
  const snapshot = await db.collection(dbCollections.alumniStories).get();
  return snapshot.docs.map(doc => {
    return { ...doc.data(), id: doc.id } as CuratedAlum;
  });
}

/**
 * Retrieves a specific alum from the database as a CuratedAlum.
 * @param id The ID of the alum to retrieve.
 * @returns A Promise containing a specific alum, or undefined if the ID doesn't exist.
 */
export async function getAlumStory(id: string): Promise<CuratedAlum | undefined> {
  const snapshot = await db.doc(`${dbCollections.alumniStories}/${id}`).get();
  return snapshot.data() ? ({ ...snapshot.data(), id: snapshot.id } as CuratedAlum) : undefined;
}

/**
 * Updates an existing alum in the database. Some or all fields may
 * be updated, depending on what's included in the newAlum param.
 * @param id The ID of the alum to update.
 * @param newAlum The updated version of the alum.
 * @returns A Promise representing the status of the update.
 */
export async function updateAlumStory(id: string, newAlum: CuratedAlum): Promise<void> {
  return db.doc(`${dbCollections.alumniStories}/${id}`).update({ ...newAlum });
}

/**
 * Adds a new alum to the database and returns the id of the created document.
 * @param newAlum The alum to add.
 * @returns A Promise containing the ID of the added alum.
 */
export async function addAlumStory(newAlum: CuratedAlum): Promise<string> {
  const snapshot = await db.collection(dbCollections.alumniStories).add(newAlum);
  return snapshot.id;
}

/**
 * Deletes an alum from the database.
 * @param id The ID of the alum to delete.
 * @returns A Promise representing the status of the delete.
 */
export async function deleteAlumStory(id: string): Promise<void> {
  return db.doc(`${dbCollections.alumniStories}/${id}`).delete();
}
