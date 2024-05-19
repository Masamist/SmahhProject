import React from 'react'
import Searchbar from '@/components/Searchbar'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import FormDialog from './FormDialog'

const MainTitle = () => {
  return (
    <div className='flex flex-row justify-between w-full pb-5'>
      <div>
        <h1 className='text-4xl'>Tickets</h1>
      </div>
      <div className='flex flex-row gap-2'>
        <div>
          <Searchbar />
        </div>
        <div>
          {/* <Link href='/tickets/create' className={buttonVariants({variant: 'default'})}>Create Ticket</Link> */}
          <FormDialog type={'create'} />
        </div>
      </div>
      
    </div>
  )
}

export default MainTitle