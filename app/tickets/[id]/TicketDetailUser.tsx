'use client'
import React, { useState, useEffect } from 'react'
import { fetchSingleUserData } from '@/actions/user-action'

interface  Props{
  id: string
  title: string

}

const TicketDetailUser = ({id, title}: Props) => {
  const [ userName, setUserName ] = useState<string>()
  console.log("ID:", id)
  useEffect(() =>{
    async function fetchData() {     
      const data = await fetchSingleUserData(id)
      if(data){
        const name = data.name + data.surname
        console.log(name)
        setUserName(name)
      } else {
        console.log('error')
      }
    }
  },[])
  return (
    <>
    <p className='text-xs text-cyan-500'>{title}</p>
    <p>{userName}</p>
    </>
  )
}

export default TicketDetailUser