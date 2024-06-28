"use Client"
import React, {useState, useEffect} from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import TicketMessages from './TicketMessages'
import { useAuth } from '@/contexts/authContext'
import { Ticket } from '@/interface/ticket'
import { Message } from '@/interface/message'
import { fetchAllMessage } from '@/actions/message-action'
import TicketMessageForm from '@/components/ticket/TicketMessageForm'
import { MessageSquareMore, MessageSquareX } from 'lucide-react'

interface Prop{
  ticket: Ticket
}
const TicketActivities = ({ticket}: Prop) => {
  const { currentUser } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [latestReadMessage, setLatestReadMessage] =useState<string | undefined>()

  async function fetchMessageData(){
    const data = await fetchAllMessage(ticket.id)
    if(data) {
      setMessages(data)
    }
    const latestRead = messages
      .find((message) => !message.unreadMessage && message.senderId !== currentUser?.id )
    setLatestReadMessage(latestRead?.id)
    console.log(latestRead)
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
        {!open && <TicketMessageForm 
          ticket={ticket} 
          handleMessageFormToggle={handleMessageFormToggle}
          fetchMessageData={fetchMessageData} />}
        
        {messages && messages.map((message) => (
          <div key={message.id}>
            <TicketMessages 
              ticket={ticket} 
              message={message} 
              latestReadMessage={latestReadMessage} 
              fetchMessageData={fetchMessageData} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default TicketActivities
