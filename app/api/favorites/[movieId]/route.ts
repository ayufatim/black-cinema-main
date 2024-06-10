import { NextResponse } from "next/server"

import getCurrentUser from "@/app/_actions/get-user"
import prisma from "@/lib/prisma"

interface IParams {
    movieId?: string
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return NextResponse.error()
    }

    const { movieId } = params

    if (!movieId || typeof movieId !== 'string') {
        throw new Error('Invalid ID')
    }

    let favoriteMovie = [...(currentUser.favoriteMovie || [])]

    favoriteMovie.push(movieId)

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteMovie
        }
    });

    return NextResponse.json(user)
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error()
    }

    const { movieId } = params

    if (!movieId || typeof movieId !== 'string') {
        throw new Error('Invalid ID')
    }

    let favoriteMovie = [...(currentUser.favoriteMovie || [])]

    favoriteMovie = favoriteMovie.filter((id) => id !== movieId)

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteMovie
        }
    })

    return NextResponse.json(user)
}