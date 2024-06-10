import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllYearHistory() {
    try {
        const yearHistory = await prisma.yearHistory.findMany();
        return yearHistory;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    } finally {
        await prisma.$disconnect();
    }
}
