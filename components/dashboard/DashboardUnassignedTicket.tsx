"use client"
import React, { useState, useEffect } from 'react'
import { fetchUnassignedTickets } from '@/actions/ticket-actions'
import { Ticket } from '@/interface/ticket'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import DashboardUnassignedTicketCard from './DashboardUnassignedTicketCard'

const DashboardUnassignedTicekt = () => {
  const [unassignedTicket, setUnassignedTicket] = useState<Ticket[]>([])
  
  useEffect(()=> {
    async function fetchData() {     
        const data = await fetchUnassignedTickets()
        if(data){
          setUnassignedTicket(data)
        }else{
          console.log('unknown error')
        }
      }
      fetchData()
    },[])

  return (
    <Card className='lg:p-3'>
      <CardHeader>
        <div className='w-full'>
          <h2 className='text-xl font-medium text-midnight-300'>Unassigned Ticket</h2>
        </div>
      </CardHeader>
      <CardContent className='flex flex-col gap-5 px-6'>
        {unassignedTicket?.map((ticket) => (
          <div key={ticket.id}>
            <DashboardUnassignedTicketCard ticket={ticket} />
          </div>
          )
        )}
      </CardContent>
    </Card>
  )
}

export default DashboardUnassignedTicekt
