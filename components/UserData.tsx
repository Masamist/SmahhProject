'use client'
import React, { useEffect, useState } from 'react'
import { db } from '@/firebase/config'
import { getDocs, collection, query, where } from 'firebase/firestore'
import { User } from '@/interface/users'
import FormDialog from '@/components/FormDialog'
import UserDetailCard from '@/components/UserDetailCard'
import UserDataCard from '@/components/UserDataCard'

interface PageProp{
  page: string
}

const UserData = ({page}:PageProp) => {
  const [userData, setUserData] = useState<User[]>([])
  const [userId, setUserId] = useState<string | undefined>(undefined)
  const [singleUserData, setSingleUserData] = useState<User | undefined>(undefined)

  async function fetchDataFromFirestore(): Promise<User[]>{
    let q
    let querySnapshot
    if(page==='STAFF'){
      q = query(collection(db, "users"), where("role", "==", "AGENT"))
    }else{
      q = query(collection(db, "users"), where("role", "==", "CLIENT"))
    }
    querySnapshot = await getDocs(q)
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
  },[])

  useEffect(() => {
    if (userId) {
      const singleUser = userData.find((user) => user.id === userId)
      setSingleUserData(singleUser)
    }
  }, [userId, userData])

  return (
    <div className='p-5 bg-white rounded-md'>
      <div className='flex  pb-2 justify-end'>
        <FormDialog formType={'createUser'} />
      </div>
      <div className='flex flex-row gap-3'>
        <div className='w-3/5'>
          <UserDataCard users={userData} setUserId={setUserId} page={page} />
        </div>
        <div className='w-2/5'>
          <UserDetailCard user={singleUserData} page={page} />
        </div>
      </div> 
    </div>
  )
}

export default UserData