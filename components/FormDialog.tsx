import React from 'react'
import dynamic from 'next/dynamic'
import { buttonVariants } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
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

type FormSwitchType = 'createTicket' | 'editTicket' | 'createUser' | 'editUser';

interface Props{
  formType?: FormSwitchType | null
  ticket?: Ticket | null
  user?: User | null
}


const FormDialog = ({formType, ticket, user}: Props) => {
  const formSwitch = (type: FormSwitchType): JSX.Element | string => {
    switch(type){
      case 'createTicket':
        return (
          <DialogTrigger className={buttonVariants({variant: "default"})}>Create Ticket</DialogTrigger>
        )
      case 'editTicket':
        return (
          <DialogTrigger className="text-sm">
            Edit<Pencil className='inline w-4 h-4' />
          </DialogTrigger>
        )
      case 'createUser':
        return '...'
      case 'editUser':
        return (
          <DialogTrigger className="text-sm">
            Update Details<Pencil className='inline w-4 h-4' />
          </DialogTrigger>
        )
      default:
        return <></>
    }
  }
  return (
    <Dialog>
      {formType ? formSwitch(formType):<></>}
      <DialogContent className='w-11/12 sm:max-w-xl max-h-full'>
        {ticket? <TicketForm ticket={ticket} /> : <TicketForm />} 
        
      </DialogContent>

    </Dialog>
    
  )
}

export default FormDialog