export const genres = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
]

export const categories = [
    {
        "id": 1,
        "name": "Popular Movies"
    },
    {
        "id": 2,
        "name": "Top Movies"
    },
    {
        "id": 3,
        "name": "Now Playing"
    },
    {
        "id": 4,
        "name": "Upcoming"
    }
]

export const fetchPopularMovies = async (page: any) => {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
            },
        });

        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }

        const data: { results: any[] } = await res.json();
        return data.results;
    } catch (error) {
        console.error(error);
        return [];
    }
};

const fetchPopularMovieById = async (movieId: string) => {
    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API}`
        );
        return await res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

import axios from 'axios';

export const fetchTrailerById = async (selectedTitle: string) => {
    try {
        const res = await axios.get(
            `https://api.themoviedb.org/3/movie/${selectedTitle}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API}`
        );
        const data = res.data;
        if (data.results.length > 0) {
            return data.results[0];
        } else {
            return null;
        }
    } catch (error) {
        throw error
    }
};


export default fetchPopularMovieById