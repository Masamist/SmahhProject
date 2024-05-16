'use client'

import { SidebarItems } from '@/types'
import React from 'react'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import { LogOut, Menu, MoreHorizontal, Settings, X } from 'lucide-react'
import Link from 'next/link'
import { SidebarButtonSheet as SidebarButton } from './SidebarButton'
import { usePathname } from 'next/navigation'
import { Separator } from './ui/separator'
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import { AvatarImage } from './ui/avatar'

interface SidebarDesktopProps {
  sidebarItems: SidebarItems
}

const SidebarMobile = (props: SidebarDesktopProps) => {
  const pathname = usePathname()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size='icon' variant='ghost' className='fixed top-.9 left-3'>
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='px-3 py-4' hideClose>
        <SheetHeader className='flex flex-row justify-between items-center space-y-0'>
          <SheetClose asChild>
            <Button className='h-7 w-7 p-0' variant='ghost'>
              <X size={15} />
            </Button>
          </SheetClose>
        </SheetHeader>
        <div className='h-full'>
          <div className='mt-5 flex flex-col w-full gap-1'>
            {props.sidebarItems.links.map((link, idx) => (
              <Link key={idx} href={link.href}>
                <SidebarButton
                    variant={pathname=== link.href ? 'secondary': 'ghost'}
                    icon={link.icon}>
                    {link.label}
                  </SidebarButton>
                </Link>
            ))}
            {props.sidebarItems.extras}
          </div>
          <div className='absolute w-full bottom-4 px-1 left-0'>
            <Separator className='absolute -top-3 left-0 w-full'/>
            <Drawer>
              <DrawerTrigger asChild>
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
              </DrawerTrigger>

              <DrawerContent className='mb-2 p-2'>
                <div className='flex flex-col space-y-2 mt-2'>
                  <Link href="/">
                    <SidebarButton size='sm' icon={Settings} className="w-full">
                      Account Settings
                    </SidebarButton>
                  </Link>
                  <SidebarButton size='sm' icon={LogOut} className="w-full">
                    Log Out
                  </SidebarButton>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default SidebarMobile