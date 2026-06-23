import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "Email" },
                password: { label: "Senha", type: "password"}
            },
            async authorize(credentials){
                if (!credentials?.email || !credentials?.password) return null;
                return { id: "1",email: credentials.email, name: "Usuario" }
            }
        })
    ],
    pages: {
        signIn: "/account/login",
    },
    session: { strategy: "jwt" as const }
};

const handle = NextAuth(authOptions);
export { handle as POST, handle as GET };