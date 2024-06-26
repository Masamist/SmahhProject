import { db } from '@/firebase/config'
import { getDocs, collection, query, where, getDoc, doc, orderBy, QueryConstraint, Query } from 'firebase/firestore'
import { Ticket } from '@/interface/ticket'

export async function fetchAllTicketData(): Promise<Ticket[]>{
  const tickets: Ticket[] = []
  const querySnapshot = await getDocs(collection(db, "tickets"))
  querySnapshot.forEach((doc) => {
    tickets.push({ id: doc.id, ...(doc.data() as Omit<Ticket, 'id'>) })
  })
  return tickets
}

export async function fetchTicketsDataByUser(userId: string, isClient: boolean){
  const tickets: Ticket[] = []
  let q :Query
  if(!isClient){
    q = query(collection(db, "tickets"), where("assignedAgent", "==", userId))
  } else {
    q = query(collection(db, "tickets"), where("client", "==", userId))
  }
  
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    tickets.push({ id: doc.id, ...(doc.data() as Omit<Ticket, 'id'>) })
  })
  return tickets
}

export async function fetchTicketsDataByTab(
  tab?: string | undefined,
  sortedBy?: string | undefined,
  userId?: string,
  isClient?: boolean,
): Promise<Ticket[]> {

  const getSortOrder = (): QueryConstraint[] => {
    switch (sortedBy) {
      case 'asc':
        return [orderBy('title', 'asc')]
      case 'desc':
        return [orderBy('title', 'desc')]
      case 'latest':
        return [orderBy('createdAt', 'desc')]
      case 'oldest':
        return [orderBy('createdAt', 'asc')]
      // case 'cybersecurity':
      //   return [where('category', '==', 'CYBERSECURITY')]
      // case 'network':
      //   return [where('category', '==', 'NETWORK')]
      // case 'data':
      //   return [where('category', '==', 'DATA')]
      // case 'IT':
      //   return [where('category', '==', 'IT')]
      default:
        return [orderBy('createdAt', 'desc')] // No sorting
    }
  };

  const sortOrder = getSortOrder()
  let queryConstraints: QueryConstraint[] = [];

  if(isClient){
    queryConstraints = [where('client', '==', userId), ...sortOrder]
  } else {
    switch (tab) {
      case 'yours':
        // bug there is no yours in client tickets
          queryConstraints = [where('assignedAgent', '==', userId), ...sortOrder]
        break
      case 'unassigned':
        queryConstraints = [where('assigned', '==', false), ...sortOrder]
        break
      case 'all':
        queryConstraints = [...sortOrder];
        break
      default: // return all tickets
      queryConstraints = [...sortOrder];
    }
  }
  const q = query(collection(db, 'tickets'), ...queryConstraints)

  const querySnapshot = await getDocs(q);
  const tickets: Ticket[] = [];
  querySnapshot.forEach((doc) => {
    tickets.push({ id: doc.id, ...(doc.data() as Omit<Ticket, 'id'>) })
  })

  return tickets;
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