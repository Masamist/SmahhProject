"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { db } from '@/firebase/config'
import { addDoc, collection, doc, Timestamp, updateDoc } from 'firebase/firestore'
import { z } from 'zod'
import { userSchema } from '@/ValidationSchemas/users'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { User } from '@/interface/users'
import { SignUp } from '@/lib/auth/signUp'
// UI components
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { 
  Select,
  SelectContent, 
  SelectItem,
  SelectTrigger,
  SelectValue,
 } from './ui/select'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

type UserFormData = z.infer<typeof userSchema>

interface Props {
  user?: User
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const UserForm = ({user, setOpen}: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema)
  })

  async function onSubmit(values: z.infer<typeof userSchema>){
    try{
      setIsSubmitting(true)
      setError("")
      if(user){
        const updatedAt = Timestamp.fromDate(new Date())
        const data = {
          ...values,
          updatedAt
        }
        const docRef = doc(db, "users", user.id)
        await updateDoc(docRef, { ...data })
      }else{
        const createdAt = Timestamp.fromDate(new Date())
        const data = {
          ...values,
          createdAt
        }
        const email = data.email
        const password = data.password
        let uid: string | null = null
        if (password) {
          const result = await SignUp({ email, password })
          uid = result ? result.uid : null
        }
        const modifyData = {
          ...data,
          authId: uid
        }
        delete modifyData.password
        await addDoc(collection (db, "users"), { ...modifyData })
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
      <h2 className='text-xl text-center px-2 py-5'>{user? 'Update User Details': 'Register a New User'}</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="pr-2">
          <ScrollArea className='h-[600px] max-h-[70vh] pr-5'>
            <ScrollBar orientation="vertical" />
              <div className='space-y-5'>
                <FormField 
                  control={form.control}
                  name="name"
                  defaultValue={user?.name}
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Name..." {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField 
                  control={form.control}
                  name="surname"
                  defaultValue={user?.surname}
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Surname</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Surname..." {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField 
                  control={form.control}
                  name="password"
                  defaultValue=""
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" required={user? false: true} placeholder="Enter Password..." {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField 
                  control={form.control}
                  name="email"
                  defaultValue={user?.email}
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Email..." {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField 
                  control={form.control}
                  name="mobile"
                  defaultValue={user?.mobile}
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Mobile</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Mobile Number..." {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className='flex w-full space-x-4'>
                  <FormField 
                    control={form.control} 
                    name="role"
                    defaultValue={user?.role}
                    render={({field}) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Role..." defaultValue={user?.role} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="CLIENT">Client</SelectItem>
                          <SelectItem value="AGENT">Agent</SelectItem>
                          <SelectItem value="ADMIN">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )} 
                />

                <FormField 
                  control={form.control}
                  name="company"
                  defaultValue={user?.company}
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                      <Input placeholder="Enter Company Name ..." {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField 
                  control={form.control}
                  name="jobTitle"
                  defaultValue={user?.jobTitle}
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                      <Input placeholder="Enter Job Title ..." {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className='mt-7'
            >
              {user ? "Update User" : "Create User"}
            </Button>
          </ScrollArea>

        </form>
      </Form>
      <p className='text-destructive'>{error}</p>
    </div>
  )
}

export default UserForm