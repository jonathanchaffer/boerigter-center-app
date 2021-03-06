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
  media?: string[];
  website?: string;
  linkedIn?: string;
  email?: string;
  phone?: string;
}
