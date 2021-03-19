import axios from "axios";
import { HandshakeCareer } from "models";

function convertToHandshakeCareer(data: any): HandshakeCareer | undefined {
  if (
    data.job.employer.location.latitude !== null &&
    data.job.employer.location.longitude !== null
  ) {
    return {
      employer_logo_url: "",
      employer_name: data.job.employer.name,
      employment_type_name: data.job.duration,
      id: data.id,
      job_city: data.job.employer.location.city,
      job_name: data.job.title,
      latitude: data.job.employer.location.latitude,
      longitude: data.job.employer.location.longitude,
      type: "career",
    } as HandshakeCareer;
  }
  return undefined;
}

const axiosInstance = axios.create({
  baseURL: "https://boerigter-center-app.herokuapp.com/https://app.joinhandshake.com/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchHandshakeCareers(page: number): Promise<HandshakeCareer[]> {
  const options = {
    headers: {
      authorization: `Token token="${process.env.REACT_APP_HANDSHAKE_API_KEY}"`,
    },
  };

  const url = `postings?page=${page}&per_page=50&sort_direction=desc`;
  return (await axiosInstance.get(url, options)).data.postings
    .map((posting: any) => convertToHandshakeCareer(posting))
    .filter((career: HandshakeCareer | undefined) => career !== undefined);
}
