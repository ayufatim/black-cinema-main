import getMovieById from "@/app/_actions/get-movie-byid";
import { SafeUser, SafeMovie } from "@/types/types"
import { Details } from './_components/Details'
import Navbar from "@/components/Navbar";
import getCurrentUser from "@/app/_actions/get-user";

interface IParams {
    movieId?: string
}

const page = async ({ params }: { params: IParams }) => {
    const movie = await getMovieById(params) as SafeMovie & { user: SafeUser };
    const user = await getCurrentUser()

    if (!movie) {
        return (
            <div>
                <h1>Film tidak ada</h1>
            </div>
        )
    }
    return (
        <>
            <Navbar user={user}/>
            <Details movie={movie} />
        </>
    )
}

export default page