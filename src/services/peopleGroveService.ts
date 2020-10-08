import { PeopleGroveAlum } from "models";
import * as placeholderAlumni from "placeholders/placeholder-alumni.json";

export function getPeopleGroveAlumni(): PeopleGroveAlum[] {
  return placeholderAlumni.users as PeopleGroveAlum[];
}
