import { db } from '@/firebase/config'
import { getDocs, collection, query, where, getDoc, doc, orderBy, QueryConstraint, Query, deleteDoc, updateDoc, addDoc } from 'firebase/firestore'
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

interface DeleteMessageDataParams {
  ticketId: string;
  messageId: string;
}

export async function deleteSingleMessage({ticketId, messageId}: DeleteMessageDataParams): Promise<void>{
  const docRef = doc(db, "tickets", ticketId, "messages", messageId)
        await deleteDoc(docRef)
  
}

interface ReadMessageDataParams {
  ticketId: string
  message: Message
}

export async function readMessage({ticketId, message}: ReadMessageDataParams): Promise<void>{
    const docRef = doc(db, "tickets", ticketId, "messages", message.id)   
    try {
      const docSnapshot = await getDoc(docRef);
      if(docSnapshot.exists()){
        await updateDoc(docRef, { unreadMessage: false })
      }else{
        console.log("Document does not exist")
      }
    } catch(error) {
      console.error("Error updating document: ", error);
      throw error;
    }  
}