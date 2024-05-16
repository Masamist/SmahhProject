import React from 'react'
import { db } from '@/firebaseConfig'
import { getDocs, collection } from 'firebase/firestore'
import { Ticket } from '@/Interface/ticket'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// import TicketStatusBadge from '@/components/TicketStatusBadge'
// import TicketPriority from '@/components/TicketPriority'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import ReactMarkDown from 'react-markdown'
import CloseButton from './CloseButton'
// import AssignTicket from '@/components/AssignTicket'

interface TicketProps{
  ticket: Ticket
}

const TicketDetail = ({ticket}: TicketProps) => {
  return (
    <div className='lg:grid lg:grid-cols-4'>
      <Card className='mx-4 mb-4 lg:col-span-3 ls:mr-4'>
        <CardHeader>
          <div className='flex justify-between mb-3'>
            {/* <TicketStatusBadge status={ticket.status} /> */}
            {/* <TicketPriority priority={ticket.priority} /> */}
          </div>
          <CardTitle>{ticket.title}</CardTitle>
          <CardDescription>
            Created At: { ticket.createdAt?.toString() }
            {/* Created At: { ticket.createdAt?.toDate().toDateString() } */}
            {/* {ticket.createdAt?(
              new Date(ticket.createdAt).toLocaleDateString("en-US", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
              hour: "numeric",
              minute: "2-digit",
              hour12: true
            })) : ('undefined')
            } */}
          </CardDescription>
        </CardHeader>
        <CardContent className='prose dark:prose-invert'>
          <ReactMarkDown>{ticket.description}</ReactMarkDown>
        </CardContent>
        {/* <CardFooter>
          <p>
          Updated: {""}
            {ticket.updatedAt?.toLocaleDateString("en-US", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
        </CardFooter> */}
      </Card>
      <div className="mx-4 flex lg:flex-col lg:mx-0 gap-2">
        {/* <AssignTicket ticket={ticket} users={users} /> */}
        <p>{ticket.assignedAgent}</p>
        <Link href={`/tickets/edit/${ticket.id}`} className={`${buttonVariants({
          variant: "default"
        })}`}>Edit Ticket</Link>
        <CloseButton ticketId={ticket.id} />
      </div>
    </div>
  )
}

export default TicketDetail