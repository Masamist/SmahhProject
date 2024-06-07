import { Timestamp } from "firebase/firestore"

export interface User {
  id: string
  name: string
  surname: string,
  password: string | null,
  email: string,
  mobile: string,
  role: string,
  company: string,
  jobTitle: string,
  createdAt: Timestamp,
  updatedAt: Timestamp,
}

export enum Role {
  ADMIN,
  AGENT,
  CLIENT
}
