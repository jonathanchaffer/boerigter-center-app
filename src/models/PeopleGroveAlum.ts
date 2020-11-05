import { Mappable } from "models";

export interface PeopleGroveAlum extends Mappable {
  type: "alum";
  firstName: string;
  lastName: string;
  location: string;
  photoUrl: string;
  majors: string[];
}
