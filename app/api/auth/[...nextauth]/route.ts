import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const authOptions: AuthOptions = {
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/signin",
    },
    adapter: PrismaAdapter(prisma) as any,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            profile(profile) {
                return {
                    id: profile.sub,
                    name: `${profile.given_name} ${profile.family_name}`,
                    email: profile.email,
                    image: profile.picture,
                    role: profile.role ? profile.role : "user",
                };
            },
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid credentials')
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!user || !user?.password) {
                    throw new Error('Invalid credentials')
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isCorrectPassword) {
                    throw new Error('Invalid credentials')
                }

                return user;
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user.role = token.role;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };