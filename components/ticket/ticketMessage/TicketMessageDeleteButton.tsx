"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { deleteSingleMessage } from '@/actions/message-actions'

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
import { Trash2 } from 'lucide-react'


interface Props {
  ticketId: string
  messageId: string
  fetchMessageData: () => void
}


const TicketMessageDeleteButton = ({ticketId, messageId, fetchMessageData}: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const [error, setError] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteMessage = async() => {
    try{
      setIsDeleting(true)
      deleteSingleMessage({ticketId, messageId})
      fetchMessageData()
      router.push(pathname)
      router.refresh()
    }catch(error){
      setIsDeleting(false)
        setError("Unknown Error Occured.")
      }
  }
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Trash2 className='text-gray-400' />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure about deleting this message?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className={buttonVariants({ variant: "destructive",
            })}
            disabled={isDeleting}
            onClick={deleteMessage}
            >
              Delete Message
          </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <p className="text-destructive">{error}</p>
    </>
  )
}

export default TicketMessageDeleteButton