'use client'

import { SafePaymentPlan } from "@/types/types"
import OrderCard from "./OrderCard"

interface MovieProps {
    movie: any
    paymentPlan: SafePaymentPlan[]
}

const Order = ({ movie, paymentPlan }: MovieProps) => {
    
    return (
        <div
            className="w-full bg-cover min-h-[100vh]"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`
            }}
        >
            <div className='flex flex-col bg-black/50 min-h-[100vh] items-center justify-center'>
                <h1 className='flex justify-center text-xl font-bold mb-5 mt-5 md:mt-0'>Pilih Jenis Paket</h1>
                <div className="block md:flex md:flex-row gap-5">
                    {paymentPlan.map((payPlan: any, index: any) => (
                        <OrderCard movie={movie} payPlan={payPlan} index={index}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Order