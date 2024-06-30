import React from 'react'
import { Card, CardContent } from "@/components/ui/card"

interface TemplateProps {
  title: string,
  count: number,
  isOrange: boolean
}

const TicketCountsTemplete = ({title, count, isOrange}: TemplateProps) => {
  return (
    <div className='w-1/3 border border-gray-300 rounded-sm shadow-sm flex flex-col items-center py-4'>
      <h5 className='text-sm text-center'>{title}</h5>
      <h1 className={`text-[3rem] font-medium ${isOrange?'text-sun-500':'text-midnight-300'}`}>{count}</h1>
      <p className='text-sm font-bold pl-1 text-center'>Tickets</p>
    </div>
  )
}

interface Prop {
  yourTicketCount?:number
  unassignedTicketCount?: number
  allTicketCount?: number
}

const DashboardTicketCounts = ({yourTicketCount, unassignedTicketCount, allTicketCount}: Prop) => {

  return (
    <Card>
      <CardContent className='p-9'>
        <div className='w-full'>
          <h2 className='text-xl font-medium text-midnight-300 pb-5'>Ticket Counts</h2>
        </div>
        <div className='flex flex-row w-full gap-5'>
          <TicketCountsTemplete 
            title="Your Open Tickets" 
            count={yourTicketCount?yourTicketCount:0}
            isOrange={false} />
          <TicketCountsTemplete 
            title="Unassigned Tickets" 
            count={unassignedTicketCount?unassignedTicketCount:0}
            isOrange={true} />
          <TicketCountsTemplete 
            title="All Open Tickets" 
            count={allTicketCount?allTicketCount:0}
            isOrange={false} />
        </div>        
      </CardContent>
    </Card>
  )
}

export default DashboardTicketCounts
