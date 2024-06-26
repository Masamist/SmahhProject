import React from 'react'
import { User } from '@/interface/users'
import FormDialog from '@/components/ticket/TicketFormDialog'
import {
  Card,
  CardContent
} from "@/components/ui/card"

interface Props {
  user: User | undefined
  page: string
}

const SingleUserDetailCard = ({user, page}: Props) => {
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
                { page === 'CLIENT'? 
                  (
                    <div>
                      <h5 className='text-sm text-gray-400'>Company</h5>
                      <p className='text-sm'>{user.company}</p>
                    </div>
                  ) : null
                }
                <div>
                  <h5 className='text-sm text-gray-400'>Job Title</h5>
                  <p className='text-sm'>{user.jobTitle}</p>
                </div>
              </div>
              <div className='flex w-full justify-end'>
                <FormDialog formType={'editUser'} user={user} />
              </div>
            </CardContent>
          </Card>
        ) : null
      }
    </div>
  )
}

export default SingleUserDetailCard