'use client'
import React, {useState, useEffect} from 'react'
import { SidebarItems } from '@/interface/sidebarItems'
import SidebarDesktop from './SidebarDesktop'
import { BookUser, LayoutDashboard,MoreHorizontal, Settings, Ticket, UserRound, UsersRound } from 'lucide-react'
import { SidebarButton } from './SidebarButton'
import { useMediaQuery } from 'usehooks-ts'
import SidebarMobile from './SidebarMobile'
import { useAuth } from '@/contexts/authContext'

const extrasItam = 
  (
    <div className='flex flex-col gap-2'>
      <SidebarButton icon={MoreHorizontal} className='w-full'>
        More
      </SidebarButton>
    </div>
  )

const agentSidebarItems:SidebarItems = {
  links: [
    {label:'Dashboard', href:'/', icon: LayoutDashboard },
    {label:'Tickets', href:'/tickets', icon: Ticket },
    {label:'Clients', href:'/clients', icon: BookUser },
    {label:'Agents', href:'/agents', icon: UsersRound },
    {label:'Profile', href:'/profile', icon: UserRound },
    {label:'Settings', href:'/Settings', icon: Settings },
  ],
  extras: extrasItam
}

const clientSidebarItems:SidebarItems = {
  links: [
    {label:'Dashboard', href:'/', icon: LayoutDashboard },
    {label:'Tickets', href:'/tickets', icon: Ticket },
    {label:'Agents', href:'/agents', icon: UsersRound },
    {label:'Profile', href:'/profile', icon: UserRound },
    {label:'Settings', href:'/Settings', icon: Settings },
  ],
  extras: extrasItam
}

const Sidebar = () => {
  const { currentUser } = useAuth()
  const [ isClient, setIsClient ] = useState(true)

  useEffect(() => {
    if(currentUser){
      setIsClient(currentUser.role==="CLIENT")
    }
  },[currentUser])

  
  const isDesktop = useMediaQuery('(min-width: 768px)', {
    initializeWithValue: false,
  })

  if (isDesktop) {
    return <SidebarDesktop sidebarItems={isClient? clientSidebarItems : agentSidebarItems}  />
  }
  if (!isDesktop){
    return <SidebarMobile sidebarItems={isClient? clientSidebarItems : agentSidebarItems} />
  }
}

export default Sidebar