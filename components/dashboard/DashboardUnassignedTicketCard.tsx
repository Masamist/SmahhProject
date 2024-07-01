import React from 'react'
import { Ticket } from "@/interface/ticket"
import { formatDistance, subDays , format } from "date-fns"
import { Card, CardContent} from "@/components/ui/card"
import TicketSeverity from '@/components/ticket/TicketSeverity'


interface Props{
  ticket: Ticket
}

const DashboardUnassignedTicketCard = ({ticket}: Props) => {
  const createdAtDate = ticket.createdAt?.toDate()
  const formattedDate = createdAtDate ? format(createdAtDate, "dd/MM/yy") : "Date not Available"
  const daysPassed = createdAtDate ? formatDistance(subDays(createdAtDate, 0), new Date(), { addSuffix: true }) : "";

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
            <div  className='w-full md:w-1/2  md:pt-3 flex flex-row'>
              <TicketSeverity severity={ticket.severity} />
              <span className='text-sm text-gray-500 pl-1'>{ticket.severity}</span>
            </div>
            <p className='text-sm w-full md:w-1/2 text-gray-500 md:pt-3'>{daysPassed} ({formattedDate})</p>

          </div>
          
        </div>
        
      </CardContent>
    </Card>
  )
}

export default DashboardUnassignedTicketCard
