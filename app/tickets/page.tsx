'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { fetchAllTicketData, fetchTicketsDataByTab, fetchTicketsDataByUser } from '@/actions/ticket-actions'
import { Ticket } from '@/interface/ticket'
import { useAuth } from '@/contexts/authContext'
import MainTitle from '@/components/MainTitle'
import TicketTabs from './TicketTabs'
import OpenCloseDropdown from './OpenCloseDropdown'
import { SortedBySelect } from './SortedBySelect'
import DataCard from './DataCard'

interface CategoryProps{
  searchParams: {
    tab?: string
    title?: string
    sortedBy?:string
  }
}

// export interface SearchParams {
//   status: Status
//   page: string
//   orderBy: keyof Ticket 
// }

const Tickets = ({searchParams}: CategoryProps) => {
  const { currentUser } = useAuth()
  console.log("ID", currentUser?.id)
  const [ticketData, setTicketData] = useState<Ticket[]>([])
  useEffect(() => {
    async function fetchData() {
      console.log(searchParams && currentUser?.id)
      if(searchParams.tab){
        const data = await fetchTicketsDataByTab( searchParams.tab, currentUser?.id)
        setTicketData(data)
      } else {
        
        const data = await fetchTicketsDataByUser(currentUser?.id)
        setTicketData(data)
      }
      
    }
    fetchData()
  }, [searchParams])

  return (
    <main className='container max-w-screen-lg'>
      <MainTitle title='Tickets' />
      <TicketTabs searchParams={searchParams} />    
      <div className='p-5 bg-white rounded-md'>
        <div className='flex flex-col gap-3'>
          <div className='flex flex-row justify-between'>
            <OpenCloseDropdown />
            <SortedBySelect />
          </div>
          <DataCard tickets={ticketData} />
        </div>
      </div>
    </main>
  )
}

export default Tickets