import axios from "axios";
import { PeopleGroveAlum } from "models";

const axiosInstance = axios.create({
  baseURL: "https://boerigter-center-app.herokuapp.com/https://connection.hope.edu/api/",
  headers: {
    "Content-Type": "application/json",
    hubidentifier: "hopecollege",
  },
});

/**
 * @returns The currently stored PeopleGrove authentication object, or undefined if there is none.
 */
export function getPGAuth(): any | undefined {
  const item = localStorage.getItem("pg_user");
  if (item === null) return undefined;
  return JSON.parse(item);
}

/**
 * @returns true if the user is logged in to PeopleGrove, false otherwise.
 */
export function isLoggedInToPG(): boolean {
  return getPGAuth()?.found || false;
}

/**
 * Tries to log in a user to PeopleGrove.
 * @param email The email address to log in with.
 * @param password The password to log in with.
 * @returns A Promise representing the login status.
 */
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

/**
 * Logs the user out of PeopleGrove.
 */
export function logoutOfPG(): void {
  localStorage.removeItem("pg_user");
}

/**
 * Retrieves a list of all alumni from PeopleGrove, using the map view type.
 * @returns A Promise containing the list of all PeopleGrove alumni.
 */
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

/**
 * Retrieves more detailed data for one specific alum on PeopleGrove.
 * @param username The username of a specific PeopleGrove alum.
 * @returns A more detailed blob of data for a specific alum on PeopleGrove.
 */
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
