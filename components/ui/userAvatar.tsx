import React from 'react'

interface Prop {
  avatarName: string
}

const userAvater = ({avatarName}: Prop) => {
  return (
    <div className='w-8 h-8 bg-sun-500 rounded-full text-center pt-1'>
      <span className='text-white'>{avatarName}</span>
    </div>
  )
}

export default userAvater
