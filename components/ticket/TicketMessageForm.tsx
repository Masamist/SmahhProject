"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
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
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from "@/components/ui/separator"
import { SendHorizontal } from 'lucide-react'

type MessageFormData = z.infer<typeof messageSchema>

interface Props {
  ticket: Ticket
  handleMessageFormToggle: () => void
  fetchMessageData: () => void
}
const TicketMessageForm = ({ticket, handleMessageFormToggle, fetchMessageData}: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const pathname = usePathname()
  const { currentUser } = useAuth()

  const form = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema)
  })

  async function onSubmit(values: z.infer<typeof messageSchema>){
    try{
      setIsSubmitting(true)
      setError("")
      if(currentUser){
        const senderId = currentUser.id 
        const senderName = currentUser.name + " " + currentUser.surname
        const createdAt = Timestamp.fromDate(new Date())
        const unreadMessage = true
        const data = {
          ...values,
          senderId,
          senderName,
          createdAt,
          unreadMessage,
        }
        const docRef = doc(db, "tickets", ticket.id)
        const collectionRef = collection(docRef, "messages")
        await addDoc( collectionRef, data)
      }
      setIsSubmitting(false)
      fetchMessageData()
      handleMessageFormToggle()
      router.push(pathname)
      router.refresh()
      
    }catch(error){
      setError("Unknown Error Occured.")
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="pr-2">
          <div className='space-y-5'>                
            <FormField 
              control={form.control}
              name="comment"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Message:</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Type a Message..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className='mt-3'
          >
            Send Message
            <SendHorizontal className='pl-1' strokeWidth={2} />
          </Button>
        </form>
      </Form>
      <p className='text-destructive py-2'>{error}</p>
      <Separator className='mt-2' />
    </div>
  )
}

export default TicketMessageForm