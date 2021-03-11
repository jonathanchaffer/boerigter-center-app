import axios from "axios";
import { HandshakeCareer } from "models";
// import { results } from "placeholders/HandshakeResponse.json";

const axiosInstance = axios.create({
  baseURL: "https://boerigter-center-app.herokuapp.com/https://app.joinhandshake.com/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

export function removeDuplicateCareers(careers: HandshakeCareer[], nextCareer: HandshakeCareer): boolean {
  for(let i = 0; i < careers.length; i++) {
    if(nextCareer.latitude === careers[i].latitude && nextCareer.longitude === careers[i].longitude){
      if(nextCareer.job_name === careers[i].job_name && nextCareer.job_name === careers[i].job_name){
        return true;
      }
    } 
  }
  return false;
}

export async function fetchHandshakeCareers(): Promise<any[]> {
  const options = {
    headers: {
      authorization: `Token token="${process.env.REACT_APP_HANDSHAKE_API_KEY}"`,
    },
  };
  let results: any[] = [];
  for(let i = 0; i < 20; i++){
  const url = `postings?page=${i}&per_page=50&sort_direction=desc`;
  // eslint-disable-next-line no-await-in-loop
  results = [...results, ...(await axiosInstance.get(url,options)).data.postings];
  }
  return results;
}

export async function getHandshakeCareers(): Promise<HandshakeCareer[]> {
  const careers = [];

  const results = await fetchHandshakeCareers();
  console.log(results);
  for (let i = 0; i < results.length; i++) {
    const job = {
      employer_logo_url: "", // results[i].employer_logo,
      employer_name: results[i].job.employer.name,
      employment_type_name: results[i].job.duration,
      id: results[i].id,
      job_name: results[i].job.title,
      latitude: results[i].job.employer.location.latitude,
      longitude: results[i].job.employer.location.longitude,
      type: "career",
    } as HandshakeCareer;
    /* if(!removeDuplicateCareers(careers,job)){
      careers.push(job);
    } */
    careers.push(job);
  }
  return careers;
}
