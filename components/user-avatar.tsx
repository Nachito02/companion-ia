import React from 'react'
import { AvatarImage, Avatar } from './ui/avatar';
import { useUser } from '@clerk/nextjs';



const UserAvatar = () => {
  const {user} = useUser();
  
  return (
    <Avatar>
        <AvatarImage src={user?.imageUrl} />
    </Avatar>
  )
}

export default UserAvatar