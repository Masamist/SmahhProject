import { db } from '@/firebase/config'
import { getDocs, collection, query, where, getDoc, doc, orderBy, QueryConstraint, Query, deleteDoc, updateDoc, addDoc, limit } from 'firebase/firestore'
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

export async function getAllMessagesByAgent(userId: string): Promise<Message[]> {
  try {
    const q = query(collection(db, "tickets"), where("assignedAgent", "==", userId));
    const ticketsSnapshot = await getDocs(q);
    
    const messages: Message[] = []
    
    for (const ticketDoc of ticketsSnapshot.docs) {
      //Bug here at orderby and limit
      const messagesRef = query(collection(db, `tickets/${ticketDoc.id}/messages`),orderBy('createdAt', 'desc'), limit(1));
      const querySnapshot = await getDocs(messagesRef)
      
    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ticketId: ticketDoc.id, ...(doc.data() as Omit<Message, 'id'>) })
    })
    }
    return messages

  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error; // Re-throw the error to ensure the function caller knows about it
  }
}

// export async function fetchAllMessages(userId: string, isClient: boolean){
//   // const ticketsRef = db.collection('tickets');
//   // const ticketsSnapshot = await ticketsRef.get();
//   const tickets: Ticket[] = []
//   const messages: Message[] = []
//   // let q :Query
//   // if(!isClient){
//   //   q = query(collection(db, "tickets"), where("assignedAgent", "==", userId))
//   // } else {
//   //   q = query(collection(db, "tickets"), where("client", "==", userId))
//   // }
//   async function getAllMessagesByAgent(userId) {
//     try {
//       const q = query(collection(db, "tickets"), where("assignedAgent", "==", userId));
//       const ticketsSnapshot = await getDocs(q);
      
//       const allMessages = [];
      
//       for (const ticketDoc of ticketsSnapshot.docs) {
//         const messagesRef = collection(db, `tickets/${ticketDoc.id}/messages`);
//         const messagesSnapshot = await getDocs(messagesRef);
        
//         messagesSnapshot.forEach(messageDoc => {
//           allMessages.push({ 
//             ticketId: ticketDoc.id, 
//             messageId: messageDoc.id, 
//             ...messageDoc.data() 
//           });
//         });
//       }
      
//       console.log(allMessages);
//       return allMessages;
//     } catch (error) {
//       console.error("Error getting documents: ", error);
//     }
    
//   }
// }