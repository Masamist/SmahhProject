import React from 'react'
import dynamic from 'next/dynamic'

const LoginForm = dynamic(() => import("@/components/LoginForm"), {
  ssr:false,
})


const CreateClient = () => {
  return (
    <LoginForm />
  )
}

export default CreateClient