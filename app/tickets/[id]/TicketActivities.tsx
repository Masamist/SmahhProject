"use Client"
import React, {useState, useEffect} from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import TicketMessages from './TicketMessages'
import FormDialog from '@/components/FormDialog'
import { Ticket } from '@/interface/ticket'
import { Message } from '@/interface/message'
import { fetchAllMessage } from '@/actions/message-action'

interface Prop{
  ticket: Ticket
}
const TicketActivities = ({ticket}: Prop) => {

  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    async function fetchData(){
      const data = await fetchAllMessage(ticket.id)
      if(data) {
        setMessages(data)
      }
    }
    fetchData()
    
  }, [])
  return (
    <Card className='lg:p-3'>
      <CardHeader>
        <div className='flex flex-row justify-between'>
          <h2 className='text-xl text-midnight-300'>Ticket Activities</h2>
          <div>
            <FormDialog formType={'createMessage'} ticket={ticket}  />
          </div>
        </div>
      </CardHeader>
      <CardContent className='flex flex-col gap-5 px-6'>
        {messages?messages.map((message) => (
          <div key={message.id}>
            <TicketMessages message={message} />
          </div>
          
        )):null}
        
      </CardContent>
    </Card>
  )
}

export default TicketActivities
