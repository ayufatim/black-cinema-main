import React from 'react'
import Order from './_components/Order'
import getMovieById from '@/app/_actions/get-movie-byid'
import { getAllPaymentPlan } from '@/app/_actions/get-all-payment-plan'

interface IParams {
    movieId?: string
}

async function page({ params }: { params: IParams }) {
    const movie = await getMovieById(params)
    const paymentPlan = await getAllPaymentPlan()

    if (!movie) {
        <div>
            Error 404
        </div>
    }

    return (
        <div>
            <Order movie={movie} paymentPlan={paymentPlan} />
        </div>
    )
}

export default page