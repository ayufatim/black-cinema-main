import prisma from '@/lib/prisma'

interface IParams {
    movieId?: string
}

export default async function getMovieById(
    params: IParams) {
    try {
        const { movieId } = params

        const movie = await prisma.movie.findUnique({
            where: {
                id: movieId
            },
            include: {
                user: true
            }
        })
        if (!movie) return null

        return {
            ...movie,
            createdAt: movie.createdAt.toISOString(),
            user: {
                ...movie.user,
                createdAt: movie.user.createdAt.toISOString(),
                updatedAt: movie.user.updatedAt.toISOString(),
                emailVerified: movie.user.emailVerified?.toString() || null
            }
        }
    } catch (err: any) {
        throw new Error(err)
    }
}
