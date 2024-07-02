import { Timestamp } from "firebase/firestore"

export interface Message {
  id: string
  senderId: string,
  senderName: string
  comment: string,
  unreadMessage?: boolean
  read?: [],
  createdAt: Timestamp,
  updatedAt?: Timestamp,
  ticketId?: string | undefined,
}
