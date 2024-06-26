'use client'
import React, { useEffect, useState } from 'react'
import { Search } from '@/interface/search'
import {  fetchAllTicketData, fetchTicketsDataByTab, fetchTicketsDataByUser } from '@/actions/ticket-actions'
import { Ticket } from '@/interface/ticket'
import { useAuth } from '@/contexts/authContext'
import MainTitle from '@/components/MainTitle'
import TicketsTabs from '@/components/TicketsTabs'
import OpenCloseDropdown from '@/components/OpenCloseDropdown'
import { TicketsSortedBySelect } from '@/components/TicketsSortedBySelect'
import TicketsDataCard from '@/components/TicketsDataCard'

const AgentTickets = ({searchParams}: Search) => {
  const { currentUser, isClient } = useAuth()
  const [ticketData, setTicketData] = useState<Ticket[]>([])
  useEffect(() => {
    async function fetchData() {
      if(searchParams.tab === 'yours' && !searchParams.sortedBy){
        const data = await fetchTicketsDataByUser(currentUser?.id, isClient)
        setTicketData(data)
        console.log('Fetched data A')
      }
      else if(searchParams.tab === 'all' && !searchParams.sortedBy){
        const data = await fetchAllTicketData()
        setTicketData(data)
        console.log('Fetched data B')
      }
      else if(searchParams.tab){
        const data = await fetchTicketsDataByTab(
          searchParams.tab, 
          searchParams?.sortedBy, 
          currentUser?.id,
          isClient
        ) // Here is bug
        setTicketData(data)
        console.log('Fetched data C')
      } else {
        const data = await fetchTicketsDataByUser(currentId, isClient)
        setTicketData(data)
        console.log('Fetched data D')
      }
    }
    fetchData()
  }, [ searchParams.tab, searchParams.sortedBy, currentUser?.id, isClient])

  return (
    <main className='container max-w-screen-lg'>
      <MainTitle title='Tickets' />
      <TicketsTabs searchParams={searchParams} />    
      <div className='p-5 bg-white rounded-b-md'>
        <div className='flex flex-col gap-3'>
          <div className='flex flex-row justify-between'>
            <OpenCloseDropdown />
            <TicketsSortedBySelect searchParams={searchParams} />
          </div>
          <TicketsDataCard tickets={ticketData} />
        </div>
      </div>
    </main>
  )
}

export default AgentTickets

