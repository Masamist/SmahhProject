import React from 'react'
import { formatDistance, subDays , format } from "date-fns"
import { MessageWithTicketInfo } from '@/actions/message-actions'
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from '@/components/ui/separator'
import TicketSeverity from '@/components/ticket/TicketSeverity'

interface Props{
  messageWithTicketInfo: MessageWithTicketInfo
}

const DashboardTicektActivityMessageCard = ({messageWithTicketInfo}: Props) => {
  const createdAtDate = messageWithTicketInfo.createdAt?.toDate()
  const formattedDate = createdAtDate ? format(createdAtDate, "dd/MM/yy") : "Date not Available"
  const daysPassed = createdAtDate ? formatDistance(subDays(createdAtDate, 0), new Date(), { addSuffix: true }) : "";
  return (
    <Card>
      <CardContent className='pt-5'>
      <p className='text-sm'>
          From:
          <span className='font-semibold pl-2'>
            {messageWithTicketInfo.senderName}
             / {messageWithTicketInfo.company}</span> 
        </p>
        <p className='text-sm'>
          Sent at:
          <span className='font-semibold pl-2'>{daysPassed} </span>({formattedDate}) 
        </p>
        <h3 className='text-md md:text-lg font-medium py-2'>{messageWithTicketInfo.title}</h3>
        <div className='flex flex-row'>
          <p className='text-sm text-gray-400 font-semibold pr-10'>{messageWithTicketInfo.category}</p>
          <TicketSeverity severity={messageWithTicketInfo.severity} />
          <span className='text-sm text-gray-400 font-semibold pl-1'>{messageWithTicketInfo.severity}</span> 
        </div>
        <Separator className='mt-1 mb-3' />
        <p className='text-sm text-gray-600'>
          {messageWithTicketInfo.comment}
        </p>
      </CardContent>
    </Card>
  )
}

export default DashboardTicektActivityMessageCard
