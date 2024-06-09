import React from 'react'
import style from './openCloseDropdown.module.css'
import { ChevronDown } from 'lucide-react'


const OpenCloseDropdown = () => {
  return (
    <>
      <div className={style.dropdown}>
        <h2 className='text-2xl text-midnight-300 font-medium'>
          Open Tickets
          <ChevronDown className='inline ml-2' />
        </h2>
        <div className={style.dropdownContent}>
        <button>Open Ticket</button>
        <button>Close Ticket</button>
        </div>
      </div>
    </>
  )
}

export default OpenCloseDropdown