'use client';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Thumbs } from 'swiper/modules';
import { motion } from 'framer-motion';
import SwiperCore from 'swiper';
import debounce from 'lodash.debounce';
import { useMobileMode } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { Label } from '@/components/ui/label';
import { useTheme } from 'next-themes';
import SkeletonWrapper from '@/components/SkeletonWrapper';

const CarouselItem = dynamic(() => import('@/app/_components/CarouselItem'), { ssr: false });

interface MoviesProps {
    movies: any;
    currentUser?: any | null;
}

const Banner: React.FC<MoviesProps> = ({ movies, currentUser }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [visibleThumbnails, setVisibleThumbnails] = useState(5);
    const isMobile = useMobileMode();
    const { theme } = useTheme();

    const filteredMovies = useMemo(() => {
        return movies.data?.filter((movie: any) => movie.category.includes('Popular Movies'));
    }, [movies]);

    const mainSwiperRef = useRef<SwiperCore | null>(null);

    const setMainSwiperRef = useCallback((swiper: SwiperCore) => {
        mainSwiperRef.current = swiper || null;
    }, []);

    const updateThumbnails = useCallback(debounce(() => {
        const thumbnailWidth = 120;
        const maxVisibleThumbnails = Math.min(5, Math.floor(window.innerWidth / thumbnailWidth));
        setVisibleThumbnails(maxVisibleThumbnails - 1);
    }, 500), []);

    useEffect(() => {
        updateThumbnails();
        window.addEventListener('resize', updateThumbnails);
        return () => window.removeEventListener('resize', updateThumbnails);
    }, [updateThumbnails]);

    const handleSlideChange = useCallback((swiper: SwiperCore) => {
        setCurrentImageIndex(swiper.realIndex);
    }, []);

    const handleThumbnailClick = useCallback((index: number) => {
        setCurrentImageIndex(index);
        mainSwiperRef.current?.slideToLoop(index);
    }, []);

    const visibleThumbnailsArray = useMemo(() => {
        const start = Math.max(0, currentImageIndex - Math.floor(visibleThumbnails / 2));
        const end = Math.min(filteredMovies?.length, start + visibleThumbnails);
        return Array.from({ length: end - start }, (_, i) => (start + i) % filteredMovies.length);
    }, [currentImageIndex, visibleThumbnails, filteredMovies]);

    const truncateText = useCallback((text: string, maxLength: number) => {
        return text.length > maxLength ? `${text.substring(0, maxLength - 3)}...` : text;
    }, []);

    const getLastSegment = useCallback((url: string) => {
        return url.split('/').pop();
    }, []);

    return (
        <div className='w-full h-full relative'>
            <div className='relative w-full h-[80vh]'>
                <Swiper
                    onSwiper={setMainSwiperRef}
                    modules={[Autoplay, Thumbs]}
                    slidesPerView={1}
                    autoplay={{ delay: 8000, disableOnInteraction: false }}
                    effect={isMobile ? 'slide' : 'slide'}
                    loop
                    onSlideChange={handleSlideChange}
                >
                    {filteredMovies && filteredMovies.slice(0, 7).map((movie: any) => (
                        <SwiperSlide key={movie.id}>
                            <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
                                <CarouselItem movie={movie} movies={movies} />
                                <div
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '50%',
                                        background: theme === 'light'
                                            ? 'linear-gradient(to top, white 1%, transparent)'
                                            : 'linear-gradient(to top, black 1%, transparent)',
                                    }}
                                />
                                {isMobile === false && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '50%',
                                            height: '100%',
                                            background: theme === 'light'
                                                ? 'linear-gradient(to top, white 1%, transparent)'
                                                : 'linear-gradient(to right, black 20%, transparent)',
                                        }}
                                    />
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {isMobile === false && (
                    <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-20 w-full">
                        {filteredMovies && filteredMovies.slice(0, 7).map((movie: any, index: any) => {
                            return (
                                <>
                                    {currentImageIndex == index &&
                                        <div key={index} className='hidden md:visible'>
                                            <Label>{movie.title}</Label>
                                        </div>
                                    }
                                </>
                            );
                        })}
                        <div className="flex overflow-hidden space-x-4 justify-end">
                            {visibleThumbnailsArray.map((index) => {
                                if (index < 7) {
                                    const movie = filteredMovies[index];
                                    const isCurrentImage = currentImageIndex === index;
                                    const backdropPath = `https://image.tmdb.org/t/p/w300/${getLastSegment(movie.backdrop_path)}`;
                                    const posterPath = `https://image.tmdb.org/t/p/w154/${getLastSegment(movie.poster_path)}`;
                                    const imagePath = isCurrentImage ? backdropPath : posterPath;
                                    const imageHeightClass = isCurrentImage ? 'h-[160px]' : 'h-[160px]';
                                    return (
                                        <div
                                            key={movie.id}
                                            className="cursor-pointer ml-10"
                                            onClick={() => handleThumbnailClick(index)}
                                        >
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, transitionEnd: { overflow: 'hidden' } }}
                                                transition={{ duration: 1 }}
                                                className="flex flex-row h-auto items-center rounded-lg gap-5"
                                            >
                                                <SkeletonWrapper isLoading={movies.isLoading}>
                                                    <motion.img
                                                        src={imagePath}
                                                        alt={movie.title}
                                                        loading="eager"
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1, width: isCurrentImage ? 280 : 130 }}
                                                        transition={{ duration: 0.6 }}
                                                        className={`rounded-lg ${imageHeightClass}`}
                                                    />
                                                </SkeletonWrapper>
                                                {isCurrentImage ? (
                                                    <div className={`absolute w-full h-full backdrop-brightness-80`}>
                                                        <span className="absolute bottom-10 left-5 text-md text-white font-bold overflow-hidden whitespace-nowrap overflow-ellipsis">
                                                            {truncateText(movie.title, 20)}
                                                        </span>
                                                        <span className="absolute bottom-5 left-5 text-sm text-white font-normal overflow-hidden whitespace-nowrap overflow-ellipsis">
                                                            {truncateText(movie.genres.join(', '), 25)}
                                                        </span>
                                                    </div>
                                                )
                                                    :
                                                    <div className={`absolute w-full h-full backdrop-brightness-50`}></div>
                                                }
                                            </motion.div>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Banner;
