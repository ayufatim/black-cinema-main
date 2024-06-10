'use client'

import { getPaymentsType } from "@/app/api/payment/route"
import { useQuery } from "@tanstack/react-query"
import { getMoviesType } from "@/app/api/movie/route"
import { getPaymentPromoType } from "@/app/api/payment/paymentPromo/route"
import Navbar from "@/components/Navbar"
import Cart from "./Cart"

function CartPage({user}: {user: any}) {
    const payment = useQuery<getPaymentsType>({
        queryKey: ["payment"],
        queryFn: () => 
            fetch(
                `/api/payment`
            ).then((res) => res.json())
    })

    const movies = useQuery<getMoviesType>({
        queryKey: ["movies"],
        queryFn: () => 
            fetch(
                `/api/movie`
            ).then((res) => res.json())
    })

    const paymentPromo = useQuery<getPaymentPromoType>({
        queryKey: ["paymentPromo"],
        queryFn: () =>
            fetch(
                `/api/payment/paymentPromo`
            ).then((res) => res.json())
    })

    return (
        <div>
            <Navbar user={user} payment={payment.data || []}/>
            <Cart payment={payment.data || []} movie={movies.data || []} paymentPromo={paymentPromo.data || []}/>
        </div>
    )
}

export default CartPage