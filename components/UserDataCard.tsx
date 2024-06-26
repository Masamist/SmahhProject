import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { User } from '@/interface/users'

interface Props {
  users: User[]
  setUserId: React.Dispatch<React.SetStateAction<string | undefined>>
  page: string
}
const StaffDataCard = ({users, setUserId, page }: Props) => {
  const handleUserSelect = (userId: string) => {
    setUserId(userId)
  }
  return (
    <div className='flex flex-col gap-3 shadow-md'>
      {users? users.map((user) => {
        return(
          <Card 
            key={user.id}
            className='hover:bg-gray-100'
            onClick={() => handleUserSelect(user.id)}
          >
            <CardContent>
              <div className='w-full text-lg font-semibold pt-3 pb-2'>
                {user.name} {user.surname}
              </div>
              {page==='CLIENT'?
                (
                  <div className='flex flex-col lg:flex-row w-full'>
                    <p className='w-full lg:w-1/2 text-sm'>{user.company}</p>
                    <p className='w-full lg:w-1/2 text-sm'>{user.email}</p>
                  </div>
                ):(
                  <div className='flex flex-col lg:flex-row w-full'>
                    <p className='w-full lg:w-1/2 text-sm'>{user.email}</p>
                    <p className='w-full lg:w-1/2 text-sm'>{user.mobile}</p>
                  </div>
                )
              }
            </CardContent>
          </Card>
        )})
        : null
      }
    </div>
  )
}

export default StaffDataCard