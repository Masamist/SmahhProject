import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface CategoryProps{
  searchParams: {
    tab?: string
    title?: string
  }
}

const TicketTubs = ({searchParams}: CategoryProps) => {
  let currentTab = searchParams.tab ?? 'yours'
  const title = searchParams.title
  if(currentTab !== 'anassigned' && currentTab !== 'all' ){
    currentTab = 'yours'
  }

  return (
    <Tabs defaultValue={currentTab}>
        <TabsList className='w-full'>
          <TabsTrigger value='your' className='w-full' asChild>
            <Link href={{ query: { ...searchParams, tab: 'yours'} }}>Your Tickets</Link>
          </TabsTrigger>
          <TabsTrigger value='unassigned' className='w-full' asChild>
            <Link href={{ query: { ...searchParams, tab: 'unassigned'} }}>Unassigned</Link>
          </TabsTrigger>
          <TabsTrigger value='all' className='w-full' asChild>
            <Link href={{ query: { ...searchParams, tab: 'all'} }}>All</Link>
          </TabsTrigger>    
        </TabsList>
        <TabsContent value='yours'>
          <h2 className='test-center text-2xl font-semibold mt-10'>Your {title}</h2>
        </TabsContent>
        <TabsContent value='unassigned'>
          <h2 className='test-center text-2xl font-semibold mt-10'>Unassigned Tickets{title}</h2>
        </TabsContent>
        <TabsContent value='all'>
          <h2 className='test-center text-2xl font-semibold mt-10'>All Tickets {title}</h2>
        </TabsContent>
      </Tabs>
  )
}

export default TicketTubs