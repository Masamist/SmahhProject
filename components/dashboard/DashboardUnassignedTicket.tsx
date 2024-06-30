import React from 'react'
import { Ticket } from '@/interface/ticket'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import DashboardUnassignedTicketCard from './DashboardUnassignedTicketCard'

interface Props {
  unassignedTicket: Ticket[]
}
const DashboardUnassignedTicekt = ({unassignedTicket}: Props) => {
  
  return (
    <div>
      {!unassignedTicket?
        <p className='text-sm text-gray-500'>There are no unassigned tickets.</p>
      :
        <Card className='lg:p-3'>
          <CardHeader>
            <div className='w-full'>
              <h2 className='text-xl font-medium text-midnight-300'>Unassigned Ticket</h2>
            </div>
          </CardHeader>
          <CardContent className='flex flex-col gap-5 px-6'>
            {unassignedTicket?.map((ticket) => (
              <div key={ticket.id}>
                <DashboardUnassignedTicketCard ticket={ticket} />
              </div>
              )
            )}
          </CardContent>
        </Card>
      }
    </div>
    
  )
}

export default DashboardUnassignedTicekt
