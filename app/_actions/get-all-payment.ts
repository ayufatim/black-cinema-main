import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllPayment() {
    try {
        const payment = await prisma.payment.findMany();
        return payment;
    } catch (error) {
        console.error('Error fetching payment:', error);
        return [];
    } finally {
        await prisma.$disconnect();
    }
}