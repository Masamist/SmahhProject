export interface Ticket {
  id: string
  title: string
  client: string,
  category: string,
  severity: string,
  status: string,
  owner: string,
  description: string, 
}

export enum Status {
  OPEN,
  CLOSED
}

enum Priority {
  LOW,
  MEDIUM,
  HIGH
}