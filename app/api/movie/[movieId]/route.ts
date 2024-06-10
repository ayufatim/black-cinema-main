import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import getCurrentUser from "@/app/_actions/get-user";
import { redirect } from "next/navigation";
import { moviesSchema } from "@/schema/movies";

interface IParams {
    movieId?: string;
}

async function parseBody(request: Request) {
    try {
        const contentType = request.headers.get("content-type");
        if (contentType?.includes("application/json")) {
            return await request.json();
        }
        throw new Error("Unsupported content type");
    } catch (error) {
        console.error("Error parsing request body:", error);
        return { error: "Invalid request body" };
    }
}

export async function PUT(request: Request, { params }: { params: IParams }) {
    const { movieId } = params;

    if (!movieId || typeof movieId !== "string") {
        return NextResponse.error();
    }

    try {
        const updatedMovieData = await parseBody(request);

        const updatedMovie = await prisma.movie.update({
            where: { id: movieId },
            data: updatedMovieData,
        });

        return NextResponse.json(updatedMovie);
    } catch (error) {
        console.error("Error updating movie:", error);
        return NextResponse.error();
    }
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

    const movie = await prisma.movie.deleteMany({
        where: {
            id: movieId
        }
    })

    return NextResponse.json(movie)
}

export async function GET(request: Request) {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/");
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const queryParams = moviesSchema.safeParse({
        id
    });

    if (!queryParams.success) {
        return Response.json(queryParams.error.message, { status: 400 });
    }

    const transaction = await getMovieById(
        queryParams.data.id
    );

    return Response.json(transaction);
}

export type getMovieByIdType = Awaited<
    ReturnType<typeof getMovieById>
>;

async function getMovieById(id: string) {
    const transactions = await prisma.movie.findMany({
        where: {
            id: id
        },
        orderBy: {
            title: "asc",
        },
    });

    return transactions.map((transaction) => ({
        ...transaction
    }));
}
