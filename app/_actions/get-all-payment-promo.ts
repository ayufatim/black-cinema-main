import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllPaymentPromo() {
    try {
        const paymentPromo = await prisma.paymentPromo.findMany();
        return paymentPromo;
    } catch (error) {
        console.error('Error fetching paymentPromo:', error);
        return [];
    } finally {
        await prisma.$disconnect();
    }
}