import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/contexts/authContext'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { CircleUserRound, MoreHorizontal, Settings } from 'lucide-react'
import logo from '@/assets/smahhLogo.png'
import { SidebarButton } from './SidebarButton'
import LogoutButton from './LogoutButton'

const NavUserinfoDesktop = () => {
  const { currentUser } = useAuth()
  return (
    <div 
      className='flex flex-row px-3 pt-2 w-full fixed top-0 left-0 h-12
        justify-between items-center bg-white'>
      <div>
        <Link href="/">
          <Image 
          src={logo}
          width={180}
          height={15}
          priority
          alt="Smahh Logo"
          />
        </Link>
      </div>
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='ghost'>
              <div className='flex justify-between items-center'>
                <div className='flex gap-2'>
                  {/* <Avatar className='h-10 w-8'>
                    <AvatarImage src='https://avatar.iran.liara.run/public/75' />
                    <AvatarFallback>Masami Stonebridge</AvatarFallback>
                  </Avatar> */}
                  <CircleUserRound className='w-7 h-7 font-thin text-gray-700' />
                  <span className='pt-1 pr-2'>
                    {currentUser? currentUser.name + ' ' + currentUser.surname : null}
                  </span>
                </div>
                <MoreHorizontal size={20} />             
              </div>
            </Button>
          </PopoverTrigger>

          <PopoverContent className='mb-2 w-56 p-3 rounded-[.5rem] bg-sky-950'>
            <div className='space-y-1'>
              <Link href="/">
                <SidebarButton size='sm' icon={Settings} className="w-full">
                  Account Settings
                </SidebarButton>
              </Link>
              <LogoutButton />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default NavUserinfoDesktop