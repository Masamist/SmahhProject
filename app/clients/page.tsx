'use client'
import React from 'react'
import MainTitle from '@/components/MainTitle'
import UserData from '@/components/UserData'

const Client = () => {
  return (
    <main className='container max-w-screen-lg'>
      <MainTitle title='Clients' />
      <UserData page={'CLIENT'} />
    </main>
  )
}

export default Client