import React, { useState} from 'react'
import style from './modal.module.css'

const modal = (
  {
    isOpen, children
  }:{
    isOpen: boolean,
    children: React.ReactNode
  }
) => {
  if(!isOpen) return null
  return (
    <>
    <div className={style.modalBackdrop}>
        {/* <button>Close</button> */}
        {children}
    </div>
    </>
  )
}

export default modal