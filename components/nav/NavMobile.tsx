import Link from 'next/link'
import Image from 'next/image'
import logo from '@/public/assets/smahhLogo.png'


const NavMobile = () => {
  return (
    <div className='py-1.5 flex flex-row justify-center fixed top-0 w-full bg-white'>
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
  )
}

export default NavMobile