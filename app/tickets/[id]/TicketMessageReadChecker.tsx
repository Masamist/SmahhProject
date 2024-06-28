"use client"
import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/authContext'
import { Ticket } from '@/interface/ticket'
import { Message } from '@/interface/message'
import { CircleCheckBig, SendHorizontal } from 'lucide-react'
import { readMessage } from '@/actions/message-action'

interface Props {
  ticketId: string
  message: Message
  latestReadMessage?: string
}

const TicketMessageReadChecker = ({ticketId, message, latestReadMessage}: Props) => {
  const { currentUser } = useAuth()

  useEffect(() => {
    if(message.senderId!==currentUser?.id){
      // bug
      readMessage({ticketId, message})
    }else{
      null
    }
  },[currentUser?.id, message, ticketId])
  
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
          <p className='text-gray-400 text-sm pr-1'>Read</p>
          <CircleCheckBig width={16} height={16} className='text-green-700' />
        </div>
      )} 
    </>
  )
}

export default TicketMessageReadChecker
