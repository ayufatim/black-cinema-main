import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"
import getCurrentUser from "@/app/_actions/get-user"

export async function POST(
    request: Request,
) {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error()
    }

    const body = await request.json()
    const {
        paymentId,
        amount,
        description,
        date,
        type
    } = body

    const transaction = await prisma.transaction.create({
        data: {
            paymentId,
            amount,
            description,
            date,
            userId: currentUser.id,
            type,
        },
    })

    await prisma.$transaction([
        prisma.monthHistory.upsert({
            where: {
                day_month_year_userId: {
                    userId: currentUser.id,
                    day: new Date(date).getUTCDate(),
                    month: new Date(date).getUTCMonth(),
                    year: new Date(date).getUTCFullYear(),
                },
            },
            create: {
                userId: currentUser.id,
                transacId: transaction.id,
                day: new Date(date).getUTCDate(),
                month: new Date(date).getUTCMonth(),
                year: new Date(date).getUTCFullYear(),
                expense: 0,
                income: transaction.amount,
                paymentId: transaction.paymentId || null
            },
            update: {
                expense: {
                    increment: type === "expense" ? amount : 0,
                },
                income: {
                    increment: type === "income" ? amount : transaction.amount,
                },
            },
        }),

        prisma.yearHistory.upsert({
            where: {
                month_year_userId: {
                    userId: currentUser.id,
                    month: new Date(date).getUTCMonth(),
                    year: new Date(date).getUTCFullYear(),
                },
            },
            create: {
                userId: currentUser.id,
                transacId: transaction.id,
                month: new Date(date).getUTCMonth(),
                year: new Date(date).getUTCFullYear(),
                expense: 0,
                income: transaction.amount,
                paymentId: transaction.paymentId || null
            },
            update: {
                expense: {
                    increment: type === "expense" ? amount : 0,
                },
                income: {
                    increment: type === "income" ? amount : transaction.amount,
                },
            },
        }),
    ]);

    return NextResponse.json(transaction)
}