import Link from 'next/link'
import React from 'react'

const MainNav = () => {
  return (
    <div className='flex flex-row w-full h-5'>
      <Link href="/">Dashboard</Link>
      <Link href="/tickets">Tickets</Link>
      <Link href="/users">Users</Link>
    </div>
  )
}

export default MainNav