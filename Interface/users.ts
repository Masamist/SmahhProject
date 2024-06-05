import { Timestamp } from "firebase/firestore"

export interface User {
  id: string
  name: string
  surname: string,
  email: string,
  mobile: string,
  role: Role,
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
