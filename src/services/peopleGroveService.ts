import { PeopleGroveAlum } from "models";
import * as placeholderAlumni from "placeholders/placeholder-alumni.json";

export function getPeopleGroveAlumni(): PeopleGroveAlum[] {
  return placeholderAlumni.users.map(user => {
    return { ...user, type: "alum" } as PeopleGroveAlum;
  });
}
