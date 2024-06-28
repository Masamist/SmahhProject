import { db } from '@/firebase/config'
import { getDocs, collection, query, where, getDoc, doc, orderBy, QueryConstraint, Query } from 'firebase/firestore'
import { Message } from '@/interface/message'


export async function fetchAllMessage(ticketId:string): Promise<Message[]>{
  const messages: Message[] = []
  let q :Query
  q = query(collection(db, "tickets", ticketId, "messages"), orderBy('createdAt', 'desc'))

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    messages.push({ id: doc.id, ...(doc.data() as Omit<Message, 'id'>) })
  })
  return messages
}