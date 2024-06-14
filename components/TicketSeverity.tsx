import React from 'react'

interface Props {
  severity: string
}

const severitySwitch = (severity: string) => {
  if(severity === "LOW"){
    return <div className='bg-green-500 w-4 h-4 rounded-full'></div>
  } else if (severity === "MEDIUM"){
    return <div className='bg-yellow-500 w-4 h-4 rounded-full'></div>
  } else if (severity === "HIGH"){
    return <div className='bg-red-500 w-4 h-4 rounded-full'></div>
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