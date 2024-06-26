'use client'
import React, { useState, useEffect } from 'react'
import { fetchAgentUserName } from '@/actions/user-action'

export const TicketDataCardAgentFinder = ( agentId: string|null) => {
    const [agentName, setAgentName] = useState<string>()
    useEffect(() => {
      async function GetAgentName(){
        try {
          if(agentId){
            const name = await fetchAgentUserName(agentId)
            if(name){
            setAgentName(name)
            }
          }
        }catch(error){
          console.log(error)
        }
      }
      GetAgentName()
    }, [agentId])
    return <span>{agentName || 'null'}</span>

    
}