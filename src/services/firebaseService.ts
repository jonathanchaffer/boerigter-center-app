import { db } from "index";
import { CuratedAlum } from "models";

export async function getAlumniStories(): Promise<CuratedAlum[]> {
  const snapshot = await db.collection("alumniStories").get();
  return snapshot.docs.map(doc => {
    return { ...doc.data(), uid: doc.id } as CuratedAlum;
  });
}

export async function getAlumStory(uid: string): Promise<CuratedAlum> {
  const snapshot = await db.doc(`alumniStories/${uid}`).get();
  return snapshot.data() as CuratedAlum;
}
