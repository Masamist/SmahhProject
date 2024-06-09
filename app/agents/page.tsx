'use client'
import React from 'react'
import MainTitle from '@/components/MainTitle'
import UserData from '@/components/UserData'

const Agents = () => {
  return (
    <main className='container max-w-screen-lg'>
      <MainTitle title='Smahh Agent' />
      <UserData page={'AGENT'} />
    </main>
  )
}

export default Agents