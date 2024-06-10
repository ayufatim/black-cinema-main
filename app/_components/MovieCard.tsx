'use client'


import FavoriteButton from '@/app/_components/FavoriteButton';
import { Label } from '@/components/ui/label';
import { SafeMovie, SafeUser } from '@/types/types';

interface MovieCardProps {
    movie: SafeMovie;
    currentUser?: SafeUser | null;
    isCount: any
    count: number
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, currentUser, isCount, count }) => {
    const classNameCustom = 'absolute w-[45px] h-[45px] sm:w-[60px] sm:h-[60px] top-0 left-2 rounded-br-[20px] rounded-tl-lg cursor-pointer bg-black p-3 z-20';

    return (
        <>
            <div className='flex flex-row justify-end w-full h-full'>
                {isCount && count > 0 && <Label className={`absolute font-breeser font-bold bottom-0 left-[40px] z-10 text-[200px] text-[#222c38]`}>{count}</Label>}
                <div className={`px-2 relative scale-95 hover:scale-100 transform transition-transform duration-300 ease-in-out z-20 ${isCount && 'w-[70%]'}`}>
                    <a href={`/movie/${movie.id}`} className="block relative">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            className="rounded-lg"
                            loading="lazy"
                            alt={`Poster for ${movie.title}`}
                            fetchPriority="low"
                            height={300}
                        />
                    </a>
                    <FavoriteButton movieId={movie.id} currentUser={currentUser} classNameCustom={classNameCustom} />
                </div>
            </div>
        </>
    );
};

export default MovieCard;
