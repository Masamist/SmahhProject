import React from 'react'
import Image from 'next/image'
import logo from '@/assets/smahhLogo.png'
import Link from 'next/link'

const NavMobile = () => {
  return (
    <div className='py-1.5 flex flex-row justify-center fixed top-0 w-full bg-white'>
      <Link href="/">
        <Image 
        src={logo}
        width={145}
        priority
        alt="Smahh Logo"
        />
      </Link>
  </div>
  )
}

export default NavMobile