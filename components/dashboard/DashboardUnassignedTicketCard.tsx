import React from 'react'
import { Card, CardContent} from "@/components/ui/card"
import { Ticket } from "@/interface/ticket"

interface Props{
  ticket: Ticket
}

const DashboardUnassignedTicketCard = ({ticket}: Props) => {
  return (
    <Card>
      <CardContent className='pt-5'>
        <div className='w-full'>
          <h3 className='text-md md:text-lg font-medium pb-3'>
            {ticket.title}
          </h3>
          <div className='flex flex-wrap w-funn'>
            <p className='text-sm w-full md:w-1/2 text-gray-500'>{ticket.company}</p>
            <p className='text-sm w-full md:w-1/2 text-gray-500'>{ticket.category}</p>
            <p className='text-sm w-full md:w-1/2 text-gray-500 md:pt-3'>{ticket.severity}</p>
            <p className='text-sm w-full md:w-1/2 text-gray-500 md:pt-3'>Open for 2 hours</p>

          </div>
          
        </div>
        
      </CardContent>
    </Card>
  )
}

export default DashboardUnassignedTicketCard
