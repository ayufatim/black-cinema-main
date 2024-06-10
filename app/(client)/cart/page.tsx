import React from 'react'
import getCurrentUser from '@/app/_actions/get-user'
import CartPage from './_components/CartPage'
import { redirect } from 'next/navigation'

async function page() {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/signin')
    }

    return (
        <div>
            <CartPage user={user}/>
        </div>
    )
}

export default page