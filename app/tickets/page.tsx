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
import { fetchSingleUserData, fetchSingleUserId } from '@/actions/user-action'

const Tickets = ({searchParams}: Search) => {
  const { currentUser } = useAuth()
  const [ currentUserId, setCurrentUserId ] = useState<string>('')
  // This parts should be sorted in the database to store the uid for user auth within  User correction 
  useState(() => {
    async function fetchUserId() {
      if(currentUser){
        const userId = await fetchSingleUserId(currentUser.id)
        if(userId){
          setCurrentUserId(userId)
          console.log(currentUserId)
        }
      }
      ///////////////////have to fix here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    }
    fetchUserId()
  }, )
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
        const data = await fetchTicketsDataByUser(currentUserId)
        setTicketData(data)
      }
    }
    fetchData()
  }, [ searchParams.tab, searchParams.sortedBy, currentUserId])

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