import prismadb from '@/lib/prismadb'
import { redirect } from 'next/navigation'
import { RedirectToSignIn } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import React from 'react'
import ChatClient from './components/ChatClient'

interface ChatIdPageProps {
  params: {
    chatId: string
  }
}

const ChatIdPage = async ({ params }: ChatIdPageProps) => {

  const { userId } = await auth();

  if (!userId) {
    return <RedirectToSignIn />
  }

  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.chatId
    },
    include: {
      messages: {
        orderBy: {
          createdAt: 'asc'
        },
        where: {
          userId
        }
      },
      _count: {
        select: {
          messages: true
        }
      }
    }
  })


  if(!companion) {
    return redirect('/')
  }

  return (
    <div>
      <ChatClient companion={companion} />
    </div>
  )
}

export default ChatIdPage