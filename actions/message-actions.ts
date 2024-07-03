import { db } from '@/firebase/config'
import { getDocs, collection, query, where, getDoc, doc, orderBy, QueryConstraint, Query, deleteDoc, updateDoc, addDoc, limit, Timestamp } from 'firebase/firestore'
import { Message } from '@/interface/message'
import { Ticket } from '@/interface/ticket'

export async function fetchAllGroupMessage(ticketId:string): Promise<Message[]>{
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
  ticketId: string
  messageId: string
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

export interface MessageWithTicketInfo {
  id: string
  senderId: string,
  senderName: string
  comment: string,
  unreadMessage?: boolean
  createdAt: Timestamp,
  ticketId?: string,
  title?: string
  company?: string
  category?: string
  severity?: string
}

export async function getAllMessagesByUser(userId: string, isClient: boolean): Promise<MessageWithTicketInfo[]> {
  try {
    const tickets: Ticket[] = []
    let q:Query

    if(isClient){
      q = query(collection(db, "tickets"), where("client", "==", userId))
      
    } else {
       q = query(collection(db, "tickets"), where("assignedAgent", "==", userId));
    }

    const ticketsSnapshot = await getDocs(q)
    ticketsSnapshot.forEach((doc) => {
      tickets.push({ id: doc.id, ...(doc.data() as Omit<Ticket, 'id'>) })
    })
    
    const messages: Message[] = []
    for (const ticketDoc of ticketsSnapshot.docs) {
      //Bug here at orderby and limit
      const messagesRef = query(collection(db, `tickets/${ticketDoc.id}/messages`),orderBy('createdAt', 'desc'), limit(1));
      const querySnapshot = await getDocs(messagesRef)
      
    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ticketId: ticketDoc.id, ...(doc.data() as Omit<Message, 'id'>) })
    })
    }

    const messageWithTicketInfo: MessageWithTicketInfo[] = []
    messages.forEach((message) => {
      const ticketSelected = tickets.find((ticket) => (ticket.id === message.ticketId))
      messageWithTicketInfo.push({
        id: message.id,
        senderId: message.senderId,
        senderName: message.senderName,
        comment: message.comment,
        unreadMessage: message.unreadMessage,
        createdAt: message.createdAt,
        ticketId: message.ticketId?message.ticketId: undefined,
        title: ticketSelected?.title,
        company: ticketSelected?.company,
        category: ticketSelected?.category,
        severity: ticketSelected?.severity
      })
    })
    return messageWithTicketInfo

  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error; // Re-throw the error to ensure the function caller knows about it
  }
}