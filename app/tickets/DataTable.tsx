'use client'
import { db } from '@/firebaseConfig'
import React, { useEffect, useState } from 'react'
import { getDocs, collection } from 'firebase/firestore'

type Ticket = {
  id: string;
  title: string;
  status: string;
  createdBy: string;
  severity: string;
};

async function fetchDataFromFirestore(): Promise<Ticket[]>{
  const querySnapshot = await getDocs(collection(db, "tickets"))

  const data: Ticket[] = []
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...(doc.data() as Omit<Ticket, 'id'>) })
  })
  return data
}

const DataTable = () => {
  const [ticketData, setTicketData] = useState<Ticket[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFirestore()
      setTicketData(data)
    }
    fetchData()
  }, [])

  return (
    <div>
      { ticketData.map((ticket) => (
        <div key={ticket.id} className='mb-4'>
          <p className='text-xl font-bold'>{ticket.title}</p>
          <p>{ticket.status}</p>
          <p>{ticket.createdBy}</p>
          <p>{ticket.severity}</p>
        </div>
      ))}
    </div>
  )
}

export default DataTable