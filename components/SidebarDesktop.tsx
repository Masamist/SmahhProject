"use client"

import { SidebarButton } from './SidebarButton'
import { SidebarItems } from '@/types'
import Link from 'next/link'
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { LogOut, MoreHorizontal, Settings } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Separator } from './ui/separator'

interface SidebarDesktopProps {
  sidebarItems: SidebarItems
}

const SidebarDesktop = (props: SidebarDesktopProps) => {
  const pathname = usePathname()
  return (
    <aside className='w-[250px] max-w-xs h-screen fixed left-0 top-14 z-40 border-r bg-sky-950' >
      <div className='h-full px-3'>
        <div className='mt-5'>
          <div className='flex flex-col gap-1 w-full'>
            {props.sidebarItems.links.map((link, index) => (
              <Link key={index} href={link.href}>
                <SidebarButton
                  variant={pathname=== link.href ? 'default': 'ghost'}
                  icon={link.icon}>
                  {link.label}
                </SidebarButton>
              </Link>
            ))}
            {props.sidebarItems.extras}
          </div>
          <div className='absolute left-0 bottom-12 w-full px-3'>
            <Separator className='absolute -top-3 left-0 w-full'  />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant='ghost' className='w-full justify-start'>
                  <div className='flex justify-between items-center w-full'>
                    <div className='flex gap-2'>
                      <Avatar className='h-5 w-5'>
                        <AvatarImage src='https://avatar.iran.liara.run/public/75' />
                        <AvatarFallback>Masami Stonebridge</AvatarFallback>
                      </Avatar>
                      <span>Masami Stonebridge</span>
                    </div>
                    <MoreHorizontal size={20} />             
                  </div>
                </Button>
              </PopoverTrigger>

              <PopoverContent className='mb-2 w-56 p-3 rounded-[1rem]'>
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

      </div>
    </aside>
  )
}

export default SidebarDesktop