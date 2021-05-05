export interface CuratedAlum {
  id: string;
  firstName: string;
  lastName: string;
  location: string;
  majors: string[];
  minors?: string[];
  company: string;
  profilePhoto?: string;
  bio: string;
  quotes?: string[];
  gradYear: number;
  email?: string;
  phone?: string;
  display: boolean;
}

export const emptyAlum: CuratedAlum = {
  bio: "",
  company: "",
  display: true,
  email: "",
  firstName: "",
  gradYear: 0,
  id: "",
  lastName: "",
  location: "",
  majors: [],
  minors: [],
  phone: "",
  profilePhoto: "",
  quotes: [],
};
