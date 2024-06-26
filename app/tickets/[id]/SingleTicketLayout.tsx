'use client'
import React, { useEffect, useState } from 'react'
import { fetchSingleTicketData } from '@/actions/ticket-actions'
import { Ticket } from '@/interface/ticket'
import MainTitle from '@/components/MainTitle'
import TicketDetail from './TicketDetail'
import TicketActivities from './TicketActivities'

interface Prop {
  id: string,
}


const SingleTicketLayout = ({id}: Prop) => {

  const [ticket, setTicket] = useState<Ticket | null>(null)

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
    <div>
      <MainTitle title='Tickets' ticketTitle={ticket?.title} assigned={ticket?.assigned} />
       {ticket?
        <div className='flex flex-col lg:flex-row gap-5'>
          <div className='w-full lg:w-5/12'>
            <TicketDetail ticket={ticket}  />
          </div>
          <div className='w-full lg:w-7/12'>
            <TicketActivities ticket={ticket} />
          </div> 
        </div>
        : (<p>Ticket is not Found!</p>)}
    </div>
  )
}

export default SingleTicketLayout
