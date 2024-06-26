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
import CloseButton from './CloseButton'
import TicketFormDialog from '@/components/ticket/TicketFormDialog'
import TicketSeverity from '@/components/ticket/TicketSeverity'

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
    <Card className='lg:col-span-2 ls:mr-4'>
      <CardHeader>
        <div className='flex flex-row justify-between'>
          <h2 className='text-xl text-midnight-300'>Ticket Details</h2>
          <div>
            <TicketFormDialog formType={'editTicket'} ticket={ticket} />
          </div>
        </div>
      </CardHeader>
      <CardContent className='prose dark:prose-inver'>
        <div className='flex flex-row flex-wrap pb-5'>
          <div className='flex flex-col w-1/2 pb-5'>
            {ticket.assignedAgent?
              <TicketDetailUser id={ticket.assignedAgent} title="Aassigned Agent" />
              : (
                <>
                  <p className='text-xs text-midnight-300'>Assigned Agent</p>
                  <p className='test-gray-400'>Unssigned</p>
                </>
              )
            }
          </div>
          <div className='w-1/2 pb-5'>
            <p className='text-xs text-midnight-300'>Category</p>
            <p>{ticket.category}</p>
          </div>
          <div className='w-1/2 pb-5'>
            <TicketDetailUser id={ticket.client} title="Client" />
          </div>
          <div className='w-1/2 pb-2'>
            <p className='text-xs text-midnight-300'>Severity</p>
            <div className='flex flex-row'>
              <TicketSeverity severity={ticket.severity} /><span className='pl-1.5'>{ticket.severity}</span>
            </div>
            
          </div>
        </div>
        <div className='pb-5'>
          <p className='text-xs text-midnight-300'>Descriotion:</p>
          <ReactMarkDown>{ticket.description}</ReactMarkDown>
        </div>
        <div className='pb-2'>
          <p className='text-xs text-midnight-300'>Created At:</p>
          <p>
            {typeof ticket.createdAt === 'string'?ticket.createdAt
              : ticket.createdAt?.toDate().toLocaleDateString("en-GB", {
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
            })}`}>Go Back</Link> 
          <CloseButton ticketId={ticket.id} />
        </div>
      </CardFooter>
    </Card>
  )
}

export default TicketDetail