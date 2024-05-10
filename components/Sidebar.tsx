'use client'

import { SidebarItems } from '@/types'
import SidebarDesktop from './SidebarDesktop'
import { BookUser, LayoutDashboard,MoreHorizontal, Settings, Ticket, UserRound, UsersRound } from 'lucide-react'
import { SidebarButton } from './SidebarButton'
import { useMediaQuery } from 'usehooks-ts'
import SidebarMobile from './SidebarMobile'

const sidebarItems:SidebarItems = {
  links: [
    {label:'Dashboard', href:'/', icon: LayoutDashboard },
    {label:'Ticket', href:'/tickets', icon: Ticket },
    {label:'Client', href:'/user', icon: BookUser },
    {label:'Staff', href:'/user', icon: UsersRound },
    {label:'Profile', href:'/item/profile', icon: UserRound },
    {label:'Settings', href:'/Settings', icon: Settings },
  ],
  extras: (
    <div className='flex flex-col gap-2'>
      <SidebarButton icon={MoreHorizontal} className='w-full'>
        More
      </SidebarButton>
    </div>
  )
}

const Sidebar = () => {
  const isDesktop = useMediaQuery('(min-width: 640px)', {
    initializeWithValue: false,
  })

  if (isDesktop) {
    return <SidebarDesktop sidebarItems={sidebarItems}  />
  }

  return <SidebarMobile sidebarItems={sidebarItems} />
}

export default Sidebar