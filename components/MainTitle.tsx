import React from 'react'
import Link from 'next/link'
import Searchbar from '@/components/Searchbar'
import FormDialog from '@/components/FormDialog'
import { ChevronRight } from 'lucide-react'


interface Prop{
  title: string|undefined
  ticketTitle: string|undefined
}

const MainTitle = ({title, ticketTitle}: Prop) => {
  return (
    <div className='flex flex-row justify-between w-full pb-5'>
      <div>
        {ticketTitle? 
          <>
            <div className='pt-2 pb-5'>
              <Link href={`/tickets/`} className='text-xl'>
              Tickets 
              <ChevronRight className='inline w-5 h-5' />
            </Link>
            </div>
            
            <h1 className='text-4xl text-customGray'>{ticketTitle? ticketTitle:null}</h1>
          </> : 
          <h1 className='text-4xl text-customGray'>{title? title:null}</h1>
        }
        
      </div>
      <div className='flex flex-row gap-2'>
        <div>
          <Searchbar />
        </div>
        <div>
          <FormDialog formType={'createTicket'} />
        </div>
      </div>
      
    </div>
  )
}

export default MainTitle