'use client'
import React, { useEffect, useState } from 'react'
import { fetchUserDataByGroup } from '@/actions/user-action'
import { User } from '@/interface/users'
import { useAuth } from '@/contexts/authContext'
import FormDialog from '@/components/FormDialog'
import UserDetailCard from '@/components/user/UserDetailCard'
import UserDataCard from '@/components/user/UserDataCard'

interface PageProp{
  page: string
}

const UserData = ({page}:PageProp) => {
  const [userData, setUserData] = useState<User[]>([])
  const [userId, setUserId] = useState<string | undefined>(undefined)
  const [singleUserData, setSingleUserData] = useState<User | undefined>(undefined)
  const { isClient } = useAuth()

  useEffect(() => {
    async function fetchData() {
      const data = await fetchUserDataByGroup(page)
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
        {!isClient && <FormDialog formType={'createUser'} />}
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