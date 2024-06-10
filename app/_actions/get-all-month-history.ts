import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllMonthHistory() {
    try {
        const monthHistory = await prisma.monthHistory.findMany();
        return monthHistory;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    } finally {
        await prisma.$disconnect();
    }
}
