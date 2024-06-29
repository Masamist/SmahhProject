import React from 'react'
import DashboardActivity from './DashboardActivity'
import DashboardUnassignedTicekt from './DashboardUnassignedTicket'
import DashboardTicketCounts from './DashboardTicketCounts'

const DashboardLayout = () => {
  return (
    <div className='flex flex-row gap-5 w-full'>
      <div className='w-1/2'>
        <DashboardActivity />
      </div>
      <div className='w-1/2 flex flex-col gap-5'>
        <div>
          <DashboardUnassignedTicekt />
        </div>
        <div>
          <DashboardTicketCounts />
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default DashboardLayout
