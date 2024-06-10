import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllPaymentCard() {
    try {
        const paymentCard = await prisma.paymentCard.findMany();
        return paymentCard;
    } catch (error) {
        console.error('Error fetching paymentCard:', error);
        return [];
    } finally {
        await prisma.$disconnect();
    }
}