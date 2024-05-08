'use client'

import { SidebarItems } from '@/types'
import SidebarDesktop from './SidebarDesktop'
import { Bell, Bookmark, Home, List, Mail, MoreHorizontal, User, Users } from 'lucide-react'
import SidebarButton from './SidebarButton'

const sidebarItems:SidebarItems = {
  links: [
    {label:'Home', href:'/', icon: Home },
    {label:'Notifications', href:'/item/notifications', icon: Bell },
    {label:'Messages', href:'/item/messages', icon: Mail },
    {label:'Lists', href:'/item/Lists', icon: List },
    {label:'Bookmarks', href:'/item/bookmarks', icon: Bookmark },
    {label:'Communities', href:'/item/communties', icon: Users },
    {label:'profile', href:'/item/profile', icon: User },
  ],
  extras: (
    <div className='flex flex-col gap-2'>
      <SidebarButton icon={MoreHorizontal} className='w-full'>
        More
      </SidebarButton>
      <SidebarButton className='w-full justify-center' variant='default'>
        Tweet
      </SidebarButton>
    </div>
  )
}

const Sidebar = () => {
  return (
    <SidebarDesktop sidebarItems={sidebarItems}  />
  )
}

export default Sidebar