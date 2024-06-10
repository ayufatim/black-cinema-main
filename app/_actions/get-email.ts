import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

async function authenticateUser(credentials: any) {
    const { email, password } = credentials;

    if (!password) {
        return null;
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        if (!user) {
            return null;
        }

        if (typeof user.password !== 'string') {
            return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            return { id: user.id, email: user.email };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Authentication error:", error);
    }
}

export default authenticateUser;
