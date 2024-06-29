import React from 'react'
import { Card, CardContent } from "@/components/ui/card"

const DashboardTicketCounts = () => {
  return (
    <Card>
      <CardContent className='pt-5'>
        <div className='w-full'>
          <h2 className='text-xl font-medium text-midnight-300'>Tickets Counts</h2>
        </div>
        <div className='flex flex-row w-full gap-5'>
          <div className='w-1/3 border border-gray-300 rounded-sm shadow-sm'>Your Open Tickets</div>
          <div className='w-1/3 border border-gray-300 rounded-sm shadow-sm '>Unassigned Tickets</div>
          <div className='w-1/3 border border-gray-300 rounded-sm shadow-sm
          '>All Open Tickets</div>
        </div>        
      </CardContent>
    </Card>
  )
}

export default DashboardTicketCounts
