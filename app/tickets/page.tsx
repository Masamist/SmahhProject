import Searchbar from '@/components/Searchbar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import React from 'react'

interface CategoryProps{
  searchParams: {
    tab?: string
    title?: string
  }
}

const Tickets = ({searchParams}: CategoryProps) => {

  let currentTab = searchParams.tab ?? 'yours'
  const title = searchParams.title
  if(currentTab !== 'anassigned' && currentTab !== 'all' ){
    currentTab = 'yours'
  }

  return (
    <div className='container max-w-screen-lg mt5'>
      <h1 className='text-3xl'>Tickets List</h1>
      <Searchbar />
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
    </div>
  )
}

export default Tickets