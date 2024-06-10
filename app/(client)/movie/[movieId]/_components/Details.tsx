'use client'

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { SafeUser, SafeMovie } from "@/types/types"
import Link from "next/link"

interface MovieClientProps {
    movie: SafeMovie & {
        user: SafeUser
    }
}

export const Details: React.FC<MovieClientProps> = ({
    movie,
}) => {

    return (
        <>
            <div
                className="w-full bg-cover min-h-[100vh]"
                style={{
                    backgroundImage: `url(${movie.backdrop_path})`
                }}
            >
                <div className='bg-white/20 backdrop-blur-lg dark:bg-black/50 pt-[80px] min-h-[100vh]'>
                    <div
                        className="p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6"
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            className="rounded-lg w-[50vw] md:w-[25vw] self-center"
                            style={{ height: '100%' }}
                            alt=""
                            loading="lazy"
                        />
                        <div className="flex flex-col p-2 h-fit rounded-[20px]"
                        >
                            <Label className="text-[50px] mb-3 font-bold text-center">
                                {movie.title}
                            </Label>
                            <Label className="text-md mb-3">{movie.overview}</Label>
                            <Label className="mb-3">
                                <span className="font-semibold mr-1">Kategori :</span>
                                {movie.category.map((category: string, catIndex: number) => (
                                    <>
                                        {category}
                                        {catIndex !== movie.category.length - 1 && movie.category.length > 1 && ', '}
                                    </>
                                ))}
                            </Label>
                            <Label className="mb-3">
                                <Label className="font-semibold mr-1">Tanggal rilis :</Label>
                                {movie.release_date.toString()}
                            </Label>
                            <div className='flex flex-col gap-3'>
                                <Label className='font-bold'>Genre:</Label>
                                <div className='grid grid-cols-3 sm:flex flex-row gap-3'>
                                    {movie.genres?.map((genre: any) => (
                                        <Label className='px-5 py-2 bg-white text-black rounded-[20px] font-bold text-center items-center flex justify-center'>{genre}</Label>
                                    ))}
                                </div>
                            </div>
                            <div className='flex flex-col sm:flex-row sm:gap-5 justify-center items-center pt-10 gap-5'>
                                <Link href={movie.trailer} target='_blank'>
                                    <Button variant={"secondary"} className="px-10 py-7 bg-red-500 hover:bg-red-400">
                                        Watch Trailer
                                    </Button>
                                </Link>
                                <Link href={`/movie/${movie.id}/order`}>
                                    <Button variant={"secondary"} className="px-10 py-7">
                                        Order Ticket
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}