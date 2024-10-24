import { UserButton } from '@clerk/nextjs'
import React from 'react'

const RootPage = () => {
  return (
    <div>
      <UserButton afterSwitchSessionUrl='/' />
    </div>
  )
}

export default RootPage