import { HandshakeCareer } from "models";
import { results } from "placeholders/HandshakeResponse.json";

export async function getHandshakeCareers(): Promise<HandshakeCareer[]> {
  const careers = [];

  for (let i = 0; i < results.length; i++) {
    for (let j = 0; j < results[i].job.location_points.length; j++) {
      const points = results[i].job.location_points[j].split(",");
      const job = {
        employer_logo_url: results[i].employer_logo,
        employer_name: results[i].employer_name,
        employment_type_name: results[i].employment_type_name,
        id: results[i].id,
        job_name: results[i].job_name,
        latitude: Number(points[0]),
        longitude: Number(points[1]),
        type: "career",
      } as HandshakeCareer;
      careers.push(job);
    }
  }
  return careers;
}
