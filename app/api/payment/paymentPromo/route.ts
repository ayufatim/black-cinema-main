import { getAllUser } from "@/app/_actions/get-all-user";
import getCurrentUser from "@/app/_actions/get-user";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export default async function GET(
    request: Request
) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return new Response('User not authenticated', { status: 401 });
        }

        const allUsers = await getAllUser();

        const filteredUser = allUsers.find(user => user.id === currentUser.id);
        if (!filteredUser) {
            return new Response('User not found', { status: 404 });
        }

        const paymentPromo = await prisma.paymentPromo.findMany();

        return new Response(JSON.stringify(paymentPromo), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (error) {
        console.error('Error in GET handler:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}

export type getPaymentPromoType = Awaited<ReturnType<typeof getPaymentPromo>>

async function getPaymentPromo(id: any) {
    const paymentPromo = await prisma.paymentPromo.findMany({
        where: {
            id: id
        }
    })

    return await paymentPromo.map((pay) => ({
        ...pay
    }))
}