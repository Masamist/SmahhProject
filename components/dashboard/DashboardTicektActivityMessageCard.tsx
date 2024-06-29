import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from '@/components/ui/separator'

const DashboardTicektActivityMessageCard = () => {
  return (
    <Card>
      <CardContent className='pt-5'>
      <p className='text-sm'>
          From:
          <span className='font-semibold pl-2'>John Smith / Whitecliffe</span> 
        </p>
        <p className='text-sm'>
          Sent at:
          <span className='font-semibold pl-2'>2 hours ago </span>(23/Jun/24 12:17) 
        </p>
        <h3 className='text-md md:text-lg font-medium py-2'>Man-in-the-meddle attch (MitM)</h3>
        <div className='flex flex-row'>
          <p className='text-sm text-gray-400 font-semibold pr-10'>Cybersecurity</p>
          <p className='text-sm text-gray-400 font-semibold'>High</p> 
        </div>
        <Separator className='mt-1 mb-3' />
        <p className='text-sm text-gray-600'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ...
        </p>
      </CardContent>
    </Card>
  )
}

export default DashboardTicektActivityMessageCard
