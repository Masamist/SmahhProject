import React from 'react'
import Image from 'next/image'
import logo from '@/assets/smahhLogo.png'
import Link from 'next/link'

const NavMobile = () => {
  return (
    <div className='py-2 flex flex-row justify-center'>
    <div>
      <Link href="/">
        <Image 
        src={logo}
        width={180}
        priority
        alt="Smahh Logo"
        />
      </Link>
    </div>
  </div>
  )
}

export default NavMobile