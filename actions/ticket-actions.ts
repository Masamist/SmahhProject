import { db } from '@/firebase/config'
import { getDocs, collection, query, where, getDoc, doc } from 'firebase/firestore'
import { Ticket } from '@/interface/ticket'

export async function fetchAllTicketData(): Promise<Ticket[]>{
  const tickets: Ticket[] = []
  const querySnapshot = await getDocs(collection(db, "tickets"))
  querySnapshot.forEach((doc) => {
    tickets.push({ id: doc.id, ...(doc.data() as Omit<Ticket, 'id'>) })
  })
  console.log('I should not be here')
  return tickets
}

export async function fetchTicketsDataByUser(id: string|undefined){
  const tickets: Ticket[] = []
  const q = query(collection(db, "tickets"), where("assignedAgent", "==", id))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    tickets.push({ id: doc.id, ...(doc.data() as Omit<Ticket, 'id'>) })
  })
  return tickets
}

export async function fetchTicketsDataByTab(tab: string, id: string|undefined): Promise<Ticket[]>{
  let q
  let querySnapshot
  switch(tab) { 
    case 'yours': { 
      q = query(collection(db, "tickets"), where("assignedAgent", "==", id))
      break
    }
    case 'unassigned': { 
      q = query(collection(db, "tickets"), where("assigned", "==", false))
      break
    }
    case 'all': {
      q = collection(db, "tickets")
      break
   } 
    default: { 
      console.log('No ticket exists!')
      break
    } 
 }
 const tickets: Ticket[] = []
 if(q){
  querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    tickets.push({ id: doc.id, ...(doc.data() as Omit<Ticket, 'id'>) })
  })
 }
  return tickets
}

export async function fetchSingleTicketData(id: string){
      const docSnap = await getDoc(doc(db, "tickets", id))
      if (docSnap.exists()) {
        const ticketData = { id: docSnap.id, ...docSnap.data() } as Ticket
        return ticketData
      } else {
        console.log(`Document with ID ${id} does not exist`)
      }
  }