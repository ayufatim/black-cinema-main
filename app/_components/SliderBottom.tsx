import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import MovieCard from './MovieCard';
import { SafeUser } from '@/types/types';
import { Label } from '@/components/ui/label';
import SkeletonWrapper from '@/components/SkeletonWrapper';

interface MoviesProps {
    movies: any;
    currentUser?: SafeUser | null;
}

const SliderBottom: React.FC<MoviesProps> = ({ movies, currentUser }) => {
    const categories = [
        { title: 'Now Playing', filter: (movie: any) => movie.category.includes('Now Playing') },
        { title: 'Upcoming', filter: (movie: any) => movie.category.includes('Upcoming') },
    ];

    const renderSwiper = (title: string, filteredMovies: any) => {
        return (
            <div className="ml-5 mr-5">
                <Label className='text-2xl pl-3'>{title}</Label>
                <div className='flex flex-row w-full mt-5'>
                    <Swiper
                        slidesPerView={6}
                        spaceBetween={5}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination, Navigation]}
                        navigation={true}
                        className={`w-full`}
                        breakpoints={{
                            320: {
                                slidesPerView: 2,
                                spaceBetween: 5,
                            },
                            480: {
                                slidesPerView: 3,
                                spaceBetween: 5,
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 5,
                            },
                            1024: {
                                slidesPerView: 5,
                                spaceBetween: 5,
                            },
                        }}
                    >
                        {filteredMovies?.map((movie: any, index: any) => {
                            return (
                                <SwiperSlide key={movie.id}>
                                    <MovieCard
                                        movie={movie}
                                        currentUser={currentUser}
                                        isCount={false}
                                        count={0}
                                    />
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            </div>
        );
    };

    return (
        <div className='flex flex-col h-full w-full gap-20'>
            <SkeletonWrapper isLoading={movies.isLoading}>
                {categories.map(({ title, filter }) => renderSwiper(title, movies.data?.filter(filter)))}
            </SkeletonWrapper>
        </div>
    );
};

export default SliderBottom;
