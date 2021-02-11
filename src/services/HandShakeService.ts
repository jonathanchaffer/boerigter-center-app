import { HandshakeCareer } from "models";
import { results } from "../../HandshakeResponse.json"

export async function getHandshakeCareers(): Promise<HandshakeCareer[]>{
    return results.map((user: any) => {
        return { ...user, type: "career" } as HandshakeCareer;
      });
    }