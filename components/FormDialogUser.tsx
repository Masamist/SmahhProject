import React from 'react'
import dynamic from 'next/dynamic'
import { buttonVariants } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { User } from '@/interface/users'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

const UserForm = dynamic(() => import("@/components/UserForm"), {
  ssr:false,
})

interface Props{
  type: string
  user?: User | null
}

const FormDialog = ({type, user}: Props) => {
  return (
    <Dialog>
      {type === 'edit'? 
      <DialogTrigger className="text-sm">
        {/* <DialogTrigger className={buttonVariants({variant: "ghost"})}></DialogTrigger> */}
        Edit<Pencil className='inline w-4 h-4' />
      </DialogTrigger>
      : <DialogTrigger className={buttonVariants({variant: "default"})}>Create User</DialogTrigger>
      }
      <DialogContent className='w-11/12 sm:max-w-xl max-h-full'>
        {user? <UserForm user={user} /> : <UserForm />} 
        
      </DialogContent>

    </Dialog>
    
  )
}

export default FormDialog