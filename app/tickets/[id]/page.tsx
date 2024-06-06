'use client'
import React, { useEffect, useState } from 'react'
import { db } from '@/firebaseConfig'
import { getDoc, doc } from 'firebase/firestore'
import { Ticket } from '@/interface/ticket'
import MainTitle from '@/components/MainTitle'
import TicketDetail from './TicketDetail'
import TicketMessages from './TicketMessages'

interface Props {
  params: {id: string},
}

const SingleTicket = ({params: {id}}: Props) => {
  const [ticket, setTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docSnap = await getDoc(doc(db, "tickets", id))
        if (docSnap.exists()) {
          const ticketData = { id: docSnap.id, ...docSnap.data() } as Ticket
          setTicket(ticketData);
        } else {
          console.log(`Document with ID ${id} does not exist`)
        }
      } catch (error) {
        console.error('Error fetching document:', error)
      }
    }
    fetchData()
  }, [id])
  
  return (
    <div className='container max-w-screen-lg mt5'>
      <MainTitle title='Tickets' />
      {ticket?
        <div className='flex flex-col lg:flex-row gap-5'>
          <div className='w-full lg:w-5/12'>
            <TicketDetail ticket={ticket}  />
          </div>
          <div className='w-full lg:w-7/12'>
            <TicketMessages />
          </div> 
        </div>
        : (<p>Ticket is not Found!</p>)}
    </div>
  )
}

export default SingleTicket