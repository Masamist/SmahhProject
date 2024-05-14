'use client'
import React, { useEffect, useState } from 'react'
import { db } from '@/firebaseConfig'
import { getDocs, collection } from 'firebase/firestore'
import { Ticket } from '@/Interface/ticket'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { ArrowDown } from "lucide-react"

// import { SearchParams } from "./page"


interface Props {
  tickets: Ticket[]
  // searchParams: SearchParams
}



const DataTable = () => {

  async function fetchDataFromFirestore(): Promise<Ticket[]>{
    const querySnapshot = await getDocs(collection(db, "tickets"))
  
    const tickets: Ticket[] = []
    querySnapshot.forEach((doc) => {
      tickets.push({ id: doc.id, ...(doc.data() as Omit<Ticket, 'id'>) })
    })
    return tickets
  }

  const [ticketData, setTicketData] = useState<Ticket[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFirestore()
      setTicketData(data)
    }
    fetchData()
  }, [])

  return (
    // <div>
    //   { ticketData.map((ticket) => (
    //     <div key={ticket.id} className='mb-4'>
    //       <p className='text-xl font-bold'>{ticket.title}</p>
    //       <p>{ticket.status}</p>
    //       <p>{ticket.createdBy}</p>
    //       <p>{ticket.severity}</p>
    //     </div>
    //   ))}
    // </div>
      <div className="w-full mt-5">
      <div className="rounded-md sm:border">
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
              {/* <TableHead>
              <p>Time</p>
              </TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {ticketData ? ticketData.map((ticket) => {
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
                  {/* <TableCell>
                    {ticket.createdAt.toLocaleDateString("en-US", {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </TableCell> */}
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