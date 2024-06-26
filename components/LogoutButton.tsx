import React from 'react'
import { SidebarButton } from './nav/SidebarButton'
import { doSignOut } from '@/actions/auth-actions'
import { LogOut } from 'lucide-react'

const LogoutButton = () => {

  async function GetLogOut() {
    await doSignOut()
    await fetch("/api/logout")
  }
  
  return (
    <SidebarButton 
      size='sm' 
      icon={LogOut} 
      className="w-full" 
      onClick={GetLogOut}>
      Log Out
    </SidebarButton>
  )
}

export default LogoutButton
