"use client"
import React, { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { z } from 'zod'
import { userSchema } from '@/ValidationSchemas/users'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { 
  Select,
  SelectContent, 
  SelectItem,
  SelectTrigger,
  SelectValue,
 } from '@/components/ui/select'
 import { User } from '@/interface/users'

 interface Props {
  user?: User
}

type UserFormData = z.infer<typeof userSchema>

const LoginForm = ({user}: Props) => {
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

      // if(user){
      //   await axios.patch("/api/users/" + user.id, values)
      // }else {
      //   await axios.post("/api/users", values)
      // }
      setIsSubmitting(false)
      router.push("/tickets")
      router.refresh()

    }catch(error){
      setError("Unknown Error Occured.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className='frounded-md border w-full p-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField 
            control={form.control}
            name="name"
            defaultValue={user?.name}
            render={({field}) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Users Full Name..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="username"
            defaultValue={user?.username}
            render={({field}) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a Username..." {...field} />
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
                    <SelectItem value="AGENT">Agent</SelectItem>
                    <SelectItem value="CLIENT">Client</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )} />
          </div>
          <Button type="submit" disabled={isSubmitting}>{user ? "Update User" : "Create User"}</Button>
        </form>
      </Form>
      <p className='text-destructive'>{error}</p>
    </div>
  )
}

export default LoginForm