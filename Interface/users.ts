import { Timestamp } from "firebase/firestore"

export interface User {
  id: string
  name: string
  surname: string,
  contact: string,
  role: string,
  company: string,
  jobTitle: string,
  createdAt: Timestamp,
  updatedAt: Timestamp,
}

