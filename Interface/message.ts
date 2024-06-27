import { Timestamp } from "firebase/firestore"

export interface Message {
  id: string
  senderId: string,
  senderName: string
  comment: string,
  read?: [],
  createdAt?: Timestamp,
  updatedAt?: Timestamp,
}
