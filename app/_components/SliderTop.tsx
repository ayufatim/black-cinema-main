import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { SafeUser } from '@/types/types';
import { Label } from '@/components/ui/label';
import SkeletonWrapper from '@/components/SkeletonWrapper';
import Link from 'next/link';
import { ebGaramond } from '@/lib/font';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import FavoriteButton from './FavoriteButton';

interface MoviesProps {
    movies: any;
    currentUser?: SafeUser | null;
}

const SliderTop: React.FC<MoviesProps> = ({ movies, currentUser }) => {
    const categories = [
        { title: '15 Popular Movies', filter: (movie: any) => movie.category.includes('Popular Movies') },
        { title: 'Top 15 Picks', filter: (movie: any) => movie.category.includes('Top Movies') },
    ];

    const classNameCustom = 'absolute w-[45px] h-[45px] sm:w-[60px] sm:h-[60px] top-0 left-0 rounded-br-[20px] rounded-tl-md cursor-pointer bg-black p-3 z-40';

    const renderSwiper = useCallback((title: string, filteredMovies: any) => {
        const sliderRef = useRef<HTMLDivElement>(null);
        const [atStart, setAtStart] = useState(true);
        const [atEnd, setAtEnd] = useState(false);

        const checkButtons = useCallback(() => {
            if (sliderRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
                setAtStart(scrollLeft === 0);
                setAtEnd(scrollLeft + clientWidth >= scrollWidth);
            }
        }, []);

        useEffect(() => {
            checkButtons();
        }, [filteredMovies, checkButtons]);

        const scrollLeft = useCallback(() => {
            if (sliderRef.current) {
                sliderRef.current.scrollBy({ left: -900, behavior: 'smooth' });
                setTimeout(checkButtons, 300);
            }
        }, [checkButtons]);

        const scrollRight = useCallback(() => {
            if (sliderRef.current) {
                sliderRef.current.scrollBy({ left: 900, behavior: 'smooth' });
                setTimeout(checkButtons, 300);
            }
        }, [checkButtons]);

        return (
            <div className='w-full'>
                <div className='w-full pl-[7.5vw] flex overflow-y-visible'>
                    <div className="flex flex-col sm:flex-row w-full">
                        <div className="w-full self-center text-center sm:text-start sm:min-w-[190px] max-w-[190px] h-[270px] mr-50 flex flex-col justify-between overflow-y-visible">
                            <div className='flex flex-col gap-5'>
                                <Label className='font-black text-[24px] mt-0'>{title}</Label>
                                <Label className='text-[#8a8d98] text-[16px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the</Label>
                            </div>
                        </div>
                        <div className="relative flex overflow-hidden items-center">
                            {!atStart && (
                                <button
                                    onClick={scrollLeft}
                                    className="absolute left-0 z-10 p-2 h-full shadow-lg duration-200 hover:bg-gray-500/25"
                                >
                                    <ChevronLeft />
                                </button>
                            )}
                            <div ref={sliderRef} className='overflow-x-hidden overflow-y-hidden scrollbar-none relative flex flex-nowrap items-center'>
                                {filteredMovies && filteredMovies.slice(0, 15).map((movie: any, index: any) => (
                                    <div
                                        key={movie.id}
                                        className="flex items-end h-full mr-3"
                                    >
                                        <Label className={`${ebGaramond.className} overflow-hidden text-end flex items-end h-full leading-none text-[180px] tracking-[-15px] font-bold text-[#222c38]`}>
                                            {index + 1}
                                        </Label>
                                        <div className='w-[190px] overflow-hidden' style={{ marginInlineEnd: '12px' }}>
                                            <div className="relative flex overflow-hidden">
                                                <div className='w-[100%] max-h-none scale-95 hover:scale-100 duration-300'>
                                                    <div className='w-full' style={{ maxHeight: 'none', userSelect: 'none', pointerEvents: 'none' }}>
                                                        <Link href={`/movie/${movie.id}`} className='z-30 w-[190px] h-full'>
                                                            <img
                                                                src={movie.poster_path}
                                                                alt={`Slide ${movie.title}`}
                                                                className="inline-block w-full h-full object-cover rounded-lg"
                                                                style={{ pointerEvents: 'auto' }}
                                                            />
                                                        </Link>
                                                    </div>
                                                    <FavoriteButton movieId={movie.id} classNameCustom={classNameCustom} currentUser={currentUser}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {!atEnd && (
                                <button
                                    onClick={scrollRight}
                                    className="absolute right-0 z-10 p-2 h-full shadow-lg duration-200 hover:bg-gray-500/25"
                                >
                                    <ChevronRight />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }, []);

    const filteredMoviesByCategory = useMemo(() => {
        return categories.map(({ title, filter }) => ({
            title,
            movies: movies.data?.filter(filter),
        }));
    }, [movies.data, categories]);

    return (
        <div className='flex flex-col h-full w-full gap-20'>
            <SkeletonWrapper isLoading={movies.isLoading}>
                {filteredMoviesByCategory.map(({ title, movies }) => renderSwiper(title, movies))}
            </SkeletonWrapper>
        </div>
    );
};

export default SliderTop;
