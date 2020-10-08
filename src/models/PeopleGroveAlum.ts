import { Mappable } from "./Mappable";

export interface PeopleGroveAlum extends Mappable {
  firstName: string;
  lastName: string;
  location: string;
  photoUrl: string;
  majors: string[];
}
