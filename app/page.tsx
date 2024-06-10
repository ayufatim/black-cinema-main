import React from 'react'
import getCurrentUser from './_actions/get-user'
import HomeMain from './_components/HomeMain'

async function Home() {
    const user = await getCurrentUser()

    return (
        <div>
            <HomeMain user={user}/>
        </div>
    )
}

export default Home