import { db } from '@/firebase/config'
import { getDocs, collection, query, where, getDoc, doc, orderBy, QueryConstraint, Query } from 'firebase/firestore'
import { Message } from '@/interface/message'


export async function fetchAllMessage(ticketId:string): Promise<Message[]>{
  const messages: Message[] = []
  const docRef = doc(db, "tickets", ticketId)
  const collectionRef = collection(docRef, "messages")
  const querySnapshot = await getDocs(collectionRef)
  querySnapshot.forEach((doc) => {
    messages.push({ id: doc.id, ...(doc.data() as Omit<Message, 'id'>) })
  })
  return messages
}