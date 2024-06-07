'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { db } from '@/firebaseConfig'
import { getDocs, collection, query, where } from 'firebase/firestore'
import { User } from '@/interface/users'
import MainTitle from '@/components/MainTitle'
import FormDialog from '@/components/FormDialog'
import ClientDataCard from './ClientDataCard'

const CreateClient = () => {
async function fetchDataFromFirestore(): Promise<User[]>{
    const q = query(collection(db, "users"), where("role", "==", "CLIENT"))
    const querySnapshot = await getDocs(q)
  
    const users: User[] = []
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...(doc.data() as Omit<User, 'id'>) })
    })
    return users
  }

  const [userData, setUserData] = useState<User[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFirestore()
      setUserData(data)
    }
    fetchData()
  }, [])

  return (
    <main className='container max-w-screen-lg'>
      <MainTitle title='Clients' />   
        <div className='p-5 bg-white rounded-md'>
          <div className='flex  pb-2 justify-end'>
            <FormDialog formType={'createUser'} />
          </div>
          
          <ClientDataCard users={userData} />
        </div>
    </main>
  )
}

export default CreateClient