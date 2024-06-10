import Navbar from "@/components/Navbar"
import CartDetail from "./_components/CartDetail"
import getCurrentUser from "@/app/_actions/get-user"
import { getAllPaymentCard } from "@/app/_actions/get-all-payment-card"
import getPaymentById from "@/app/_actions/get-payment-byid"

interface IParams {
    paymentId: string
}

async function page({params}: {params: IParams}) {
    const payment = await getPaymentById(params)
    const paymentCard = await getAllPaymentCard()
    const user = await getCurrentUser()

    if(!payment || !paymentCard || !user) {
        return null
    }

    return (
        <div>
            <Navbar user={user} />
            <CartDetail payment={payment} paymentCard={paymentCard} />
        </div>
    )
}

export default page