import React from 'react'
import Searchbar from '@/components/Searchbar'
// import Link from 'next/link'
// import { buttonVariants } from '@/components/ui/button'
import FormDialog from '@/components/FormDialog'

interface Prop{
  title: string|undefined
}

const MainTitle = ({title}: Prop) => {
  return (
    <div className='flex flex-row justify-between w-full pb-5'>
      <div>
        <h1 className='text-4xl'>{title? title:null}</h1>
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