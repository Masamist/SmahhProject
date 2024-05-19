'use client'
import React, { useEffect, useState } from 'react'
import { db } from '@/firebaseConfig'
import { getDocs, collection } from 'firebase/firestore'
import { Ticket } from '@/Interface/ticket'
import Searchbar from '@/components/Searchbar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import DataTable from './DataTable'
import { buttonVariants } from '@/components/ui/button'
import MainTitle from '@/components/MainTitle'
import DataCard from './DataCard'
// export const dynamic = 'force-dynamic'

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

  
  let currentTab = searchParams.tab ?? 'yours'
  const title = searchParams.title
  if(currentTab !== 'anassigned' && currentTab !== 'all' ){
    currentTab = 'yours'
  }


  return (
    <div className='container max-w-screen-lg'>
      <MainTitle />
      
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
        <DataCard tickets={ticketData} />
      </div>
      
    </div>
  )
}

export default Tickets