import React from 'react'
import Link from 'next/link'
import { Ticket } from '@/interface/ticket'
import {
  Card,
  CardContent,
} from "@/components/ui/card"


interface Props {
  tickets: Ticket[]
}

const DataCard = ({tickets}: Props) => {
  return (
    <>
      {tickets? tickets.map((ticket) => {
        return(
        <div key={ticket.id}>
          <Link href={`/tickets/${ticket.id}`}>
            <Card key={ticket.id}>
              <CardContent>
                <div className='w-full text-xl font-semibold pt-4 pb-2'>
                  {ticket.title}
                </div>
                <div className='flex flex-row'>
                  <p className='w-1/5 text-sm'>{ticket.client}</p>
                  <p className='w-1/5 text-sm'>{ticket.category}</p>
                  <p className='w-1/5 text-sm'>{ticket.severity}</p>
                  <p className='w-1/5 text-sm'>{ticket.status}</p>
                  <p className='w-1/5 text-sm'>{typeof ticket.createdAt === 'string'?ticket.createdAt
                    : ticket.createdAt?.toDate().toLocaleDateString("en-US", {
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
      )}): null}
    </>
  )
}

export default DataCard