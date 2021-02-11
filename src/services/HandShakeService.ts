import { HandshakeCareer } from "models";
import { results } from "../assets/HandshakeResponse.json"

export async function getHandshakeCareers(): Promise<HandshakeCareer[]>{

    const careers = [];

    for(let i = 0; results.length; i += 1){
        for(let j = 0; results[i].job.location_points.length; j += i){
          const job = {
            employer_logo_url: results[i].employer_logo,
            employer_name: results[i].employer_name,
            employment_type_name: results[i].employment_type_name,
            id: results[i].id,
            job_name: results[i].job_name,
            latitude: Number(results[i].job.location_points[j].split(",")[0]),
            longitude: Number(results[i].job.location_points[j].split(",")[1]),
            type: "career",
          } as HandshakeCareer;

         careers.push(job);
        }
    }
    return careers;
    }