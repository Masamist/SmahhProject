'use client'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import TicketForm from './TicketForm'
import { Button, buttonVariants } from './ui/button'

const FormDialog = () => {
  return (
    <Dialog>
        <DialogTrigger>
          <Button className={buttonVariants({variant: 'default'})}>Create Ticket</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ticket Form</DialogTitle>
            <DialogDescription>
              <TicketForm />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default FormDialog