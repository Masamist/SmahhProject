import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/authContext'
import { doSignOut } from '@/actions/auth-actions'
import { SidebarItems } from '@/interface/sidebarItems'
// UI components
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { SidebarButtonSheet as SidebarButton } from '@/components/nav/SidebarButton'
import { Separator } from '@/components/ui/separator'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogOut, Menu, MoreHorizontal, Settings, X } from 'lucide-react'

interface SidebarDesktopProps {
  sidebarItems: SidebarItems
}

const SidebarMobile = (props: SidebarDesktopProps) => {
  const { currentUser } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size='icon' variant='ghost' className='fixed top-.9 left-3'>
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='px-3 py-4' hideClose>
        <SheetHeader className='flex flex-row justify-between items-center space-y-0'>
          <SheetClose asChild>
            <Button className='h-7 w-7 p-0' variant='ghost'>
              <X size={15} />
            </Button>
          </SheetClose>
        </SheetHeader>
        <div className='h-full'>
          <div className='mt-5 flex flex-col w-full gap-1'>
            {props.sidebarItems.links.map((link, idx) => (
              <Link key={idx} href={link.href}>
                <SidebarButton
                    variant={pathname=== link.href ? 'secondary': 'ghost'}
                    icon={link.icon}>
                    {link.label}
                  </SidebarButton>
                </Link>
            ))}
            {props.sidebarItems.extras}
          </div>
          <div className='absolute w-full bottom-4 px-1 left-0'>
            <Separator className='absolute -top-3 left-0 w-full'/>
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant='ghost' className='w-full justify-start'>
                  <div className='flex justify-between items-center w-full'>
                    <div className='flex gap-2'>
                      <Avatar className='h-5 w-5'>
                        <AvatarImage src='https://avatar.iran.liara.run/public/75' />
                        {/* Fix this */}
                        <AvatarFallback>Masami Stonebridge</AvatarFallback>
                      </Avatar>
                      <span>Masami Stonebridge</span>
                    </div>
                    <MoreHorizontal size={20} />             
                  </div>
                </Button>
              </DrawerTrigger>

              <DrawerContent className='mb-2 p-2'>
                <div className='flex flex-col space-y-2 mt-2'>
                  <Link href="/">
                    <SidebarButton size='sm' icon={Settings} className="w-full">
                      Account Settings
                    </SidebarButton>
                  </Link>
                  <SidebarButton 
                    size='sm' icon={LogOut} className="w-full"
                    onClick={() => { doSignOut().then(() => { router.push('/login')})}}
                  >
                    Log Out
                  </SidebarButton>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default SidebarMobile