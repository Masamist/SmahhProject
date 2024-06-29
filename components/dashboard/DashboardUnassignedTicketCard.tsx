import React from 'react'
import { Card, CardContent} from "@/components/ui/card"
import DashboardTicektActivityMessageCard from './DashboardTicektActivityMessageCard'

const DashboardUnassignedTicketCard = () => {
  return (
    <Card>
      <CardContent className='pt-5'>
        <div className='w-full'>
          <h3 className='text-lg font-medium pb-3'>
            Unrestricted Access to Data and Other Information
          </h3>
          <div className='flex flex-wrap w-funn'>
            <p className='text-sm w-full md:w-1/2'>ABS Consultimg  LTD.</p>
            <p className='text-sm w-full md:w-1/2'>ABS Consultimg  LTD.</p>
            <p className='text-sm w-full md:w-1/2'>ABS Consultimg  LTD.</p>
            <p className='text-sm w-full md:w-1/2'>ABS Consultimg  LTD.</p>

          </div>
          
        </div>
        
      </CardContent>
    </Card>
  )
}

export default DashboardUnassignedTicketCard
