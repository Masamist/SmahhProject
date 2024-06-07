'use client'
import React from 'react'
import MainTitle from '@/components/MainTitle'
import UserData from '@/components/UserData'

const Staff = () => {
  return (
    <main className='container max-w-screen-lg'>
      <MainTitle title='Smahh Staff' />
      <UserData page={'STAFF'} />
    </main>
  )
}

export default Staff