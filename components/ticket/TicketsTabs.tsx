import Link from 'next/link'
import { Search } from '@/interface/search'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const TicketsTubs = ({searchParams}: Search) => {

  let currentTab = searchParams.tab ?? 'yours'
  if(currentTab !== 'unassigned' && currentTab !== 'all' ){
    currentTab = 'yours'
  }

  return (
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
      </Tabs>
  )
}

export default TicketsTubs