import React from 'react'
import SingleTicketLayout from './SingleTicketLayout'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';

export async function generateStaticParams() {
  try {
    const ticketsCollection = collection(db, 'tickets');
    const ticketSnapshot = await getDocs(ticketsCollection);
    const tickets = ticketSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return tickets.map(ticket => ({
      id:`${ticket.id}`,
    }));
  } catch (error) {
    console.error('Failed to fetch tickets:', error);
    return [];
  }
}

interface Props {
  params: {id: string},
}

const SingleTicket = ({params}: Props) => {
  
  return (
    <div className='mt5'>
      <SingleTicketLayout id= {params.id} />
    </div>
  )
}

export default SingleTicket