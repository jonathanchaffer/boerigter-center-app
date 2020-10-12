import { Alum } from "models";
import * as placeholderAlumni from "placeholders/placeholder-alumni.json";

export function parseAlumni(): Alum[] {
  return placeholderAlumni.users.map(user => {
    return { ...user, type: "alum" } as Alum;
  });
}
