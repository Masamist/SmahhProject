'use client'
import React, { useState, useEffect } from 'react'
import { fetchUnassignedTickets, getAllOpenTicketCount, getYourTicketCount } from '@/actions/ticket-actions'
import { Ticket } from '@/interface/ticket'
import { getAllMessagesByUser, MessageWithTicketInfo } from '@/actions/message-actions'
import { useAuth } from '@/contexts/authContext'
import DashboardActivity from './DashboardActivity'
import DashboardUnassignedTicekt from './DashboardUnassignedTicket'
import DashboardTicketCounts from './DashboardTicketCounts'


const DashboardLayout = () => {
  const { currentUser, isClient } = useAuth()
  const userId = currentUser?.id
  const [ unassignedTicket, setUnassignedTicket] = useState<Ticket[]>([])
  const [ yourTicketCount, setYourTicketCount] =useState<number>()
  const [ unassignedTicketCount, setUnassignedTicketCount] =useState<number>()
  const [ allTicketCount, setAllTicketCount] =useState<number>()
  const [messagesWithTicketInfo, setMessagesWithTicketInfo] = useState<MessageWithTicketInfo[]>()

  
  useEffect(()=> {
    async function fetchData() { 
      if(userId){
        const messages = await getAllMessagesByUser(userId, isClient)
        if(messages){
          setMessagesWithTicketInfo(messages)
        }
      }


      if(userId){
        const yourCount = await getYourTicketCount(userId, isClient)
        if(yourCount){
          setYourTicketCount(yourCount)
        }
      }   
      
      const data = await fetchUnassignedTickets()
      if(data){
        setUnassignedTicket(data)
        const count = data.length
        setUnassignedTicketCount(count)
      }else{
        console.log('unknown error')
      }
      const allCount = await getAllOpenTicketCount()
      if(allCount){
        setAllTicketCount(allCount)
      }
    }
    fetchData()
  })

  return (
    <div className='flex flex-row gap-5 w-full'>
      <div className='w-1/2'>
        <DashboardActivity messagesWithTicketInfo={messagesWithTicketInfo} />
      </div>
      <div className='w-1/2 flex flex-col gap-5'>
        {!isClient&& <DashboardUnassignedTicekt unassignedTicket={unassignedTicket} />}
          
          <DashboardTicketCounts
            yourTicketCount={yourTicketCount}
            unassignedTicketCount={unassignedTicketCount}
            allTicketCount={allTicketCount} />
      </div>
    </div>
  )
}

export default DashboardLayout