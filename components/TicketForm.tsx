'use client'
import { db } from '@/firebaseConfig'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { ticketSchema } from '@/ValidationSchemas/ticket'
import { zodResolver } from '@hookform/resolvers/zod'
import { Ticket } from '@/Interface/ticket'
// UI components
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { Input } from './ui/input'
import { 
  Select,
  SelectContent, 
  SelectItem,
  SelectTrigger,
  SelectValue,
 } from './ui/select'
import { Button } from './ui/button'
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

 type TicketFormData = z.infer<typeof ticketSchema>

 interface Props {
  ticket?: Ticket
}

const TicketForm = ({ticket}: Props) => {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema)
  })

  async function onSubmit(values: z.infer<typeof ticketSchema>) {
    try {
      setIsSubmitting(true)
      setError("")
      console.log("Part1")

      if(ticket){
        // await addDoc(collection (db, "tickets"), { values })
        console.log("For patch")
        // await axios.post("/api/tickets", values)
      }else{
        const createdAt = Timestamp.fromDate(new Date())
        // const data = { ...values, createdAt:createdAt }
        //values.push(createdAt)
        //values = {...values + createdAt}
        // values['createdAt']: Ticket = Timestamp.fromDate(new Date())
        const data = {
          ...values,
          createdAt
        }
        await addDoc(collection (db, "tickets"), { ...data })
        console.log("Document written")
      }
      setIsSubmitting(false)
      router.push("/tickets")
      router.refresh()  
    } catch (error){
      console.log("Error adding document", error)
      setError("Unknown Error Occured.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className='frounded-md w-full py-2'>
      <ScrollArea>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
              <FormField 
                control={form.control}
                name="title"
                defaultValue={ticket?.title}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Ticket Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Ticket Title..." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField 
                control={form.control}
                name="client"
                defaultValue={ticket?.client}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    <FormControl>
                      <Input placeholder="Client..." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className='flex w-full space-x-4'>
                <FormField 
                  control={form.control} 
                  name="category"
                  defaultValue={ticket?.category} 
                  render={({field}) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Category..." defaultValue={ticket?.category} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="CYBERSECURITY">Cybersecurity</SelectItem>
                        <SelectItem value="NETWORK">Network</SelectItem>
                        <SelectItem value="IT">IT Suport</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )} />

                <FormField 
                  control={form.control} 
                  name="severity"
                  defaultValue={ticket?.severity} 
                  render={({field}) => (
                  <FormItem>
                    <FormLabel>Severity</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Severity..." defaultValue={ticket?.severity} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                      <SelectItem value="LOW">LOW</SelectItem>
                        <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                        <SelectItem value="HIGH">HIGH</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )} />

                <FormField 
                  control={form.control} 
                  name="status"
                  defaultValue={ticket?.status}
                  render={({field}) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Status..." defaultValue={ticket?.status} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="OPEN">Open</SelectItem>
                        <SelectItem value="CLOSED">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )} />

              <FormField 
                control={form.control}
                name="assignedAgent"
                defaultValue={ticket?.assignedAgent}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Assigned Agent</FormLabel>
                    <FormControl>
                      <Input placeholder="Ticket Owner..." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Controller 
                  name="description" 
                  control={form.control}
                  defaultValue={ticket?.description}
                  render={({field}) => (
                  <SimpleMDE placeholder="Description" {...field} />
                )} />
            </div>
            <Button type="submit" disabled={isSubmitting}>{ticket ? "Update Ticket" : "Creaet Ticket"}</Button>
            </form>
          </Form>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      <p className="text-destructive">{error}</p>
    </div>
  )
}

export default TicketForm