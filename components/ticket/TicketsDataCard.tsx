import React from 'react'
import Link from 'next/link'
import { Ticket } from '@/interface/ticket'
// UI materials
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import TicketSeverity from '@/components/ticket/TicketSeverity'
import TicketUnassignedBadge from '@/components/ticket/TicketUnassignedBadge'

interface Props {
  tickets: Ticket[],
}

const TicketsDataCard = ({tickets}: Props) => {
  return (
    <>
      {tickets? tickets.map((ticket) => (
        <div key={ticket.id}>
          <Link href={`/tickets/${ticket.id}`}>
            <Card key={ticket.id} className='hover:bg-gray-100'>
              <CardContent>
                <div className='flex w-full text-lg font-semibold pt-3 pb-2 items-center'>
                  {ticket.title}
                  {!ticket.assigned && <TicketUnassignedBadge />}
                </div>
                <div className='flex flex-row'>
                  <p className='w-1/5 text-sm'>
                    {/* { isClient ? (<TicketDataCardAgentFinder agentId = {ticket.assignedAgent} />):{ticket.company}} Bugggggggggg */}
                    {ticket.company}
                  </p>
                  <p className='w-1/5 text-sm'>{ticket.category}</p>
                  <TicketSeverity severity={ticket.severity} /><span className='w-1/5 text-sm pl-1.5'>{ticket.severity}</span>
                  <p className='w-1/5 text-sm'>{ticket.status}</p>
                  <p className='w-1/5 text-sm'>{typeof ticket.createdAt === 'string' ? ticket.createdAt
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
            </Card>
          </Link>
        </div>
      )): null}
    </>
  )
}

export default TicketsDataCard