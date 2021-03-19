import { Mappable } from "models";

export interface HandshakeCareer extends Mappable {
  type: "career";
  job_city: string;
  job_name: string;
  employer_name: string;
  employment_type_name: string;
  employer_logo_url: string;
}
