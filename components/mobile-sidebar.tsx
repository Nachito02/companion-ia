import React from 'react'

import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import Sidebar from '@/components/sidebar'
import { Menu } from 'lucide-react'
const MobileSideBar = () => {
  return (
    <Sheet>
      <SheetTrigger className='md:hidden pr-4'>
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"} className='p-0 bg-secondary pt-10 w-32'>
        <Sidebar /> 
      </SheetContent>
    </Sheet>
  )
}

export default MobileSideBar