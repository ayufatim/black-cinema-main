'use client'

import { getMoviesType } from "@/app/api/movie/route";
import { getUsersType } from "@/app/api/user/route";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { useQuery } from "@tanstack/react-query";
import FavoriteCard from "./FavoriteCard";
import { Label } from "@/components/ui/label";

function Favorite({ user }: { user: any }) {
    const movies = useQuery<getMoviesType>({
        queryKey: ["movies"],
        queryFn: () =>
            fetch(
                `/api/movie`
            ).then((res) => res.json()),
    })

    const filteredMovies = movies.data?.filter((movie) =>
        user.favoriteMovie.includes(movie.id)
    );

    return (
        <SkeletonWrapper isLoading={movies.isLoading}>
            <div className="flex flex-col w-full gap-10 pt-10 h-full">
                <Label className="flex w-full justify-center text-3xl">Favorite Movies</Label>
                <div className="grid grid-cols-3 gap-5 px-5 w-full h-full">
                    {filteredMovies?.map((movie, index) => {
                        return (
                            <FavoriteCard movie={movie} index={index} user={user} />
                        )
                    })}
                </div>
            </div>
        </SkeletonWrapper>
    )
}

export default Favorite