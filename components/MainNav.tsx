import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import logo from '@/assets/smahhLogo.png'

const MainNav = () => {
  return (
    <div className='flex flex-row justify-between items-center'>
      <div>
        <Link href="/">
          <Image 
          src={logo}
          width={260}
          priority
          alt="Smahh Logo"
          />
        </Link>
      </div>
      <div className='pb-2'>
        <Link href="/tickets">Tickets</Link>
        <Link href="/users">Masami Stonebridge</Link>
      </div>
      
    </div>
  )
}

export default MainNav