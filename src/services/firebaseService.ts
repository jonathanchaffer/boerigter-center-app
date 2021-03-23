import { db } from "index";
import { CuratedAlum } from "models";
import { dbCollections } from "utilities";

/** Retrieves an array of alumni from the database as a CuratedAlum[]. */
export async function getAlumniStories(): Promise<CuratedAlum[]> {
  const snapshot = await db.collection(dbCollections.alumniStories).get();
  return snapshot.docs.map(doc => {
    return { ...doc.data(), id: doc.id } as CuratedAlum;
  });
}

/** Retrieves a specific alum from the database as a CuratedAlum. */
export async function getAlumStory(id: string): Promise<CuratedAlum> {
  const snapshot = await db.doc(`${dbCollections.alumniStories}/${id}`).get();
  return { ...snapshot.data(), id: snapshot.id } as CuratedAlum;
}

/** Updates an existing alum in the database. Some or all fields may
 * be updated, depending on what's included in the newAlum param. */
export async function updateAlumStory(id: string, newAlum: CuratedAlum): Promise<void> {
  return db.doc(`${dbCollections.alumniStories}/${id}`).update({ newAlum });
}

/** Adds a new alum to the database and returns the id of the created document. */
export async function addAlumStory(newAlum: CuratedAlum): Promise<string> {
  const snapshot = await db.collection(dbCollections.alumniStories).add(newAlum);
  return snapshot.id;
}

/** Deletes an alum from the database. */
export async function deleteAlumStory(id: string): Promise<void> {
  return db.doc(`${dbCollections.alumniStories}/${id}`).delete();
}
