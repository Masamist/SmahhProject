import { db } from '@/firebase/config'
import { getDocs, collection } from 'firebase/firestore'
import { Ticket } from '@/interface/ticket'

export async function fetchAllTicketData(): Promise<Ticket[]>{
  const querySnapshot = await getDocs(collection(db, "tickets"))

  const tickets: Ticket[] = []
  querySnapshot.forEach((doc) => {
    tickets.push({ id: doc.id, ...(doc.data() as Omit<Ticket, 'id'>) })
  })
  return tickets
}
