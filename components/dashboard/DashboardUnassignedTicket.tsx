
import React from 'react'
// import { useAuth } from '@/contexts/authContext'
// import { fetchAllMessage, readMessage } from '@/actions/message-action'
// import { Ticket } from '@/interface/ticket'
// import { Message } from '@/interface/message'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import DashboardUnassignedTicketCard from './DashboardUnassignedTicketCard'
// import TicketMessages from '@/components/ticket/ticketMessage/TicketMessages'
// import TicketMessageForm from '@/components/ticket/TicketMessageForm'
// import { MessageSquareMore, MessageSquareX } from 'lucide-react'

const DashboardUnassignedTicekt = () => {
  // const { currentUser } = useAuth()
  // const [messages, setMessages] = useState<Message[]>([])
  // const [open, setOpen] = useState<boolean>(false)
  // const [latestReadMessage, setLatestReadMessage] =useState<string | undefined>()

  return (
    <Card className='lg:p-3'>
      <CardHeader>
        <div className='w-full'>
          <h2 className='text-xl font-medium text-midnight-300'>Unassigned Ticket</h2>
        </div>
      </CardHeader>
      <CardContent className='flex flex-col gap-5 px-6'>
        <DashboardUnassignedTicketCard />
      </CardContent>
    </Card>
  )
}

export default DashboardUnassignedTicekt
