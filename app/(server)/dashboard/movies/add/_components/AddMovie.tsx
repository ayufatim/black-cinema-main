'use client'

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { fetchPopularMovies, fetchTrailerById, genres, categories } from './data';
import fetchPopularMovieById from './data';
import axios from 'axios';
import Swal from 'sweetalert2';
import ImageUpload from '@/components/inputs/imageUpload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectTrigger } from '@/components/ui/select';

interface Movie {
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
    id: number;
}

interface TrailerData {
    key: string;
}

const AddMovie = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<any[]>([]);
    const [trailerData, setTrailerData] = useState<TrailerData | null>(null);
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [selectedTitle, setSelectedTitle] = useState<string>('');
    const [numberPage, setNumberPage] = useState(1);
    const [movieName, setMovieName] = useState('');
    const [movieOverview, setMovieOverview] = useState('')
    let [moviePosterPath, setMoviePosterPath] = useState('')
    let [movieBackdropPath, setMovieBackdropPath] = useState('')
    const [movieReleaseDate, setMovieReleaseDate] = useState('')
    const [movieDuration, setMovieDuration] = useState('')
    const [voteAverage, setVoteAverage] = useState('')
    var [trailerPath, setTrailerPath] = useState('')

    const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FieldValues>({
        defaultValues: {
            title: '',
            overview: '',
            poster_path: '',
            backdrop_path: '',
            genres: [],
            category: [],
            release_date: '',
            trailer: '',
            movieDuration: '',
            vote_average: 0,
        },
    });

    useEffect(() => {
        const fetchMovies = async () => {
            const movies = await fetchPopularMovies(numberPage);
            setPopularMovies(movies);
        };
        fetchMovies();
    }, [numberPage]);


    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (selectedTitle) {
                const details = await fetchPopularMovieById(selectedTitle);
                setMovieName(details.title);
                setMovieOverview(details.overview)
                setMoviePosterPath(`https://image.tmdb.org/t/p/w500${details.poster_path}`)
                setMovieBackdropPath(`https://image.tmdb.org/t/p/w1280${details.backdrop_path}`)
                setMovieReleaseDate(details.release_date)
                setMovieDuration(details.runtime.toString())
                setVoteAverage(details.vote_average)
                const genreOptions = details.genres?.map((genre: any) => ({ value: genre.id, label: genre.name }));
                setSelectedGenres(genreOptions);
            }
        }; fetchMovieDetails();
    }, [selectedTitle]);

    useEffect(() => {
        if (selectedTitle !== '') {
            const fetchTrailerData = async () => {
                try {
                    const trailerData = await fetchTrailerById(selectedTitle);
                    setTrailerData(trailerData || null);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchTrailerData();
        }
    }, [selectedTitle]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        try {
            const formattedData = {
                ...data,
                title: movieName,
                overview: movieOverview,
                poster_path: moviePosterPath,
                backdrop_path: movieBackdropPath,
                release_date: movieReleaseDate,
                movieDuration: movieDuration,
                vote_average: voteAverage,
                genres: selectedGenres.map((genre) => genre.label),
                category: selectedCategories.map((category) => category.label),
                trailer: trailerData ? `https://www.youtube.com/embed/${trailerData.key}` : data.trailer
            };
            await axios.post('/api/movie', formattedData);
            await Swal.fire({ icon: 'success', title: 'Success', text: 'Movie added successfully!' });
            router.push('/dashboard/movies');
            router.refresh();
            reset();
        } catch (error) {
            await Swal.fire({ icon: 'error', title: 'Error', text: 'Failed add movie!' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChangeGenres = (selectedGenre: any) => {
        setSelectedGenres(selectedGenre);
    };

    const handleChangeCategories = (selectedCategory: any) => {
        setSelectedCategories(selectedCategory);
    };

    const handleChangeOverview = (e: any) => {
        setMovieOverview(e.target.value);
    };

    const handleChangeReleaseDate = (e: any) => {
        setMovieReleaseDate(e.target.value);
    };

    const handleChangeTrailer = (e: any) => {
        setTrailerPath(e.target.value);
    };

    const handleChangeDuration = (e: any) => {
        setMovieDuration(e.target.value);
    };

    return (
        <div className="flex justify-center w-full">
            <form onSubmit={handleSubmit(onSubmit)} className='flex w-[90vw] lg:w-[80vw] flex-col items-center'>
                <Label className="flex justify-center text-[35px] pt-5 mb-10">Tambah Data</Label>
                <div className="flex flex-col lg:flex-row w-full items-center justify-center gap-10">
                    <div className="flex flex-col justify-center items-center gap-3 h-fit">
                        <div className="flex flex-col w-full gap-3">
                            <Label>Judul:</Label>
                            <Input type="text" placeholder="masukkan judul" value={movieName} required />
                            <div className="flex flex-row w-full gap-3">
                                <Select>
                                    <SelectTrigger>
                                        <Input
                                            type="text"
                                            value={movieName}
                                            placeholder="Pilih Title"
                                            readOnly
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {popularMovies.map((movie) => (
                                            <SelectGroup
                                                key={movie.id}
                                                className='cursor-pointer'
                                                onClick={() => {
                                                    setSelectedTitle(movie.id.toString());
                                                }}
                                            >
                                                {movie.title}
                                            </SelectGroup>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Input type="number" value={numberPage} onChange={(e) => setNumberPage(Number(e.target.value))} className='w-fit' />
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-3 h-fit">
                            <Label>Pilih Genre:</Label>
                            <Select>
                                <SelectTrigger>
                                    <Input
                                        type="text"
                                        value={selectedGenres?.map((genre) => genre.label).join(', ')}
                                        placeholder="Select genres..."
                                        readOnly
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {genres.map((genre) => (
                                        <SelectGroup
                                            key={genre.id}
                                            onClick={() => {
                                                const genreExists = selectedGenres.some((cat) => cat.value === genre.id);
                                                if (!genreExists) {
                                                    handleChangeGenres([...selectedGenres, { value: genre.id, label: genre.name }]);
                                                } else {
                                                    handleChangeGenres(selectedGenres.filter((cat) => cat.value !== genre.id));
                                                }
                                            }}
                                        >
                                            {genre.name}
                                        </SelectGroup>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-3 w-full">
                            <Label>Deskripsi:</Label>
                            <Textarea {...register('overview')} placeholder="deskripsi..." value={movieOverview} onChange={handleChangeOverview} />
                        </div>
                        <div className="flex flex-col w-full gap-3">
                            <Label>Pilih Kategori:</Label>
                            <Select>
                                <SelectTrigger>
                                    <Input
                                        type="text"
                                        value={selectedCategories.map((category) => category.label).join(', ')}
                                        placeholder="Select categories..."
                                        readOnly
                                        required
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectGroup
                                            key={category.id}
                                            onClick={() => {
                                                const categoryExists = selectedCategories.some((cat) => cat.value === category.id);
                                                if (!categoryExists) {
                                                    handleChangeCategories([...selectedCategories, { value: category.id, label: category.name }]);
                                                } else {
                                                    handleChangeCategories(selectedCategories.filter((cat) => cat.value !== category.id));
                                                }
                                            }}
                                        >
                                            {category.name}
                                        </SelectGroup>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col w-full gap-3">
                            <Label>Pilih Tanggal Rilis:</Label>
                            <Input {...register('release_date')} type="date" value={movieReleaseDate} placeholder="pilih tanggal..." />
                        </div>
                        <div className="flex flex-col w-full gap-3">
                            <Label>Masukkan Durasi:</Label>
                            <Input {...register('movieDuration')} type="text" value={movieDuration} placeholder="input durasi (dalam menit)" />
                        </div>
                        <div className="flex flex-col w-full gap-3">
                            <Label>Masukkan Link:</Label>
                            <Input {...register('trailer')} type="text" placeholder="https://" value={trailerData ? `https://www.youtube.com/embed/${trailerData.key}` : trailerPath} />
                        </div>
                    </div>
                    <div className='flex flex-col gap-10 items-center'>
                        <div className="flex flex-col w-fit gap-3 h-fit">
                            <Label>Pilih Poster:</Label>
                            <ImageUpload
                                value={moviePosterPath}
                                onChange={(value) => setValue('poster_path', value)}
                            />
                        </div>
                        <div className="flex flex-col w-fit gap-3 h-fit">
                            <Label>Pilih Backdrop:</Label>
                            <ImageUpload
                                value={movieBackdropPath}
                                onChange={(value) => setValue('backdrop_path', value)}
                            />
                        </div>
                    </div>
                </div>
                <Button type="submit" variant={'secondary'} className='mt-10'>
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default AddMovie;