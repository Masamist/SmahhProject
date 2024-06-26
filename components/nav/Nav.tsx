'use client'
import { useMediaQuery } from 'usehooks-ts'
import NavDesktop from '@/components/nav/NavDesktop'
import NavMobile from '@/components/nav/NavMobile'

const Nav = () => {

  const isDesktop = useMediaQuery('(min-width: 768px)', {
    initializeWithValue: false,
  })
  if (isDesktop) {
    return <NavDesktop />
  }
  if(!isDesktop){
    return <NavMobile />
  }
}

export default Nav