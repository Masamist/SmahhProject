import React from 'react'
import {
  Card,
  CardContent
} from "@/components/ui/card"
import { User } from '@/interface/users'


interface Props {
  user: User | undefined
}

const SingleUserDetailCard = ({user}: Props) => {
  return (
    <div className='shadow-md'>
      {user?(
          <Card key={user.id}>
            <CardContent>
              <div className='flex flex-col space-y-5'>
                <div className='w-full text-xl font-semibold pt-5'>
                  {user.name} {user.surname}
                </div>
                <div>
                  <h5 className='text-sm text-gray-400'>Email</h5>
                  <p>{user.email}</p>
                </div>
                <div>
                  <h5 className='text-sm text-gray-400'>Mobile</h5>
                  <p className='text-sm'>{user.mobile}</p>
                </div>
                <div>
                  <h5 className='text-sm text-gray-400'>Job Title</h5>
                  <p className='text-sm'>{user.jobTitle}</p>
                </div>
              </div>
             
            </CardContent>
          </Card>
        ) : null
      }
    </div>
  )
}

export default SingleUserDetailCard