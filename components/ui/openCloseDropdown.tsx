'use Client'
import React, { useState } from 'react'
import style from '@/components/ui/openCloseDropdown.module.css'
import { ChevronDown } from 'lucide-react'

const OpenCloseDropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  return (
    <>
      <div className={style.dropdown}>
        <h2 className='text-[1.4rem] text-midnight-300 font-medium'>
          {isOpen? 'Open Tickets' : 'Close Tickets'}
          <ChevronDown className='inline ml-2' />
        </h2>
        <div className={style.dropdownContent}>
        <button onClick={() => setIsOpen(isOpen? false:true)}>{isOpen? 'Close Tickets' : 'Open Tickets'}</button>
        </div>
      </div>
    </>
  )
}

export default OpenCloseDropdown