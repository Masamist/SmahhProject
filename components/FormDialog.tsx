import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button, buttonVariants } from './ui/button'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import dynamic from 'next/dynamic'

const TicketForm = dynamic(() => import("@/components/TicketForm"), {
  ssr:false,
})



const FormDialog = () => {
  return (
    <Dialog>
        <DialogTrigger>
          <Button className={buttonVariants({variant: 'default'})}>Create Ticket</Button>
        </DialogTrigger>
        <DialogContent className='w-11/12 sm:max-w-xl max-h-full'>
        <ScrollArea>
          <TicketForm />
        </ScrollArea>
        </DialogContent>
    </Dialog>
  )
}

export default FormDialog