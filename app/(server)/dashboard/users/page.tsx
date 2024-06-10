import getCurrentUser from "@/app/_actions/get-user"
import TableUsers from "./_components/TableUsers"
import { redirect } from "next/navigation"

async function page() {
    const users = await getCurrentUser()

    if(!users) {
        redirect("/signin")
    }

    if(users?.role !== 'admin') {
        return <div>
            403 Forbidden Page
        </div>
    }
    
    return (
        <div className='w-full mt-10 px-5'>
            <TableUsers/>
        </div>
    )
}

export default page