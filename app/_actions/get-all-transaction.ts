import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllTransaction() {
    try {
        const transaction = await prisma.transaction.findMany();
        return transaction;
    } catch (error) {
        console.error('Error fetching payment:', error);
        return [];
    } finally {
        await prisma.$disconnect();
    }
}