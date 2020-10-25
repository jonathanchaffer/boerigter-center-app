import axios, { AxiosRequestConfig } from "axios";
import { PeopleGroveAlum } from "models";
import * as placeholderAlumni from "placeholders/placeholder-alumni.json";

const axiosInstance = axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com/https://connection.hope.edu/api/",
});

export async function getPeopleGroveAlumni(): Promise<PeopleGroveAlum[]> {
  return placeholderAlumni.users.map(user => {
    return { ...user, type: "alum" } as PeopleGroveAlum;
  });
}

// TODO: temporary
export function isLoggedInToPG(): boolean {
  const item = localStorage.getItem("pg_user");
  if (item === null) return false;
  const pgUser = JSON.parse(item);
  return pgUser.found;
}

// TODO: temporary
export function loginToPG(email: string, password: string): Promise<void> {
  const data = JSON.stringify({
    email,
    method: 1,
    password,
  });

  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axiosInstance.post("auth", data, config).then(response => {
    if (response.data.found) localStorage.setItem("pg_user", JSON.stringify(response.data));
    else throw new Error("Invalid credentials");
  });
}
