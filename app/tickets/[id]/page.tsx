'use client'
import React, { useEffect, useState } from 'react'
import { Ticket } from '@/interface/ticket'
import MainTitle from '@/components/MainTitle'
import TicketDetail from './TicketDetail'
import TicketMessages from './TicketMessages'
import { fetchSingleTicketData } from '@/actions/ticket-actions'

interface Props {
  params: {id: string},
}

const SingleTicket = ({params: {id}}: Props) => {
  const [ticket, setTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchSingleTicketData(id)
      if(data){
        setTicket(data)
      }
    }
    fetchData()
  }, [id])
  
  return (
    <div className='container max-w-screen-lg mt5'>
      <MainTitle ticketTitle={ticket?.title} />
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