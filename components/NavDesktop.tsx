import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { LogOut, MoreHorizontal, Settings } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/assets/smahhLogo.png'
import { SidebarButton } from './SidebarButton'

const NavUserinfoDesktop = () => {
  return (
    <div 
      className='flex flex-row px-3 pt-2 w-full fixed top-0 left-0 h-12
        justify-between items-center bg-white'>
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
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='ghost'>
              <div className='flex justify-between items-center'>
                <div className='flex gap-2'>
                  <Avatar className='h-8 w-8'>
                    <AvatarImage src='https://avatar.iran.liara.run/public/75' />
                    <AvatarFallback>Masami Stonebridge</AvatarFallback>
                  </Avatar>
                  <span className='pt-1.5 pr-2'>Masami Stonebridge</span>
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
              <SidebarButton size='sm' icon={LogOut} className="w-full">
                Log Out
              </SidebarButton>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default NavUserinfoDesktop