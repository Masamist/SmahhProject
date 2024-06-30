import React from 'react'
import { Message } from '@/interface/message'
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import DashboardTicektActivityMessageCard from './DashboardTicektActivityMessageCard'

interface Props {
  allMessages: Message[]
}

const DashboardActivity = ({allMessages}: Props) => {
  return (
    <Card className='lg:p-3'>
      <CardHeader>
        <div className='w-full'>
          <h2 className='text-xl font-medium text-midnight-300'>Ticket Activities</h2>
        </div>
      </CardHeader>
      <CardContent className='flex flex-col gap-5 px-6'>
        {!allMessages?
          <p>No Messages</p>
          :
          allMessages.map((message) => (
            <div key={message.id}>
              <DashboardTicektActivityMessageCard message={message} />
            </div>
            
          ))
        }
      </CardContent>
    </Card>
  )
}

export default DashboardActivity
