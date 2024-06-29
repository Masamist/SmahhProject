"use client"
import React from 'react'
import { Message } from '@/interface/message'
import { CircleCheckBig, SendHorizontal } from 'lucide-react'

interface Props {
  ticketId: string
  message: Message
  latestReadMessage?: string
}

const TicketMessageReadChecker = ({ticketId, message, latestReadMessage}: Props) => {
  return (
    <>
      {message.unreadMessage===true &&
        <div className='flex flex-row'>
          <p className='text-gray-400 text-sm pr-1'>Sent </p>
          <SendHorizontal width={16} height={16} className='text-gray-400' />
        </div> 
      }
      { latestReadMessage===message.id && (
        <div className='flex flex-row'>
          <p className='text-gray-400 text-sm pr-1'>Seen</p>
          <CircleCheckBig width={16} height={16} className='text-green-700' />
        </div>
      )} 
    </>
  )
}

export default TicketMessageReadChecker
