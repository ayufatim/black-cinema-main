import getCurrentUser from "@/app/_actions/get-user"
import { redirect } from "next/navigation"
import TablePayments from "./_components/TablePayments"

async function page() {
    const users = await getCurrentUser()

    if (!users) {
        redirect("/signin")
    }

    return (
        <div className='w-full mt-10 px-5'>
            <TablePayments />
        </div>
    )
}

export default page