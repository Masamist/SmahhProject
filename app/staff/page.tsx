import Link from 'next/link'
import React from 'react'
import { collection, getDocs } from "firebase/firestore"
import { db } from '@/firebaseConfig'
import MainTitle from '@/components/MainTitle'
import FormDialog from '@/components/FormDialog'

const Staff = async() => {
  

  return (
    <main className='container max-w-screen-lg'>
      <MainTitle title='Smahh Staff' />
      <Link href='/staff/create/'>Create New Staff</Link>
      <FormDialog formType={'createUser'} />
    </main>
  )
}

export default Staff