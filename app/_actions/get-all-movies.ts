import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllMovies() {
    try {
        const movies = await prisma.movie.findMany();
        return movies;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    } finally {
        await prisma.$disconnect();
    }
}
