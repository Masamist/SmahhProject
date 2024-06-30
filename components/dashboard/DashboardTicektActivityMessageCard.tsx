import React from 'react'
import { formatDistance, subDays , format } from "date-fns"
import { Message } from '@/interface/message'
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from '@/components/ui/separator'


interface Props{
  message: Message
}


const DashboardTicektActivityMessageCard = ({message}: Props) => {
  const createdAtDate = message.createdAt?.toDate()
  const formattedDate = createdAtDate ? format(createdAtDate, "dd/MM/yy") : "Date not Available"
  const daysPassed = createdAtDate ? formatDistance(subDays(createdAtDate, 0), new Date(), { addSuffix: true }) : "";
  return (
    <Card>
      <CardContent className='pt-5'>
      <p className='text-sm'>
          From:
          <span className='font-semibold pl-2'>
            {message.senderName}
             / Whitecliffe</span> 
        </p>
        <p className='text-sm'>
          Sent at:
          <span className='font-semibold pl-2'>{daysPassed} </span>({formattedDate}) 
        </p>
        <h3 className='text-md md:text-lg font-medium py-2'>Man-in-the-meddle attch (MitM)</h3>
        <div className='flex flex-row'>
          <p className='text-sm text-gray-400 font-semibold pr-10'>Cybersecurity</p>
          <p className='text-sm text-gray-400 font-semibold'>High</p> 
        </div>
        <Separator className='mt-1 mb-3' />
        <p className='text-sm text-gray-600'>
          {message.comment}
        </p>
      </CardContent>
    </Card>
  )
}

export default DashboardTicektActivityMessageCard
