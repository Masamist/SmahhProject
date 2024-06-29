"use Client"
import React, {useState, useEffect} from 'react'
import { useAuth } from '@/contexts/authContext'
import { fetchAllMessage, readMessage } from '@/actions/message-actions'
import { Ticket } from '@/interface/ticket'
import { Message } from '@/interface/message'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import TicketMessages from '@/components/ticket/ticketMessage/TicketMessages'
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

  async function checkRead(data:Message[], ticketId:string) {
    await Promise.all(
      data.map(async(message) => {
        if( message.unreadMessage===true && message.senderId!==currentUser?.id){
          await readMessage({ticketId, message})
        }
      })
    )
  }

  const preFetchMessageDataForCheckRead = async() =>{
    try{
      const data = await fetchAllMessage(ticket.id)
      const ticketId = ticket.id
      await checkRead(data, ticketId)
      }catch(error){
      console.log(error)  
    }  
  }

  const fetchMessageData = async() =>{
    try{
      const data = await fetchAllMessage(ticket.id)
      setMessages(data)
      const latestRead = data.find((message) => message.unreadMessage!==true&&message.senderId===currentUser?.id)
      setLatestReadMessage(latestRead?.id)
      }catch(error){
      console.log(error)  
    }  
  }

  useEffect(() => {
    async function messageLoad(){
      await preFetchMessageDataForCheckRead()
      await fetchMessageData()
    }
    messageLoad()
  }, [])

  const handleMessageFormToggle = () => {
    setOpen(!open)
  }

  return (
    <Card className='lg:p-3'>
      <CardHeader>
        <div className='flex flex-row justify-between'>
          <h2 className='text-xl font-medium text-midnight-300'>Ticket Activities</h2>
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
