'use client'
import React, { useState, useEffect } from 'react'
import { db } from '@/firebase/config'
import { addDoc, collection, doc, Timestamp, updateDoc } from 'firebase/firestore'
import { fetchAllTicketData } from '@/actions/ticket-actions'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { ticketSchema } from '@/ValidationSchemas/ticket'
import { zodResolver } from '@hookform/resolvers/zod'
import { Ticket } from '@/interface/ticket'
import { User } from '@/interface/users'
// UI components
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
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
import { fetchUserDataByGroup } from '@/actions/user-action'

 type TicketFormData = z.infer<typeof ticketSchema>

 interface Props {
  ticket?: Ticket
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const TicketForm = ({ticket, setOpen}: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const [ticketData, setTicketData] = useState<Ticket[]>([])
  const [ agents, setAgents ] = useState<User[]>([])

  useEffect(() => {
    async function fetchData() {
      const data = await fetchAllTicketData()
      setTicketData(data)
      const agentsData = await fetchUserDataByGroup('AGENT')
      setAgents(agentsData)
    }
    fetchData()
  }, [])

  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema)
  })

  async function onSubmit(values: z.infer<typeof ticketSchema>) {
    try {
      setIsSubmitting(true)
      setError("")
      if(ticket){
        const updatedAt = Timestamp.fromDate(new Date())
        const assigned = values.assignedAgent? true: false
        const data = {
          ...values,
          assigned,
          updatedAt
        }
        const docRef = doc(db, "tickets", ticket.id)
        await updateDoc(docRef, { ...data })
        console.log("Document updated")
      }else{
        const createdAt = Timestamp.fromDate(new Date())
        const data = {
          ...values,
          createdAt
        }
        await addDoc(collection (db, "tickets"), { ...data })
        console.log("Document created")
      }
      setIsSubmitting(false)
      setOpen(false)
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
          <ScrollArea className='h-[600px] rounded-md'>
            <ScrollBar orientation="vertical" />
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
                          <SelectValue placeholder="Severity..." />
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Ticket Owner..." defaultValue={ticket?.assignedAgent} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        { agents?.map((agent) => (
                          <SelectItem key={agent.id} value={agent.id}>{agent.name + " " + agent.surname}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )} />
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
            </ScrollArea>
            </form>
          </Form>
      <p className="text-destructive">{error}</p>     
    </div>
  )
}

export default TicketForm