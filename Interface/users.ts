import { Timestamp } from "firebase/firestore"

export interface User {
  id: string
  name: string
  surname: string,
  password: string | null,
  email: string,
  mobile: string,
  role: string,
  company: string | null,
  jobTitle: string | null,
  createdAt: Timestamp,
  updatedAt: Timestamp,
}

export enum Role {
  ADMIN,
  AGENT,
  CLIENT
}
