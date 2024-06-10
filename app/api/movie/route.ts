import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"
import getCurrentUser from "@/app/_actions/get-user"
import { getAllUser } from "@/app/_actions/get-all-user"
import { getAllMovies } from "@/app/_actions/get-all-movies"

export async function POST(
    request: Request,
) {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error()
    }

    const body = await request.json()
    const {
        title,
        overview,
        poster_path,
        backdrop_path,
        genres,
        category,
        release_date,
        trailer,
        movieDuration,
        vote_average
    } = body

    const movie = await prisma.movie.create({
        data: {
            title,
            overview,
            poster_path,
            backdrop_path,
            genres,
            category,
            release_date,
            trailer,
            movieDuration,
            vote_average,
            userId: currentUser.id,
        },
    })

    return NextResponse.json(movie)
}

export async function GET(request: Request) {
    try {
        const movies = await getAllMovies();

        return new Response(JSON.stringify(movies), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (error) {
        console.error('Error in GET handler:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}

export type getMoviesType = Awaited<
    ReturnType<typeof getMovies>
>;

async function getMovies(userId: any) {
    const movies = await prisma.movie.findMany({
        where: {
            userId: userId
        }
    });

    return movies.map((movie) => ({
        ...movie
    }));
}