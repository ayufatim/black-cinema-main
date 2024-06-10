import React from 'react'
import Favorite from './_components/Favorite'
import getCurrentUser from '@/app/_actions/get-user'
import { redirect } from 'next/navigation'

async function page() {
    const user = await getCurrentUser()

    if(!user) {
        redirect("/signin")
    }

    return (
        <div>
            <Favorite user={user}/>
        </div>
    )
}

export default page