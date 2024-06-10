'use client'

import { useQuery } from '@tanstack/react-query'
import { getMoviesType } from '../api/movie/route'
import Banner from './Banner'
import Navbar from '@/components/Navbar'
import { getPaymentsType } from '../api/payment/route'
import { Loader } from '@/components/Loader'
import SkeletonWrapper from '@/components/SkeletonWrapper'
import Advertisement from './Advertisement'
import SliderBottom from './SliderBottom'
import SliderTop from './SliderTop'
import Footer from './Footer'

function HomeMain({ user }: { user: any }) {
    const movies = useQuery<getMoviesType>({
        queryKey: ["movies"],
        queryFn: () =>
            fetch(
                'api/movie'
            ).then((res) => res.json())
    })

    const payment = useQuery<getPaymentsType>({
        queryKey: ["payment"],
        queryFn: () =>
            fetch(
                'api/payment'
            ).then((res) => res.json())
    })

    if (movies.isLoading) {
        return <Loader />
    }

    return (
        <div>
            <Navbar user={user} payment={payment.data || []} />
            <SkeletonWrapper isLoading={movies.isLoading} >
                <Advertisement />
            </SkeletonWrapper>
            <SliderTop movies={movies} currentUser={user} />
            <Banner movies={movies} />
            <Footer/>
        </div>
    )
}

export default HomeMain