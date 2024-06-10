import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllUser() {
    try {
        const user = await prisma.user.findMany();
        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        return [];
    } finally {
        await prisma.$disconnect();
    }
}