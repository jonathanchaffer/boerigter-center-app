import { PeopleGroveAlum } from "models";
import * as placeholderAlumni from "placeholders/placeholder-alumni.json";

export function getPeopleGroveAlumni(): PeopleGroveAlum[] {
  return placeholderAlumni.users.map(user => {
    return { ...user, type: "alum" } as PeopleGroveAlum;
  });
}

// TODO: temporary
export function isLoggedInToPG(): boolean {
  return JSON.parse(localStorage.getItem("isLoggedInToPG") || JSON.stringify(false)) || false;
}

// TODO: temporary
export function loginToPG(): void {
  localStorage.setItem("isLoggedInToPG", JSON.stringify(true));
}
