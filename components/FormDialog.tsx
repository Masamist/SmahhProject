'use client'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { Ticket } from '@/interface/ticket'
import { User } from '@/interface/users'
import { Message } from '@/interface/message'
//UI materials
import { buttonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MessageSquareMore, Pencil, UserRoundPlus } from 'lucide-react'


const TicketForm = dynamic(() => import("@/components/ticket/TicketForm"), {
  ssr:false,
})

const UserForm = dynamic(() => import("@/components/user/UserForm"), {
  ssr:false,
})

type FormSwitchType = 'createTicket' | 'editTicket' | 'createUser' | 'editUser'

interface Props{
  formType?: FormSwitchType
  ticket?: Ticket | null
  user?: User | null
  message?: Message | null
}

const FormDialog = ({formType, ticket, user, message}: Props) => {
  const [open, setOpen] = useState(false)

  const formSwitch = (type: FormSwitchType): JSX.Element | string => {
    switch(type){
      case 'createTicket':
        return (
          <>
            <DialogTrigger className={buttonVariants({variant: "default"})}>
                Create Ticket
            </DialogTrigger>
            <DialogContent className='w-11/12 sm:max-w-xl max-h-full'>
              <TicketForm setOpen={setOpen} />
            </DialogContent>
          </>
        )
      case 'editTicket':
        return (
          <>
            <DialogTrigger className="text-sm text-gray-600 hover:text-sun-500">
              Edit<Pencil className='inline w-4 h-4' />
            </DialogTrigger>
            <DialogContent className='w-11/12 sm:max-w-xl max-h-full'>
              {ticket?<TicketForm ticket={ticket} setOpen={setOpen} />:null}
            </DialogContent>
          </>
        )
      case 'createUser':
        return (
          <>
            <DialogTrigger className="text-sm text-gray-600 hover:text-sun-500">
              <span className='font-medium pr-2'>
                Register a New Staff
              </span>
              <UserRoundPlus className='inline w-5 h-5' />
            </DialogTrigger>
            <DialogContent className='w-11/12 sm:max-w-xl max-h-full'>
              <UserForm setOpen={setOpen} />
            </DialogContent>
          </>
        )
      case 'editUser':
        return (
          <>
            <DialogTrigger className="text-sm text-gray-600 hover:text-sun-500">
              <span className='font-medium pr-1'>
                Update Details
              </span>
              <Pencil className='inline w-5 h-5' />
            </DialogTrigger>
            <DialogContent className='w-11/12 sm:max-w-xl max-h-full'>
              {user?<UserForm user={user} setOpen={setOpen} />:null}
            </DialogContent>
          </>
        )
      default:
        return <></>
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {formType ? formSwitch(formType):<></>}
    </Dialog>
  )
}

export default FormDialog