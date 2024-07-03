'use client'
import React, { useEffect, useState } from 'react'
import { Search } from '@/interface/search'
import {  fetchAllTicketData, fetchTicketsDataByTab, fetchTicketsDataByUser } from '@/actions/ticket-actions'
import { Ticket } from '@/interface/ticket'
import { useAuth } from '@/contexts/authContext'
import MainTitle from '@/components/MainTitle'
import TicketsTabs from '@/components/ticket/TicketsTabs'
import OpenCloseDropdown from '@/components/ui/openCloseDropdown'
import { TicketsSortedBySelect } from '@/components/ticket/TicketsSortedBySelect'
import TicketsDataCard from '@/components/ticket/TicketsDataCard'

const Tickets = ({searchParams}: Search) => {
  const { currentUser, isClient } = useAuth()
  const [ticketData, setTicketData] = useState<Ticket[]>([])
  useEffect(() => {
    async function fetchData() {
      const userId = currentUser?.id
      if(!userId ) { return } 
      try {
        let data:Ticket[] = []
        const userId = currentUser.id
        if(isClient){
          if (!searchParams.sortedBy){
            const data = await fetchTicketsDataByUser(userId, isClient)
            setTicketData(data)
          } else if(searchParams.sortedBy){
            const data = await fetchTicketsDataByTab(
              searchParams.tab,
              searchParams.sortedBy, 
              userId,
              isClient)
            setTicketData(data)
          }
        } else if(searchParams.tab === 'yours' && !searchParams.sortedBy){
          data = await fetchTicketsDataByUser(userId, isClient)
          setTicketData(data)
        } else if(searchParams.tab === 'all' && !searchParams.sortedBy){
          data = await fetchAllTicketData()
          setTicketData(data)
        } else if(searchParams.tab){
          data = await fetchTicketsDataByTab(
            searchParams.tab, 
            searchParams?.sortedBy, 
            currentUser?.id,
            isClient
          ) // Here is bug
          setTicketData(data)
        } else {
          data = await fetchTicketsDataByUser(userId, isClient)
          setTicketData(data)
        }
      }catch(error){
        console.log('Error fetching ticket data:', error)
      }
     
    }
    fetchData()
  }, [ searchParams, currentUser, isClient])

  return (
    <>
      <MainTitle title='Tickets' />
      {!isClient && <TicketsTabs searchParams={searchParams} />   }
      <div className={`p-5 bg-white ${isClient? 'rounded-md':'rounded-b-md'}`}>
        <div className='flex flex-col gap-3'>
          <div className='flex flex-row justify-between'>
            <OpenCloseDropdown />
            <TicketsSortedBySelect searchParams={searchParams} />
          </div>
          <TicketsDataCard tickets={ticketData} />
        </div>
      </div>
    </>
  )
}

export default Tickets



