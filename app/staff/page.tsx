'use client'
import React, { useEffect, useState, createContext, useContext } from 'react'
import { db } from '@/firebaseConfig'
import { getDocs, collection, query, where } from 'firebase/firestore'
import { User } from '@/interface/users'
import MainTitle from '@/components/MainTitle'
import FormDialog from '@/components/FormDialog'
import StaffDataCard from './StaffDataCard'
import SingleUserDetailCard from './SingleUserDetailCard'

interface UserContextProps {
  userId: string | undefined;
  setUserId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined)

const Staff = () => {
  const [userData, setUserData] = useState<User[]>([])
  const [userId, setUserId] = useState<string | undefined>(undefined)
  const [singleUserData, setSingleUserData] = useState<User | undefined>(undefined)

  async function fetchDataFromFirestore(): Promise<User[]>{
    const q = query(collection(db, "users"), where("role", "==", "AGENT"))
    const querySnapshot = await getDocs(q)
  
    const users: User[] = []
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...(doc.data() as Omit<User, 'id'>) })
    })
    return users
  }
  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFirestore()
      setUserData(data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (userId) {
      const singleUser = userData.find((user) => user.id === userId)
      setSingleUserData(singleUser)
    }
  }, [userId, userData])

  return (
    <main className='container max-w-screen-lg'>
      <MainTitle title='Smahh Staff' />
          <div className='p-5 bg-white rounded-md'>
            <div className='flex  pb-2 justify-end'>
              <FormDialog formType={'createUser'} />
            </div>
            <div className='flex flex-row gap-3'>
              <div className='w-3/5'>
                <StaffDataCard users={userData} setUserId={setUserId} />
              </div>
              <div className='w-2/5 h-10'>
                <SingleUserDetailCard user={singleUserData} />
              </div>
            </div> 
          </div>
    </main>
  )
}

export default Staff