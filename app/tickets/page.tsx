'use client'
import React, { useEffect, useState } from 'react'
import { Search } from '@/interface/search'
import {  fetchTicketsDataByTab, fetchTicketsDataByUser } from '@/actions/ticket-actions'
import { Ticket } from '@/interface/ticket'
import { useAuth } from '@/contexts/authContext'
import MainTitle from '@/components/MainTitle'
import TicketTabs from './TicketTabs'
import OpenCloseDropdown from './OpenCloseDropdown'
import { SortedBySelect } from './SortedBySelect'
import DataCard from './DataCard'

const Tickets = ({searchParams}: Search) => {
  const { currentUser } = useAuth()
  const [ticketData, setTicketData] = useState<Ticket[]>([])
  useEffect(() => {
    async function fetchData() {
      if(searchParams.tab){
        const data = await fetchTicketsDataByTab(
          searchParams.tab, 
          searchParams?.sortedBy, 
          currentUser?.id)
        setTicketData(data)
      } else {
        const data = await fetchTicketsDataByUser(currentUser?.id)
        setTicketData(data)
      }
      
    }
    fetchData()
  }, [searchParams.tab, searchParams.sortedBy])

  return (
    <main className='container max-w-screen-lg'>
      <MainTitle title='Tickets' />
      <TicketTabs searchParams={searchParams} />    
      <div className='p-5 bg-white rounded-md'>
        <div className='flex flex-col gap-3'>
          <div className='flex flex-row justify-between'>
            <OpenCloseDropdown />
            <SortedBySelect searchParams={searchParams} />
          </div>
          <DataCard tickets={ticketData} />
        </div>
      </div>
    </main>
  )
}

export default Tickets