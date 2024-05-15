'use client'

import React from 'react'
import { useMediaQuery } from 'usehooks-ts'
import NavDesktop from './NavDesktop'
import NavMobile from './NavMobile'

const Nav = () => {

  const isDesktop = useMediaQuery('(min-width: 640px)', {
    initializeWithValue: false,
  })
  if (isDesktop) {
    return <NavDesktop />
  }
  return <NavMobile />
  
}

export default Nav