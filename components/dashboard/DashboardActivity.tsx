import React from 'react'
import { MessageWithTicketInfo } from '@/actions/message-actions'
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import DashboardTicektActivityMessageCard from './DashboardTicektActivityMessageCard'

interface Props {
  messagesWithTicketInfo?: MessageWithTicketInfo[]
}

const DashboardActivity = ({messagesWithTicketInfo}: Props) => {
  return (
    <Card className='lg:p-3'>
      <CardHeader>
        <div className='w-full'>
          <h2 className='text-xl font-medium text-midnight-300'>Ticket Activities</h2>
        </div>
      </CardHeader>
      <CardContent className='flex flex-col gap-5 px-6'>
        {!messagesWithTicketInfo?
          <p>No Messages</p>
          :
          messagesWithTicketInfo.map((message) => (
            <div key={message.id}>
              <DashboardTicektActivityMessageCard messageWithTicketInfo={message} />
            </div>
            
          ))
        }
      </CardContent>
    </Card>
  )
}

export default DashboardActivity
