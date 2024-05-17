import React from 'react'
import { Ticket } from '@/Interface/ticket'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

// import { SearchParams } from "./page"
interface Props {
  tickets: Ticket[]
}

const DataTable = ({tickets}: Props) => {

  
  return (
      <div className="w-full mt-5">
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <p>Title</p>
                {/* <Link href={{query: {...searchParams, orderBy: "title"}}}>Title</Link>
                {"title" === searchParams.orderBy && <ArrowDown className="inline p-1" />} */}
              </TableHead>
              <TableHead>
                <div className="flex justify-center">
                <p>Client</p>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex justify-center">
                <p>Category</p>
                </div>
              </TableHead>
              <TableHead>
                <p>Severity</p>
              </TableHead>
              <TableHead>
                <p>Assigned By</p>
              </TableHead>
              <TableHead>
                <p>Created At</p>
              </TableHead>
              {/* <TableHead>
              <p>Time</p>
              </TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets ? tickets.map((ticket) => {
              return (
                <TableRow key={ticket.id} data-href='/'>
                  <TableCell><Link href={`/tickets/${ticket.id}`}>{ticket.title}</Link></TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <p>{ticket.client}</p>
                      {/* <TicketStatusBadge status={ticket.status} /> */}
                    </div>
                  </TableCell>  
                  <TableCell>
                    <div className="flex justify-center">
                      <p>{ticket.category}</p>
                      {/* <TicketPriority priority={ticket.priority} /> */}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <p>{ticket.severity}</p>
                      {/* <TicketPriority priority={ticket.priority} /> */}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <p>{ticket.assignedAgent}</p>
                      {/* <TicketPriority priority={ticket.priority} /> */}
                    </div>
                  </TableCell>
                  <TableCell>
                    {typeof ticket.createdAt === 'string'?ticket.createdAt
                    : ticket.createdAt?.toDate().toLocaleDateString("en-US", {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </TableCell>
                </TableRow>
              )
            }): null}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default DataTable