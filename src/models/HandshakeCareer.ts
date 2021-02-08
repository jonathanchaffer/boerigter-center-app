import { Mappable } from "models";

export interface HandshakeCareer extends Mappable {
  type: "career";
  jobTitle: string;
  company: string;
  ftptJob: string;
  location: string;
  photoUrl: string;
}
