import React from 'react'
import dynamic from 'next/dynamic'
import { buttonVariants } from '@/components/ui/button'
import { Pencil, UserRoundPlus } from 'lucide-react'
import { Ticket } from '@/interface/ticket'
import { User } from '@/interface/users'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

const TicketForm = dynamic(() => import("@/components/TicketForm"), {
  ssr:false,
})

const UserForm = dynamic(() => import("@/components/UserForm"), {
  ssr:false,
})


type FormSwitchType = 'createTicket' | 'editTicket' | 'createUser' | 'editUser'

interface Props{
  formType?: FormSwitchType
  ticket?: Ticket | null
  user?: User | null
}

const FormDialog = ({formType, ticket, user}: Props) => {
  const formSwitch = (type: FormSwitchType): JSX.Element | string => {
    switch(type){
      case 'createTicket':
        return (
          <>
            <DialogTrigger className={buttonVariants({variant: "default"})}>Create Ticket</DialogTrigger>
            <DialogContent className='w-11/12 sm:max-w-xl max-h-full'>
              <TicketForm />
            </DialogContent>
          </>
        )
      case 'editTicket':
        return (
          <>
            <DialogTrigger className="text-sm">
              Edit<Pencil className='inline w-4 h-4' />
            </DialogTrigger>
            <DialogContent className='w-11/12 sm:max-w-xl max-h-full'>
              {ticket?<TicketForm ticket={ticket} />:null}
            </DialogContent>
          </>
        )
      case 'createUser':
        return (
          <>
            <DialogTrigger className="text-sm">
              <span className='font-medium pr-2'>Register a New Staff</span><UserRoundPlus className='inline w-5 h-5 text-gray-600' />
            </DialogTrigger>
            <DialogContent className='w-11/12 sm:max-w-xl max-h-full'>
              <UserForm />
            </DialogContent>
          </>
        )
      case 'editUser':
        return (
          <>
            <DialogTrigger className="text-sm">
              Update Details<Pencil className='inline w-4 h-4' />
            </DialogTrigger>
            <DialogContent className='w-11/12 sm:max-w-xl max-h-full'>
              {user?<UserForm user={user} />:null}
            </DialogContent>
          </>
        )
      default:
        return <></>
    }
  }

  return (
    <Dialog>
      {formType ? formSwitch(formType):<></>}
    </Dialog>
  )
}

export default FormDialog