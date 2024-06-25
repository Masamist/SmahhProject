'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/authContext'
import { Spinner } from '@/components/ui/Spinner'

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { userLoggedIn, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !userLoggedIn) {
      router.push('/login')
    }
  }, [loading, userLoggedIn, router]);
  console.log('User Loggedin?', userLoggedIn)
  console.log('User Loading?', loading)
  if (loading && !userLoggedIn) {
    return (
      <div>
        <p><Spinner size='large' className='text-orange-300' /> Loading Spinner...</p>
      </div>
    )
  }
  return children
}