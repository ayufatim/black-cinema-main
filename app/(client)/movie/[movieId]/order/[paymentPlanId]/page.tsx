import getMovieById from "@/app/_actions/get-movie-byid"
import OrderDetails from "./_components/OrderDetails"
import { getAllPaymentCard } from "@/app/_actions/get-all-payment-card"
import getPaymentPlanById from "@/app/_actions/get-payment-plan-byId"
import { getAllPayment } from "@/app/_actions/get-all-payment"
import { getAllPaymentPromo } from "@/app/_actions/get-all-payment-promo"
import getCurrentUser from "@/app/_actions/get-user"
import Navbar from "@/components/Navbar"

interface IParams {
    movieId?: string
    paymentPlanId?: string
}

async function page({params} : {params: IParams}) {
    const movie = await getMovieById(params)
    const paymentPlan = await getPaymentPlanById(params)
    const currentUser = await getCurrentUser()
    const paymentCard = await getAllPaymentCard()
    const paymentPromo = await getAllPaymentPromo()
    const allPayment = await getAllPayment()

    if(!movie || !paymentPlan || !currentUser || !paymentCard || !paymentPromo || !allPayment) {
        return null
    }

    return (
        <div>
            <Navbar user={currentUser}/>
            <OrderDetails movie={movie} paymentPlan={paymentPlan} currentUser={currentUser} paymentCard={paymentCard} paymentPromo={paymentPromo} allPayment={allPayment} />
        </div>
    )
}

export default page