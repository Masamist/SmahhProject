import React from 'react'

interface Props {
  severity: string
}

const severitySwitch = (severity: string) => {
  if("LOW"){
    return <div className={`${severity === 'LOW' ? 'bg-green-500' : 'text-muted'} w-4 h-4 rounded-full`}></div>
  } else if ("MEDIUM"){
    return <div className={`${severity === 'MEDIUM' ? 'bg-yellow-500' : 'text-muted'}  w-4 h-4 rounded-full`}></div>
  } else if ("HIGH"){
    return <div className={`${severity === 'HIGH' ? 'bg-red-500' : 'text-muted'}  w-4 h-4 rounded-full`}></div>
  }else {
    <p> Error</p>
  }
}

const TicketSeverity = ({severity}: Props) => {
  return (
    <>
      { severitySwitch(severity) }
      
    </>
  )
}

export default TicketSeverity