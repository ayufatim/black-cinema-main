import getCurrentUser from '@/app/_actions/get-user'
import { redirect } from 'next/navigation'
import TableMovies from './_components/TableMovies'

async function page() {
    const users = await getCurrentUser()

    if (!users) {
        redirect("/signin")
    }

    return (
        <div className='w-full mt-10 px-5'>
            <TableMovies />
        </div>
    )
}

export default page