"use Client"
import React, {useState, useEffect} from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import TicketMessages from './TicketMessages'
import FormDialog from '@/components/FormDialog'
import { Ticket } from '@/interface/ticket'
import { Message } from '@/interface/message'
import { fetchAllMessage } from '@/actions/message-action'
import TicketMessageForm from '@/components/ticket/TicketMessageForm'
import { MessageSquareMore, MessageSquareX } from 'lucide-react'

interface Prop{
  ticket: Ticket
}
const TicketActivities = ({ticket}: Prop) => {

  const [messages, setMessages] = useState<Message[]>([])
  const [open, setOpen] = useState<boolean>(false)

  async function fetchMessageData(){
    const data = await fetchAllMessage(ticket.id)
    if(data) {
      setMessages(data)
    }
  }

  useEffect(() => {
    fetchMessageData()
  }, [])

  const handleMessageFormToggle = () => {
    setOpen(!open)
  }

  return (
    <Card className='lg:p-3'>
      <CardHeader>
        <div className='flex flex-row justify-between'>
          <h2 className='text-xl text-midnight-300'>Ticket Activities</h2>
          <button onClick={handleMessageFormToggle}>
            <div className="text-sm text-gray-600 hover:text-sun-500">
            {!open? (
              <>
                <span className='font-medium pr-2'>Create a Message</span>
                <MessageSquareMore className='inline w-5 h-5' />
              </>
            ):(
              <>
                <span className='font-medium pr-2'>Close Message Form</span>
                <MessageSquareX className='inline w-5 h-5' />
              </>
            )}
            </div>
          </button>
        </div>
      </CardHeader>
      <CardContent className='flex flex-col gap-5 px-6'>
        { !messages.length?<p className='text-sm'>There is no message yet.</p>:null}
        {!open? null : <TicketMessageForm 
          ticket={ticket} 
          handleMessageFormToggle={handleMessageFormToggle}
          fetchMessageData={fetchMessageData} />}
        
        {messages?messages.map((message) => (
          <div key={message.id}>
            <TicketMessages ticketId={ticket.id} message={message} fetchMessageData={fetchMessageData} />
          </div>
        )):null}
        
      </CardContent>
    </Card>
  )
}

export default TicketActivities
