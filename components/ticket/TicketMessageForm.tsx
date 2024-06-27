"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { db } from '@/firebase/config'
import { addDoc, collection, doc, setDoc, Timestamp, updateDoc } from 'firebase/firestore'
import { z } from 'zod'
import { messageSchema } from '@/ValidationSchemas/message'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Ticket } from '@/interface/ticket'
import { Message } from '@/interface/message'
import { useAuth } from '@/contexts/authContext'
// UI components
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { 
  Select,
  SelectContent, 
  SelectItem,
  SelectTrigger,
  SelectValue,
 } from '@/components/ui/select'
import { Textarea } from '../ui/textarea'


type MessageFormData = z.infer<typeof messageSchema>

interface Props {
  message?: Message | null
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ticket: Ticket
}
const TicketMessageForm = ({message, setOpen, ticket}: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { currentUser } = useAuth()

  const form = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema)
  })

  async function onSubmit(values: z.infer<typeof messageSchema>){
    try{
      setIsSubmitting(true)
      setError("")
      if(currentUser){
        
        const senderId = currentUser.authId
        const senderName = currentUser.name + " " + currentUser.surname
        const createdAt = Timestamp.fromDate(new Date())
        const data = {
          ...values,
          senderId,
          senderName,
          createdAt
        }
        const docRef = doc(db, "tickets", ticket.id)
        const collectionRef = collection(docRef, "messages")
        await addDoc( collectionRef, data)

        await updateDoc(docRef, { 
          unreadMessage: true,
        })
    }
      setIsSubmitting(false)
      router.refresh()
      setOpen(false)

    }catch(error){
      setError("Unknown Error Occured.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className='rounded-md p-3'>
      <h2 className='text-xl text-center px-2 py-5'>{message? 'Update Message': 'Create a Message'}</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="pr-2">
          <ScrollArea className='h-[600px] max-h-[40vh] pr-5'>
            <ScrollBar orientation="vertical" />
              <div className='space-y-5'>
                <div>
                  <h3 className='text-sm font-medium pb-2'>Ticket Name:</h3>
                  <p className='text-sm'>Cybersecurity Report</p>
                </div>
                
                <FormField 
                  control={form.control}
                  name="comment"
                  defaultValue={message?.comment}
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter Message..." {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className='mt-7'
            >
              {message ? "Update Message" : "Create a Message"}
            </Button>
          </ScrollArea>

        </form>
      </Form>
      <p className='text-destructive'>{error}</p>
    </div>
  )
}

export default TicketMessageForm