import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { buttonVariants } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import { Pencil } from 'lucide-react'

const TicketForm = dynamic(() => import("@/components/TicketForm"), {
  ssr:false,
})

interface DialogProp{
  type: string
  id: string
}

const FormDialog = ({type, id}: DialogProp) => {
  return (
    <Dialog>
      {type === 'create'? 
        <DialogTrigger className={buttonVariants({variant: "default"})}>Create Ticket</DialogTrigger>
      :<DialogTrigger className="text-sm">
        {/* <DialogTrigger className={buttonVariants({variant: "ghost"})}></DialogTrigger> */}
        Edit<Pencil className='inline w-4 h-4' />
      </DialogTrigger>
      }
      

        <DialogContent className='w-11/12 sm:max-w-xl max-h-full'> 
          <TicketForm ticketId={id} />
        </DialogContent>

    </Dialog>
    
  )
}

export default FormDialog