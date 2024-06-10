'use client'

import SkeletonWrapper from '@/components/SkeletonWrapper';
import React, { useState, useEffect } from 'react';

const CarouselItemImage = ({ movie, movies }: { movie: any, movies: any }) => {
    const getLastSegment = (url: string) => {
        const segments = url.split('/');
        return segments.pop();
    };

    const lastSegmentBack = getLastSegment(movie.poster_path);

    const [imageSrc, setImageSrc] = useState(movie.backdrop_path);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 500) {
                setImageSrc(`https://image.tmdb.org/t/p/w500/${lastSegmentBack}`);
            } else {
                setImageSrc(movie.backdrop_path);
            }
        };

        handleResize();

        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(document.body);

        return () => {
            resizeObserver.unobserve(document.body);
        };
    }, [movie.backdrop_path, lastSegmentBack]);

    return (
        <SkeletonWrapper isLoading={movies.isLoading}>
            <img
                style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
                src={imageSrc}
                alt={movie.title}
                loading="lazy"
                fetchPriority="high"
            />
        </SkeletonWrapper>
    );
};

const Carousel = ({ movie, movies }: { movie: any, movies: any }) => {
    return (
        <div>
            <CarouselItemImage movie={movie} movies={movies} />
        </div>
    );
};

export default Carousel;
