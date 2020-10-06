import { db } from "index";
import { CuratedAlum } from "models";

export async function getAlumniStories(): Promise<CuratedAlum[]> {
  const snapshot = await db.collection("alumniStories").get();
  return snapshot.docs.map(doc => doc.data() as CuratedAlum);
}
