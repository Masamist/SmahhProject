'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { fetchAllTicketData } from '@/actions/ticket-actions'
import { Ticket } from '@/interface/ticket'
import MainTitle from '@/components/MainTitle'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import OpenCloseDropdown from './OpenCloseDropdown'
import { SortedBySelect } from './SortedBySelect'
import DataCard from './DataCard'

interface CategoryProps{
  searchParams: {
    tab?: string
    title?: string
  }
}

// export interface SearchParams {
//   status: Status
//   page: string
//   orderBy: keyof Ticket 
// }

const Tickets = ({searchParams}: CategoryProps) => {  

  const [ticketData, setTicketData] = useState<Ticket[]>([])

  useEffect(() => {
    async function fetchData() {
      const data = await fetchAllTicketData()
      setTicketData(data)
    }
    fetchData()
  }, [])

  
  let currentTab = searchParams.tab ?? 'yours'
  const title = searchParams.title
  if(currentTab !== 'anassigned' && currentTab !== 'all' ){
    currentTab = 'yours'
  }

  return (
    <main className='container max-w-screen-lg'>
      <MainTitle title='Tickets' />
      <Tabs defaultValue={currentTab}>
        <TabsList className='w-full'>
          <TabsTrigger value='yours' className='w-full' asChild>
            <Link href={{ query: { ...searchParams, tab: 'yours'} }}>Your Tickets</Link>
          </TabsTrigger>
          <TabsTrigger value='unassigned' className='w-full' asChild>
            <Link href={{ query: { ...searchParams, tab: 'unassigned'} }}>Unassigned</Link>
          </TabsTrigger>
          <TabsTrigger value='all' className='w-full' asChild>
            <Link href={{ query: { ...searchParams, tab: 'all'} }}>All</Link>
          </TabsTrigger>    
        </TabsList>
        <TabsContent value='gallery'>
          <h2 className='test-center text-2xl font-semibold mt-10'>Your {title}</h2>
        </TabsContent>
        <TabsContent value='unassigned'>
          <h2 className='test-center text-2xl font-semibold mt-10'>Unassigned Tickets{title}</h2>
        </TabsContent>
        <TabsContent value='all'>
          <h2 className='test-center text-2xl font-semibold mt-10'>All Tickets {title}</h2>
        </TabsContent>
      </Tabs>
      
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