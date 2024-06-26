import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SidebarItems } from '@/interface/sidebarItems'
import { SidebarButton } from '@/components/nav/SidebarButton'

interface SidebarDesktopProps {
  sidebarItems: SidebarItems
}

const SidebarDesktop = (props: SidebarDesktopProps) => {
  const pathname = usePathname()
  return (
    <aside className='w-[170px] lg:w-[250px] max-w-xs h-screen fixed left-0 top-12 z-40 border-r bg-sky-950' >
      <div className='h-full px-3'>
        <div className='mt-5'>
            {props.sidebarItems.links.map((link, index) => (
              <Link key={index} href={link.href}>
                <SidebarButton
                  variant={pathname=== link.href ? 'default': 'ghost'}
                  icon={link.icon}>
                  {link.label}
                </SidebarButton>
              </Link>
            ))}
            {props.sidebarItems.extras}
          </div>
      </div>
    </aside>
  )
}

export default SidebarDesktop