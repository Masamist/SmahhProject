import Link from 'next/link'
import Image from 'next/image'
import logo from '@/assets/smahh-logo.png'


const NavMobile = () => {
  return (
    <div className='py-1.5 flex flex-row justify-center fixed top-0 w-full bg-white'>
      <div className='w-40 pl-5 py-1'>
        <Link href="/">
          <Image 
          src={logo}
          width="145"
          height="10"
          priority
          alt="Smahh Logo"
          style={{ width: '100%', height: 'auto' }}
          />
      </Link>
      </div>
      
  </div>
  )
}

export default NavMobile