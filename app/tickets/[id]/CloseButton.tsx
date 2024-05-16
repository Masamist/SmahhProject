// "use client"
import React, { useState } from 'react'
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
} from "@/components/ui/alert-dialog"
import { buttonVariants } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const CloseButton = ({ticketId}: {ticketId: string}) => {
  const router = useRouter()
  const [error, setError] = useState("")
  const [isClosing, setIsClosing] = useState(false)

  const closeTicket = async() => {
    try{
      setIsClosing(true)
      // await axios.delete("/api/tickets/" + ticketId)
      console.log("Test Close")
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
          Delete Ticket
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
              Close
          </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <p className="text-destructive">{error}</p>
    </>
  )
}

export default CloseButton