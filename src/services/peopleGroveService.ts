import axios from "axios";
import { PeopleGroveAlum } from "models";

const axiosInstance = axios.create({
  baseURL: "https://boerigter-center-app.herokuapp.com/https://connection.hope.edu/api/",
  headers: {
    "Content-Type": "application/json",
    hubidentifier: "hopecollege",
  },
});

export function getPGAuth(): any | undefined {
  const item = localStorage.getItem("pg_user");
  if (item === null) return undefined;
  return JSON.parse(item);
}

export function isLoggedInToPG(): boolean {
  return getPGAuth()?.found || false;
}

export function loginToPG(email: string, password: string): Promise<void> {
  const data = JSON.stringify({
    email,
    method: 1,
    password,
  });

  return axiosInstance.post("auth", data).then(response => {
    if (response.data.found) localStorage.setItem("pg_user", JSON.stringify(response.data));
    else throw new Error("Invalid credentials");
  });
}

export async function getAllPeopleGroveAlumni(): Promise<PeopleGroveAlum[]> {
  if (getPGAuth()) {
    const accessToken = getPGAuth()?.token;

    const data = {
      filters: { condition: "UNION ALL", rules: [] },
      includeUserId: [],
      matchIndex: { index: 0, pageId: "person" },
      page: 0,
      tabType: "active",
      userBuckets: false,
      viewType: "map",
    };

    const options = {
      headers: {
        authorization: `bearer ${accessToken}`,
      },
    };

    return axiosInstance.post("get-network-hub-users", data, options).then(response =>
      response.data.users.map((user: any) => {
        return { ...user, type: "alum" } as PeopleGroveAlum;
      }),
    );
  }
  return [];
}

export async function getPeopleGroveAlum(username: string): Promise<PeopleGroveAlum> {
  if (getPGAuth()) {
    const accessToken = getPGAuth()?.token;

    const options = {
      headers: {
        authorization: `bearer ${accessToken}`,
      },
    };

    return (await axiosInstance.get(`users/${username}?hubIdentifier=hopecollege`, options)).data;
  }

  return Promise.reject();
}
