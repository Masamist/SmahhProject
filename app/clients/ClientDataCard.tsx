import React from 'react'
import Link from 'next/link'
import {
  Card,
  CardContent
} from "@/components/ui/card"
import { User } from '@/interface/users'

interface Props {
  users: User[]
}

const ClientDataCard = ({users}: Props) => {
  return (
    <div className='flex flex-col gap-3 shadow-md'>
      {users? users.map((user) => {
        return(
        <>
          <Link href={`/clients/${user.id}`}>
            <Card key={user.id}>
              <CardContent>
                <div className='w-full text-xl font-semibold pt-4 pb-2'>
                  {user.name} {user.surname}
                </div>
                <div className='flex flex-row'>
                  <p className='w-1/3 text-sm'>{user.company}</p>
                  <p className='w-1/3 text-sm'>{user.email}</p>
                  <p className='w-1/3 text-sm'>{user.mobile}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </>
      )}): null}
    </div>
  )
}

export default ClientDataCard