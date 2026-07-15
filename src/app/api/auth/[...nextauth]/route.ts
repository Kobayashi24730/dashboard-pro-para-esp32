import NextAuth from "next-auth/next";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET || "your-secret-key-change-in-production-12345",
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "Email"},
                password: {label: "Senha", type: "password"}
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.email) return null;
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });
                if (!user) {
                    console.log("Sem usuario");
                    return null;
                }
                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
                if (!isPasswordValid) {
                    console.log("Senha invalida!");
                    return null;
                }
                return {
                    id: user.id,
                    nome: user.nome,
                    email: user.email
                }
            }
        })
    ],
    pages: {
        signIn: "/account/login",
    },
    session: { strategy: "jwt" as const },
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: any }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (session.user) {
                (session.user as any).id = token.id as string;
                session.user.name = token.name as string;
            }
            return session;
        },
    }
};

const handle = NextAuth(authOptions);
export { handle as POST, handle as GET };