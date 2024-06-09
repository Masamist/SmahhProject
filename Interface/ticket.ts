import { Timestamp } from "firebase/firestore"

export interface Ticket {
  id: string
  title: string
  client: string
  category: string
  severity: string
  status: string
  assignedAgent: string
  assigned?: boolean
  description: string 
  createdAt?: string | Timestamp
  updatedAt?: string | Timestamp
  closedAt?: string | Timestamp
  messages?: string
}

export enum Status {
  OPEN,
  CLOSED
}

export enum Severity {
  LOW,
  MEDIUM,
  HIGH
}