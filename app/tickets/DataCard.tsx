import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Ticket } from '@/interface/ticket'
import Link from 'next/link'

interface Props {
  tickets: Ticket[]
}

const DataCard = ({tickets}: Props) => {
  return (
    <div className='flex flex-col gap-3'>
      {tickets? tickets.map((ticket) => {
        return(
        <>
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
        </>
      )}): null}
    </div>
  )
}

export default DataCard