import React from 'react'
import dynamic from 'next/dynamic'
import { buttonVariants } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { Ticket } from '@/Interface/ticket'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

const TicketForm = dynamic(() => import("@/components/TicketForm"), {
  ssr:false,
})

interface Props{
  type: string
  ticket?: Ticket | null
}

const FormDialog = ({type, ticket}: Props) => {
  return (
    <Dialog>
      {type === 'edit'? 
      <DialogTrigger className="text-sm">
        {/* <DialogTrigger className={buttonVariants({variant: "ghost"})}></DialogTrigger> */}
        Edit<Pencil className='inline w-4 h-4' />
      </DialogTrigger>
      : <DialogTrigger className={buttonVariants({variant: "default"})}>Create Ticket</DialogTrigger>
      }
      <DialogContent className='w-11/12 sm:max-w-xl max-h-full'>
        {ticket? <TicketForm ticket={ticket} /> : <TicketForm />} 
        
      </DialogContent>

    </Dialog>
    
  )
}

export default FormDialog