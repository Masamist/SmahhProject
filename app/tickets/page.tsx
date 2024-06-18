'use client'
import React, { useEffect, useState } from 'react'
import { Search } from '@/interface/search'
import {  fetchAllTicketData, fetchTicketsDataByTab, fetchTicketsDataByUser } from '@/actions/ticket-actions'
import { Ticket } from '@/interface/ticket'
import { useAuth } from '@/contexts/authContext'
import MainTitle from '@/components/MainTitle'
import TicketTabs from './TicketTabs'
import OpenCloseDropdown from './OpenCloseDropdown'
import { SortedBySelect } from './SortedBySelect'
import DataCard from './DataCard'

const Tickets = ({searchParams}: Search) => {
  const { currentUser } = useAuth()
  // This parts should be sorted in the database to store the uid for user auth within  User correction 
  console.log(`currentUser ID is ${currentUser?.id} and ${currentUser?.uid}`)
  const [ticketData, setTicketData] = useState<Ticket[]>([])
  useEffect(() => {
    async function fetchData() {
      // auth id bug!!!!!
      // if(searchParams.tab === 'yours' && !searchParams.sortedBy){
      //   const data = await fetchTicketsDataByUser(currentUser?.uid)
      //   console.log(currentUser?.uid)
      //   setTicketData(data)
      //   console.log('Fetched data A')
      // }
      // else 
      if(searchParams.tab === 'all' && !searchParams.sortedBy){
        const data = await fetchAllTicketData()
        setTicketData(data)
        console.log('Fetched data B')
      }
      else if(searchParams.tab){
        const data = await fetchTicketsDataByTab(
          searchParams.tab, 
          searchParams?.sortedBy, 
          currentUser?.id) // Here is bug
        setTicketData(data)
        console.log(currentUser?.id)
        console.log('Fetched data C')
      } else {
        const data = await fetchAllTicketData()
        setTicketData(data)
        console.log('Fetched data A')
      }
    }
    fetchData()
  }, [ searchParams.tab, searchParams.sortedBy, currentUser?.uid])

  return (
    <main className='container max-w-screen-lg'>
      <MainTitle title='Tickets' />
      <TicketTabs searchParams={searchParams} />    
      <div className='p-5 bg-white rounded-b-md'>
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