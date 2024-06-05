import React from 'react'
import dynamic from 'next/dynamic'

const LoginForm = dynamic(() => import("@/components/LoginForm"), {
  ssr:false,
})

const CreateStaff = () => {
  return (
    <LoginForm />
  )
}

export default CreateStaff