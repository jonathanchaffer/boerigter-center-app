import { Alum } from "models";
import * as placeholderAlumni from "placeholders/placeholder-alumni.json";

export function getPeopleGroveAlumni(): Alum[] {
  return placeholderAlumni.users as Alum[];
}
