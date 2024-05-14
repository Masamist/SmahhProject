'use client'
import { db } from '@/firebaseConfig'
import { addDoc, collection } from 'firebase/firestore'
import React, { useState, FormEvent } from 'react'

// type Ticket = {
//   title?: string
//   status?: string
//   createdAt?: string
//   severity?: string
// }

// interface TicketType {
//   title: string
//   status: string
//   createdAt: string
//   severity: string
// }

// const initialState = {
//   title: "",
//   status: "",
//   createdAt: "",
//   severity: ""
// }

async function addDataToFirestore(title: string, status: string, createdBy: string, severity: string) {
  try {
    const docRef = await addDoc(collection (db, "tickets"), {
      title,
      status,
      createdBy,
      severity
    })
    console.log("Document written with ID", docRef.id)
    return true
  } catch (error){
    console.log("Error adding document", error)
    return false
  }
}

const TicketForm = () => {
  // const [ticket, setTicket] = useState<Ticket>({})
  const [title, setTitle] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [createdBy, setCreatedBy] = useState<string>('')
  const [severity, setSeverity] = useState<string>('')
  //useState<TicketType>(initialState)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const added = await addDataToFirestore(title, status, createdBy, severity)
    if(added){
      setTitle('')
      setStatus('')
      setCreatedBy('')
      setSeverity('')
    }
  }
  return (
    <div className="flex flex-col items-center">
      <h1 className= "text-5xl font-bold m-10">
        Add data to Firebase Databse
      </h1>
      <form onSubmit={handleSubmit} className='max-w-md mx-auto p-4 bg-white shadow-md' >
        <div className='mb-4'>
          <label htmlFor='title' className='block text-gray-700 font-bold mb-2'>
            Name:
          </label>
          <input 
            type='text' 
            id='title' 
            className='w-full px-3 py-2 border-lg fucus:outline-none focus:border-blue-500'
            value={title}
            onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor='title' className='block text-gray-700 font-bold mb-2'>
            Status:
          </label>
          <input 
            type='text' 
            id='status' 
            className='w-full px-3 py-2 border-lg fucus:outline-none focus:border-blue-500'
            value={status}
            onChange={(e) => setStatus(e.target.value)} />
          <label htmlFor='status' className='block text-gray-700 font-bold mb-2'>
            Created By:
          </label>
          <input 
            type='text' 
            id='createdBy' 
            className='w-full px-3 py-2 border-lg fucus:outline-none focus:border-blue-500'
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)} />
          <label htmlFor='createdBy' className='block text-gray-700 font-bold mb-2'>
            Severity:
          </label>
          <input 
            type='text' 
            id='severity' 
            className='w-full px-3 py-2 border-lg fucus:outline-none focus:border-blue-500'
            value={severity}
            onChange={(e) => setSeverity(e.target.value)} />
        </div>
        <div className='text-centre'>
          <button type='submit' className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg'>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default TicketForm