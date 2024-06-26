'use client'
import React, { useEffect } from 'react'
import { useAuth } from '@/contexts/authContext'
import MainTitle from '@/components/MainTitle'
import UserData from '@/components/UserData'
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
    <main className='container max-w-screen-lg'>
      <MainTitle title='Clients' />
      <UserData page={'CLIENT'} />
    </main>
  )
}

export default Clients