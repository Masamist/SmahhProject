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
import { Spinner } from '@/components/ui/spinner';

const formSchema = z.object({
  email: z.string().min(1, { message: "Email is required." })
    .email("This is not a valid email.").default(""),
  password: z.string().min(1,{ message: "Password is required" }).default(""),
})

type LoginFormData = z.infer<typeof formSchema>

const LoginForm = () => {
  const router = useRouter()
  const [isSigningIn, setIsSigningIn ] = useState(false)
  const [error, setError] = useState("")
  const form = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>){
    try {
      setError("")
      if(!isSigningIn) {
        setIsSigningIn(true)
        const credential = await doSignInWithEmailAndPassword(values.email, values.password)
        const idToken = await credential.user.getIdToken();

        await fetch("/api/login", {
          headers: {
            Authorization: `Bearer ${idToken}`
          }
        })
        router.replace('/')
        
      }
      
    } catch (error){
      setIsSigningIn(false)
      console.log("Error code:", error)
      setError("Login failed.")
    }
  }

  return (
    <>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                  placeholder="Email" {...field} 
                  value={field.value || ''} />
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
                <Input 
                  type="password" 
                  placeholder="Password" {...field} 
                  value={field.value || ''} />
              </FormControl>
              <FormDescription className='text-xs text-right'>
                Forgot password?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className='w-full bg-midnight-900 text-white'>
          {isSigningIn? <><span><Spinner /></span>Loading</> : "Login"}
        </Button>
        <p>{error}</p>
      </form>
    </Form>
    </>
    
  )
}

export default LoginForm