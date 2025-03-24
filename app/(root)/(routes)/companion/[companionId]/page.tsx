import prismadb from '@/lib/prismadb'
import React from 'react'
import CompanionForm from './components/companion-form'
import { auth,  } from '@clerk/nextjs/server'
import { RedirectToSignIn } from '@clerk/nextjs'


interface CompanionIdPageProps {
    params: {
        companionId: string
    }
}

const CompanionIdPage = async ({ params }: CompanionIdPageProps) => {

    const {userId} = await auth();

    if (!userId) {
      return <RedirectToSignIn />;
    }

    //TODO CHECK SUBSCRIPTION
    const companion = await prismadb.companion.findUnique({
        where: {
            id: params.companionId,
            userId
        }
    })

    const categories = await prismadb.category.findMany()

    return (
        <CompanionForm initialData={companion} categories={categories} />
    )
}

export default CompanionIdPage