import React from 'react'
import Link from 'next/link'
import { Ticket } from '@/interface/ticket'
import TicketDetailUser from './TicketDetailUser'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { buttonVariants } from '@/components/ui/button'
import ReactMarkDown from 'react-markdown'
import TicketCloseButton from '@/components/ticket/TicketCloseButton'
import FormDialog from '@/components/FormDialog'
import TicketSeverity from '@/components/ticket/TicketSeverity'
import { Undo2 } from 'lucide-react'

interface TicketProps{
  ticket: Ticket
}

const TicketDetail = ({ticket}: TicketProps) => {

  const details = [
    {label: "Assigned Agent:", detail: ticket.assignedAgent},
    {label: "Category:", detail: ticket?.category},
    {label: "Client:", detail: ticket?.client},
    {label: "Severity:", detail: ticket?.severity},
  ]

  return (
    <Card className='lg:col-span-2 lg:p-3'>
      <CardHeader>
        <div className='flex flex-row justify-between'>
          <h2 className='text-xl font-medium text-midnight-300'>Ticket Details</h2>
          <div>
            <FormDialog formType={'editTicket'} ticket={ticket} />
          </div>
        </div>
      </CardHeader>
      <CardContent className='prose dark:prose-inver'>
        <div className='flex flex-row flex-wrap pb-5'>
          <div className='flex flex-col w-1/2 pb-5'>
            {ticket.assignedAgent?
              <TicketDetailUser id={ticket.assignedAgent} title="Assigned Agent" />
              : (
                <>
                  <p className='text-xs text-midnight-300'>Assigned Agent</p>
                  <p className='text-sm'>Unssigned</p>
                </>
              )
            }
          </div>
          <div className='w-1/2 pb-5'>
            <p className='text-xs text-midnight-300'>Category</p>
            <p  className='text-sm'>{ticket.category}</p>
          </div>
          <div className='w-1/2 pb-5'>
            <TicketDetailUser id={ticket.client} title="Client" />
          </div>
          <div className='w-1/2 pb-2'>
            <p className='text-xs text-midnight-300'>Severity</p>
            <div className='flex flex-row'>
              <TicketSeverity severity={ticket.severity} />
              <span className='text-sm pl-1.5'>{ticket.severity}</span>
            </div>
            
          </div>
        </div>
        <div className='pb-5'>
          <p className='text-xs text-midnight-300'>Description:</p>
          <ReactMarkDown className='text-sm'>{ticket.description}</ReactMarkDown>
        </div>
        <div className='pb-2'>
          <p className='text-xs text-midnight-300'>Created at:</p>
          <p  className='text-sm'>
            {typeof ticket.createdAt === 'string'?ticket.createdAt
              : ticket.createdAt?.toDate().toLocaleDateString("en-NZ", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            })}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-row lg:mx-0 gap-2">
        <Link href={`/tickets`} className={`${buttonVariants({
              variant: "default"
            })}`}>Go Back <Undo2 width={25} height={25} className='pb-1' /></Link> 
          <TicketCloseButton ticketId={ticket.id} />
        </div>
      </CardFooter>
    </Card>
  )
}

export default TicketDetail