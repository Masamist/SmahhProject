import React from 'react'
import dynamic from 'next/dynamic'
import { Ticket } from '@/interface/ticket'
import { Message } from '@/interface/message'
import { useAuth } from '@/contexts/authContext'
import { formatDistance, subDays , format } from "date-fns"
import TicketMessageDeleteButton from './TicketMessageDeleteButton'
import TicketMessageReadChecker from './TicketMessageReadChecker'
import {
  Card,
  CardContent
} from "@/components/ui/card"
import UserAvater from '@/components/ui/userAvatar'

// const TicketMessageReadChecker = dynamic(() => import("./TicketMessageReadChecker"), {
//   ssr:false,
// })

interface Prop {
  ticket: Ticket
  message: Message
  latestReadMessage?: string | undefined
  fetchMessageData: () => void
}

const TicketMessages = ({ticket, message, latestReadMessage, fetchMessageData}: Prop) => {
  // Fix here
  const messageName= message.senderName.split(" ")
  const avatarName = messageName[0].substring(0,1) + messageName[messageName.length-1].substring(0,1)
  const createdAtDate = message.createdAt?.toDate()

  const { currentUser } = useAuth()
  const formattedDate = createdAtDate ? format(createdAtDate, "dd/MM/yy") : "Date not Available"
  const daysPassed = createdAtDate ? formatDistance(subDays(createdAtDate, 0), new Date(), { addSuffix: true }) : "";

  return (
    <Card>
      <CardContent>
        <div className='flex flex-row pt-6 pb-3 pl-2 pr-3 w-ful'>
          <div>
            <UserAvater avatarName={avatarName} />
          </div>
          <div className='pl-3 w-full'>
            <div className='flex flex-row justify-between'>
              <h3 className='font-semibold pt-1'>{message.senderName}</h3>
              { currentUser?.id===message.senderId?(
                <div>
                  <TicketMessageDeleteButton 
                  ticketId={ticket.id} 
                  messageId={message.id} 
                  fetchMessageData={fetchMessageData} />
                </div>
              ):null
            }
            </div>
            
            <p className='text-sm pt-2'>{message.comment}</p>
            <div className='flex flex-row justify-between pt-4'>
              <div>
                <span className='text-gray-400 text-sm pr-1'>
                  {daysPassed},
                </span>
                <span className='text-gray-400 text-sm'>
                  {formattedDate}
                </span>
              </div>
              <TicketMessageReadChecker 
                ticketId={ticket.id} 
                message={message} 
                latestReadMessage={latestReadMessage} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TicketMessages