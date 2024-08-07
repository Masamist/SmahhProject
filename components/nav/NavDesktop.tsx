import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/contexts/authContext'
// UI components
import logo from '@/assets/smahh-logo.png'
import { Button } from '@/components/ui/button'
import { SidebarButton } from '@/components/nav/SidebarButton'
import LogoutButton from '@/components/LogoutButton'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
//import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { CircleUserRound, MoreHorizontal, Settings } from 'lucide-react'

const NavUserinfoDesktop = () => {
  const { currentUser } = useAuth()
  return (
    <div 
      className='flex flex-row px-3 pt-2 w-full fixed top-0 left-0 h-12
        justify-between items-center bg-white'>
      <div className='w-52 pl-3'>
        <Link href="/">
          <Image 
          src={logo}
          width="150"
          height="10"
          priority
          alt="Smahh Logo"
          style={{ width: '100%', height: 'auto' }}
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
                  <CircleUserRound className='text-gray-700' />
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