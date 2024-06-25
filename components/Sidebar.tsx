'use client'
import { SidebarItems } from '@/interface/sidebarItems'
import SidebarDesktop from './SidebarDesktop'
import { BookUser, LayoutDashboard,MoreHorizontal, Settings, Ticket, UserRound, UsersRound } from 'lucide-react'
import { SidebarButton } from './SidebarButton'
import { useMediaQuery } from 'usehooks-ts'
import SidebarMobile from './SidebarMobile'

const sidebarItems:SidebarItems = {
  links: [
    {label:'Dashboard', href:'/', icon: LayoutDashboard },
    {label:'Tickets', href:'/tickets', icon: Ticket },
    {label:'Clients', href:'/clients', icon: BookUser },
    {label:'Agents', href:'/agents', icon: UsersRound },
    {label:'Profile', href:'/profile', icon: UserRound },
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
  const isDesktop = useMediaQuery('(min-width: 768px)', {
    initializeWithValue: false,
  })

  if (isDesktop) {
    return <SidebarDesktop sidebarItems={sidebarItems}  />
  }
  return <SidebarMobile sidebarItems={sidebarItems} />
}

export default Sidebar