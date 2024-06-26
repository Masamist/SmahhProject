import React from 'react'
import Link from 'next/link'
import Searchbar from '@/components/Searchbar'
import TicketFormDialog from '@/components/ticket/TicketFormDialog'
import { ChevronRight } from 'lucide-react'
import TicketUnassignedBadge from '@/components/ticket/TicketUnassignedBadge'

interface Prop{
  title: string|undefined
  ticketTitle?: string|undefined
  assigned?: boolean
}

const MainTitle = ({title, ticketTitle, assigned}: Prop) => {
  return (
    <div className='flex flex-row justify-between w-full pb-5'>
      <div>
        {ticketTitle? 
          <>
            <div className='pt-2 pb-5'>
              <Link href={`/tickets/`} className='text-xl'>
                {title}
                <ChevronRight className='inline w-5 h-5' />
              </Link>
            </div>
            <div className='flex flex-row items-center'>
              <h1 className='text-4xl text-customGray pr-1 pb-2'>{ticketTitle? ticketTitle:null}</h1>
                {!assigned ? <TicketUnassignedBadge /> : null}
            </div>
            
            
          </> : 
          <h1 className='text-4xl text-customGray'>{title? title:null}</h1>
        }
        
      </div>
      <div className='flex flex-row gap-2'>
        <div>
          <Searchbar />
        </div>
        <div>
          <TicketFormDialog formType={'createTicket'} />
        </div>
      </div>
      
    </div>
  )
}

export default MainTitle