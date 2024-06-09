'use client'
import React, { useState } from 'react'
import { doSignInWithEmailAndPassword } from '@/actions/auth-actions';
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/authContext'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  email: z.string().min(1, { message: "Email is required." })
    .email("This is not a valid email."),
  password: z.string().min(6, "Password must be at leaset 6 characters.")
    .max(255).or(z.literal("")),
})

type LoginFormData = z.infer<typeof formSchema>

const LoginForm = () => {
  const { userLoggedIn } = useAuth()
  const router = useRouter()
  const [isSigningIn, setIsSigningIn ] = useState(false)
  const [error, setError] = useState("")
  const form = useForm<LoginFormData>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async(values: z.infer<typeof formSchema>) => {
    try {
      setError("")
      if(!isSigningIn) {
        setIsSigningIn(true)
        await doSignInWithEmailAndPassword(values.email, values.password)
        router.replace('/')
      }
    } catch (error){
      console.log("Error code:", error)
      setError("Login failed.")
    }
  }

  return (
    <>
      {userLoggedIn && (router.push('/'))}
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormDescription className='text-xs text-right'>
                Forgot password?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className='w-full bg-midnight-900 text-white'>Login</Button>
      </form>
    </Form>
    </>
    
  )
}

export default LoginForm