"use client"
import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/authContext'
import { fetchTicketsDataByUser } from '@/actions/ticket-actions'
import { Ticket } from '@/interface/ticket'
import { Message } from '@/interface/message'

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import DashboardTicektActivityMessageCard from './DashboardTicektActivityMessageCard'
// import TicketMessages from '@/components/ticket/ticketMessage/TicketMessages'
// import TicketMessageForm from '@/components/ticket/TicketMessageForm'
// import { MessageSquareMore, MessageSquareX } from 'lucide-react'

const DashboardActivity = () => {
  const { currentUser, isClient } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const userId = currentUser?.id
  
  // useEffect(() => {
  //   const ticketData = fetchTicketsDataByUser(userId, isClient)
  //     let messages: Message[] = []
  //     messages = ticketData.includes('messages')
  // })

  return (
    <Card className='lg:p-3'>
      <CardHeader>
        <div className='w-full'>
          <h2 className='text-xl font-medium text-midnight-300'>Ticket Activities</h2>
        </div>
      </CardHeader>
      <CardContent className='flex flex-col gap-5 px-6'>
        <DashboardTicektActivityMessageCard />
      </CardContent>
    </Card>
  )
}

export default DashboardActivity
