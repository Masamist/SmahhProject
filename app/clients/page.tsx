'use client'
import React, { useEffect } from 'react'
import { useAuth } from '@/contexts/authContext'
import MainTitle from '@/components/MainTitle'
import UserData from '@/components/user/UserData'
import { useRouter } from 'next/navigation'

const Clients = () => {
  const { currentUser } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if(currentUser){ currentUser.role==="CLIENT" && router.push('/')}
  }, [currentUser, router])

  if (!currentUser || currentUser.role === "CLIENT") {
    // If the user is being redirected, we can return null or a loader
    return null
  }

  return (
    <>
      <MainTitle title='Clients' />
      <UserData page={'CLIENT'} />
    </>
  )
}

export default Clients