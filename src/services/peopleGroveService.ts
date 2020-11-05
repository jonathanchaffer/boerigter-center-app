import axios from "axios";
import { PeopleGroveAlum } from "models";
import * as placeholderAlumni from "placeholders/placeholder-alumni.json";

const axiosInstance = axios.create({
  baseURL: "https://boerigter-center-app.herokuapp.com/https://connection.hope.edu/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export function getPGUser(): any | undefined {
  const item = localStorage.getItem("pg_user");
  if (item === null) return undefined;
  return JSON.parse(item);
}

export function isLoggedInToPG(): boolean {
  return getPGUser()?.found || false;
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

// TODO: get actual data from peoplegrove
export async function getPeopleGroveAlumni(): Promise<PeopleGroveAlum[]> {
  // const accessToken = getPGUser()?.token;

  // const data = {
  //   filters: { condition: "UNION ALL", rules: [] },
  //   includeUserId: [],
  //   matchIndex: { index: 0, pageId: "person" },
  //   page: 0,
  //   tabType: "active",
  //   userBuckets: false,
  //   viewType: "map",
  // };

  // const options = {
  //   headers: {
  //     authorization: `bearer ${accessToken}`,
  //   },
  // };

  // return axiosInstance.post("get-network-hub-users", data, options).then(response =>
  //   response.data.users.map((user: any) => {
  //     return { ...user, type: "alum" } as PeopleGroveAlum;
  //   }),
  // );
  return placeholderAlumni.users.map(user => {
    return { ...user, type: "alum" } as PeopleGroveAlum;
  });
}
