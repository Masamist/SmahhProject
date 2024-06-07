import React, {  } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { User } from '@/interface/users'

interface Props {
  users: User[]
  setUserId: React.Dispatch<React.SetStateAction<string | undefined>>
}
const StaffDataCard = ({users, setUserId }: Props) => {
  const handleUserSelect = (userId: string) => {
    setUserId(userId)
  }
  return (
    <div className='flex flex-col gap-3 shadow-md'>
      {users? users.map((user) => {
        return(
          <Card key={user.id} onClick={() => handleUserSelect(user.id)}>
            <CardContent>
              <div className='w-full text-xl font-semibold pt-4 pb-2'>
                {user.name} {user.surname}
              </div>
              <div className='flex flex-col lg:flex-row w-full'>
                <p className='w-full lg:w-1/2 text-sm'>{user.email}</p>
                <p className='w-full lg:w-1/2 text-sm'>{user.mobile}</p>
              </div>
            </CardContent>
          </Card>
        )})
        : null
      }
    </div>
  )
}

export default StaffDataCard