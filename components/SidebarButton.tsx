import React from 'react'
import { Button, ButtonProps } from './ui/button'
import { LucideIcon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SheetClose } from './ui/sheet'

interface SidebarButtonProps extends ButtonProps {
  icon?: LucideIcon
}

export function SidebarButton ({ icon: Icon, className, children, ...props }: SidebarButtonProps){
  return (
    <Button 
      variant='ghost' 
      className={cn('gap-2 justify-start w-full sm:text-stone-600 md:text-white active:text-gray-600 hover:bg-gray-400 ')} {...props}>
      {Icon && <Icon size={20} />}
      <span>{children}</span>
    </Button>
  )
}

export function SidebarButtonSheet(props: SidebarButtonProps){
  return (
    <SheetClose asChild>
      <SidebarButton {...props} />
    </SheetClose>
  )
}