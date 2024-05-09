'use client'

import React from 'react'
import { Input } from './ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebounceCallback } from 'usehooks-ts'

const Searchbar = () => {

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const debaunced = useDebounceCallback(handleSearchTitle, 500)
  const title = searchParams.get('title')??""

  function handleSearchTitle(value: string){
    const sp = new URLSearchParams(searchParams)
    if(value.trim()=== ""){
      sp.delete('title')
    }else{
      sp.set('title', value)
    }
    router.push(`${pathname}?${sp.toString()}`)
        // /?tab=garllery&title=value
  }

  return (
    <Input 
      placeholder='Search title here...' 
      className='my-5' 
      onChange={(e) => debaunced(e.target.value)}
      defaultValue={title}
      />
  )
}

export default Searchbar