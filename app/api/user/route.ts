import prisma from "@/lib/prisma"
import getCurrentUser from "@/app/_actions/get-user"
import { getAllUser } from "@/app/_actions/get-all-user"

export async function GET(request: Request) {
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

        return new Response(JSON.stringify(allUsers), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (error) {
        console.error('Error in GET handler:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}

export type getUsersType = Awaited<
    ReturnType<typeof getUsers>
>;

async function getUsers(userId: any) {
    const users = await prisma.user.findMany({
        where: {
            id: userId
        }
    });

    return users.map((pay) => ({
        ...pay
    }));
}