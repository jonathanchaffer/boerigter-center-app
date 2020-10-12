import { Mappable } from "./Mappable";

export interface Alum extends Mappable {
  type: "alum";
  firstName: string;
  lastName: string;
  location: string;
  photoUrl: string;
  majors: string[];
}
