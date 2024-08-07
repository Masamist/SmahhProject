"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { db } from '@/firebase/config'
import { doc, updateDoc } from 'firebase/firestore'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog"
import { buttonVariants } from '../../components/ui/button'
import { CircleX } from 'lucide-react'


const TicketCloseButton = ({ticketId}: {ticketId: string}) => {
  const router = useRouter()
  const [error, setError] = useState("")
  const [isClosing, setIsClosing] = useState(false)

  const closeTicket = async() => {
    try{
      setIsClosing(true)
      const docRef = doc(db, "tickets", ticketId)
        await updateDoc(docRef, { status: "CLOSED" })
      router.push("/tickets")
      router.refresh()
    }catch(error){
      setIsClosing(false)
        setError("Unknown Error Occured.")
      }
  }
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger className={buttonVariants({
          variant: "destructive",
        })}>
          Close Ticket
          <CircleX width={23} height={23} className='pl-1'  />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure about closing this ticket?</AlertDialogTitle>
            <AlertDialogDescription>
              The data will be archived, and you can reopen this ticket at any time.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className={buttonVariants({ variant: "destructive",
            })}
            disabled={isClosing}
            onClick={closeTicket}
            >
              Close Ticket
          </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <p className="text-destructive">{error}</p>
    </>
  )
}

export default TicketCloseButton