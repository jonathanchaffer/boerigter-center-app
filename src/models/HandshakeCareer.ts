import { Mappable } from "models";

export interface HandshakeCareer extends Mappable {
  type: "career";
  job_name: string;
  employer_name: string;
  employment_type_name: string;
  location_points: string;
  employer_logo_url: string;
}
