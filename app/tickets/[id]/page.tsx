'use client'
import React, { useEffect, useState } from 'react'
import { db } from '@/firebaseConfig'
import { getDoc, doc } from 'firebase/firestore'
import { Ticket } from '@/Interface/ticket'
import MainTitle from '@/components/MainTitle'
import TicketDetail from './TicketDetail'

interface Props {
  params: {id: string},
}

const SingleTicket = ({params: {id}}: Props) => {
  const [ticket, setTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== 'undefined') { // Ensure this code runs only in the browser
        try {
          const docSnap = await getDoc(doc(db, "tickets", id));
          if (docSnap.exists()) {
            const ticketData = { id: docSnap.id, ...docSnap.data() } as Ticket;
            setTicket(ticketData);
          } else {
            console.log(`Document with ID ${id} does not exist`);
          }
        } catch (error) {
          console.error('Error fetching document:', error);
        }
      }
    };
    fetchData();
  }, [id]);
  // async function fetchSingleDataFromFirestore(): Promise<Ticket>{
  //       const docSnap = await getDoc(doc(db, "tickets", id));
  //       const ticketData = { id: docSnap.id, ...docSnap.data() } as Ticket
  //       return ticketData
  //   }

  // const [ticket, setTicket] = useState<Ticket | null>(null)
  // //const [error, setError] = useState<string>('')

  // useEffect(() => {
  //   async function fetchSingleData() {
  //     const data = await fetchSingleDataFromFirestore()
  //     if(!data){
  //       console.log('no data')
  //     }else{
  //       setTicket(data)
  //     }
      
  //   }
  // fetchSingleData();
  // }, [id])

  
  return (
    <div className='container max-w-screen-lg mt5'>
      <MainTitle />
      {
        ticket?<TicketDetail ticket={ticket}  />: (<p>Ticket is not Found!</p>)
      }
      
    </div>
  )
}

export default SingleTicket