import { db } from "index";
import { CuratedAlum } from "models";

export async function getAlumniStories(): Promise<CuratedAlum[]> {
  const snapshot = await db.collection("alumniStories").get();
  return snapshot.docs.map(doc => {
    return { ...doc.data(), id: doc.id } as CuratedAlum;
  });
}

export async function getAlumStory(id: string): Promise<CuratedAlum> {
  const snapshot = await db.doc(`alumniStories/${id}`).get();
  return { ...snapshot.data(), id: snapshot.id } as CuratedAlum;
}
