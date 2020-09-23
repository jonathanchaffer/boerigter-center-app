import { Mappable } from "./Mappable";

export interface Alum extends Mappable {
  firstName: string;
  lastName: string;
  location: string;
  photoUrl: string;
  majors: string[];
}
