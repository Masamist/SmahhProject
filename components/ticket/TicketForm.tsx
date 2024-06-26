'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { db } from '@/firebase/config'
import { addDoc, collection, doc, Timestamp, updateDoc } from 'firebase/firestore'
import { fetchAllTicketData } from '@/actions/ticket-actions'
import { fetchUserDataByGroup } from '@/actions/user-action'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { ticketSchema } from '@/ValidationSchemas/ticket'
import { zodResolver } from '@hookform/resolvers/zod'
import { Ticket } from '@/interface/ticket'
import { User } from '@/interface/users'
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"

// UI components
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { 
  Select,
  SelectContent, 
  SelectItem,
  SelectTrigger,
  SelectValue,
 } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

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
  const [ clients, setClients ] = useState<User[]>([])

  useEffect(() => {
    async function fetchData() {
      const data = await fetchAllTicketData()
      setTicketData(data)
      const agentsData = await fetchUserDataByGroup('AGENT')
      setAgents(agentsData)
      const clientsData = await fetchUserDataByGroup('CLIENT')
      setClients(clientsData)
    }
    fetchData()
  }, [])

  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      title: ticket?.title ?? '',
      client: ticket?.client ?? '',
      category: ticket?.category ?? '',
      severity: ticket?.severity ?? '',
      status: ticket?.status ?? '',
      assignedAgent: ticket?.assignedAgent ?? null,
      description: ticket?.description ?? '',
    }
  })

  async function onSubmit(values: z.infer<typeof ticketSchema>) {

    try {
      setIsSubmitting(true)
      setError("")
      const assigned = values.assignedAgent? true: false
      const company = clients.find((item) => item.id === values.client)?.company
      if(ticket){
        const updatedAt = Timestamp.fromDate(new Date())
        const data = {
          ...values,
          assigned,
          company,
          updatedAt
        }
        const docRef = doc(db, "tickets", ticket.id)
        await updateDoc(docRef, { ...data })
      }else{
        const createdAt = Timestamp.fromDate(new Date())
        const data = {
          ...values,
          assigned,
          company,
          createdAt,
        }
        await addDoc(collection (db, "tickets"), { ...data })
      }
      setIsSubmitting(false)
      router.push("/tickets")
      router.refresh()
      setOpen(false)
    } catch (error){
      console.log("Error adding document", error)
      setError("Unknown Error Occured.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className='pl-2 py-2'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ScrollArea className='h-[600px] max-h-[70vh] pr-5'>
            <ScrollBar orientation="vertical" />
            <div className='space-y-5'>
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
                    <FormItem className='w-full'>
                      <FormLabel>Client</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Client..." defaultValue={ticket?.client} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          { clients?.map((client) => (
                            <SelectItem key={client.id} value={client.id}>
                              {`${client.name} ${client.surname} (${client.company})`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )} />

                <div className='flex flex-row w-full justify-between gap-5'>
                  <FormField 
                    control={form.control} 
                    name="category"
                    defaultValue={ticket?.category} 
                    render={({field}) => (
                    <FormItem className='w-1/3'>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Category..." defaultValue={ticket?.category} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="CYBERSECURITY">Cyber Security</SelectItem>
                          <SelectItem value="DATA">Data Security</SelectItem>
                          <SelectItem value="NETWORK">Network Security</SelectItem>
                          <SelectItem value="IT SUPPORT">IT Support</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )} />

                  <FormField 
                    control={form.control} 
                    name="severity"
                    defaultValue={ticket?.severity} 
                    render={({field}) => (
                    <FormItem className='w-1/3'>
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
                    <FormItem className='w-1/3'>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Status..." defaultValue={ticket?.status} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="OPEN">OPEN</SelectItem>
                          <SelectItem value="CLOSED">CLOSED</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )} />
              </div>

              <FormField 
                  control={form.control} 
                  name="assignedAgent"
                  defaultValue={ticket?.assignedAgent}
                  render={({field}) => (
                  <FormItem className='w-full'>
                    <FormLabel>Assigned Agent</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value ?? undefined}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Assigned Agent..." defaultValue={ticket?.assignedAgent ?? undefined} />
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

              <div className='pt-1'>
                <p className='text-sm font-medium'>Description</p>
                <Controller 
                    name="description" 
                    control={form.control}
                    defaultValue={ticket?.description}
                    render={({field}) => (
                    <SimpleMDE placeholder="Description" {...field} />
                  )} />
              </div>
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