import React from 'react'
import { AvatarImage, Avatar } from './ui/avatar';


interface BotAvatarProps {
    src: string;
};
const BotAvatar = ({src} : BotAvatarProps) => {
  return (
    <Avatar>
        <AvatarImage src={src} />
    </Avatar>
  )
}

export default BotAvatar