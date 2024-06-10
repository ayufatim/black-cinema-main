"use server";

import getCurrentUser from "@/app/_actions/get-user";
import prisma from "@/lib/prisma";
import {
    CreateTransactionSchemaType,
    transactionSchema,
} from "@/schema/transaction";
import { redirect } from "next/navigation";

export async function CreateTransaction(form: CreateTransactionSchemaType) {
    const parsedBody = transactionSchema.safeParse(form);

    if (!parsedBody.success) {
        throw new Error(parsedBody.error.message);
    }
    const user = await getCurrentUser();

    if (!user) redirect("/signin");

    const { amount, description, date, paymentId, type } = parsedBody.data;

    await prisma.$transaction([
        prisma.transaction.create({
            data: {
                userId: user.id,
                amount,
                date,
                description: description || "",
                type,
                paymentId: paymentId || null
            },
        }),

        prisma.monthHistory.upsert({
            where: {
                day_month_year_userId: {
                    userId: user.id,
                    day: date.getUTCDate(),
                    month: date.getUTCMonth(),
                    year: date.getUTCFullYear(),
                },
            },
            create: {
                userId: user.id,
                day: date.getUTCDate(),
                month: date.getUTCMonth(),
                year: date.getUTCFullYear(),
                expense: type === "expense" ? amount : 0,
                income: type === "income" ? amount : 0,
                paymentId: paymentId || null
            },
            update: {
                expense: {
                    increment: type === "expense" ? amount : 0,
                },
                income: {
                    increment: type === "income" ? amount : 0,
                },
            },
        }),

        prisma.yearHistory.upsert({
            where: {
                month_year_userId: {
                    userId: user.id,
                    month: date.getUTCMonth(),
                    year: date.getUTCFullYear(),
                },
            },
            create: {
                userId: user.id,
                month: date.getUTCMonth(),
                year: date.getUTCFullYear(),
                expense: type === "expense" ? amount : 0,
                income: type === "income" ? amount : 0,
                paymentId: paymentId || null
            },
            update: {
                expense: {
                    increment: type === "expense" ? amount : 0,
                },
                income: {
                    increment: type === "income" ? amount : 0,
                },
            },
        }),
    ]);
}
