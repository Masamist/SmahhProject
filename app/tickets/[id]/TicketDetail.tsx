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
import { Button, buttonVariants } from '@/components/ui/button'
import ReactMarkDown from 'react-markdown'
import CloseButton from './CloseButton'
import { Pencil } from 'lucide-react'
import FormDialog from '@/components/FormDialogTicket'

// import AssignTicket from '@/components/AssignTicket'

interface TicketProps{
  ticket: Ticket
}

const TicketDetail = ({ticket}: TicketProps) => {

  const details = [
    {label: "Assigned Agent:", detail: ticket.assignedAgent},
    {label: "Category:", detail: ticket?.category},
    {label: "Client:", detail: ticket?.client},
    {label: "Severity:", detail: ticket?.severity},
    // {label: "Created At", detail: ticket?.createdAt}, 
  ]
  return (
    <Card className='lg:col-span-2 ls:mr-4'>
      <CardHeader>
        <div className='flex flex-row justify-between'>
          <h2 className='text-2xl text-cyan-500'>Ticket Details</h2>
          <div>
            <FormDialog type={'edit'} ticket={ticket} />
          </div>
        </div>
      </CardHeader>
      <CardContent className='prose dark:prose-inver'>
        <div className='flex flex-row flex-wrap'>
          { details.map((item, index) => (
            <div className='flex flex-col w-1/2 py-3' key={index}>
              <p className='text-xs text-cyan-500'>{item.label}</p>
              <p>{item.detail}</p>
            </div>
          ))}
        </div>
        <div className='py-3'>
          <p className='text-xs text-cyan-500'>Descriotion:</p>
          <ReactMarkDown>{ticket.description}</ReactMarkDown>
        </div>
        <div className='py-3'>
          <p className='text-xs text-cyan-500'>Created At:</p>
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