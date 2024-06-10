'use client'

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

import axios from "axios"
import { useCallback } from "react"

import { SafeUser } from "@/types/types"
import Swal from "sweetalert2"

interface IUseFavorite {
    movieId: string
    currentUser?: SafeUser | null
}

export const useFavorite = ({ movieId, currentUser }: IUseFavorite) => {
    const [hasFavorited, setHasFavorited] = useState(false);

    useEffect(() => {
        setHasFavorited(currentUser?.favoriteMovie.includes(movieId) ?? false);
    }, [currentUser, movieId]);

    const toggleFavorite = useCallback(async () => {
        if (!currentUser) {
            return await Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'You must login!',
            });
        }

        try {
            let request;

            if (hasFavorited) {
                request = axios.delete;
                await request(`/api/favorites/${movieId}`);
                setHasFavorited(false);
                await Swal.fire({
                    icon: 'error',
                    title: 'Unfavorited',
                    text: 'Movie removed from favorit!',
                });
            } else {
                request = axios.post;
                await request(`/api/favorites/${movieId}`);
                setHasFavorited(true);
                await Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Movie added in favorit!',
                });
            }

        } catch (error) {
            console.log(error);
        }
    }, [currentUser, hasFavorited, movieId]);

    return {
        hasFavorited,
        toggleFavorite,
    };
};


import { useState, useEffect } from 'react';

export const useMobileMode = () => {
    const [isMobile, setIsMobile] = useState(false);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return isMobile;
};