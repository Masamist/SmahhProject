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

  let currentTab = searchParams.tab ?? 'gallery'
  const title = searchParams.title
  if(currentTab !== 'messages' && currentTab !== 'settings' ){
    currentTab = 'gallery'
  }

  return (
    <div className='container max-w-screen-lg mt5'>
      <h2>Tickets List</h2>
      <h1>Search Params</h1>
      <Searchbar />
      <Tabs defaultValue={currentTab}>
        <TabsList className='w-full'>
          <TabsTrigger value='gallery' className='w-full' asChild>
            <Link href={{ query: { ...searchParams, tab: 'gallery'} }}>Gallery</Link>
          </TabsTrigger>
          <TabsTrigger value='messages' className='w-full' asChild>
            <Link href={{ query: { ...searchParams, tab: 'messages'} }}>Messages</Link>
          </TabsTrigger>
          <TabsTrigger value='settings' className='w-full' asChild>
            <Link href={{ query: { ...searchParams, tab: 'settings'} }}>Settings</Link>
          </TabsTrigger>    
        </TabsList>
        <TabsContent value='gallery'>
          <h2 className='test-center text-2xl font-semibold mt-10'>Gallery {title}</h2>
        </TabsContent>
        <TabsContent value='messages'>
          <h2 className='test-center text-2xl font-semibold mt-10'>Messages {title}</h2>
        </TabsContent>
        <TabsContent value='settings'>
          <h2 className='test-center text-2xl font-semibold mt-10'>Settings {title}</h2>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Tickets