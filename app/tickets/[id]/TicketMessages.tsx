import React from 'react'
import { Message } from '@/interface/message'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import UserAvater from '@/components/ui/userAvatar'
import { CircleCheckBig } from 'lucide-react'

interface Prop {
  message: Message
}

const TicketMessages = ({message}: Prop) => {
  console.log(message)
  const avatarName= 'JD'
  return (
    <Card>
      <CardContent>
        <div className='flex flex-row pt-6 pb-3 pl-2 pr-3'>
          <div>
            <UserAvater avatarName={avatarName} />
          </div>
          <div className='pl-3'>
            <h3 className='font-semibold pt-1'>{message.senderName}</h3>
            <p className='text-sm pt-2'>{message.comment}</p>
            <div className='flex flex-row justify-between pt-4'>
              <p className='text-gray-500 text-sm'>
                {typeof message.createdAt  === 'string' ? message.createdAt
                    : message.createdAt?.toDate().toLocaleDateString("en-US", {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
              </p>
              <div className='flex flex-row'>
                <p className='text-gray-400 text-sm pr-1'>Read</p>
                <CircleCheckBig width={16} height={16} className='text-green-700' />
              </div>
              
            </div>
            
          </div>
        </div>
        
      </CardContent>
    </Card>
  )
}

export default TicketMessages