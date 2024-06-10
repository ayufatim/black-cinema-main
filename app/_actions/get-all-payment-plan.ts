import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllPaymentPlan() {
    try {
        const paymentPlan = await prisma.paymentPlan.findMany();
        return paymentPlan;
    } catch (error) {
        console.error('Error fetching paymentPlan:', error);
        return [];
    } finally {
        await prisma.$disconnect();
    }
}