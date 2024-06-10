import { NextResponse } from "next/server"
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma"

export async function POST(
    request: Request,
) {
    const body = await request.json()
    const {
        name,
        email,
        image,
        password,
        role,
        updatedAt
    } = body

    const hashedPassword = await bcrypt.hash(password, 10);

    const movie = await prisma.user.create({
        data: {
            name,
            email,
            image,
            password: hashedPassword,
            role,
            updatedAt
        },
    })

    return NextResponse.json(movie)
}