import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) {
            return NextResponse.json({ message: "Campos obrigatórios ausentes" }, { status: 400 });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const response = await prisma.user.create({
            data: {
                nome: "Usuario",
                email: email,
                password: hashPassword
            }
        });
        return NextResponse.json({ message: "Usuário criado com sucesso!" }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "Erro ao criar usuário" }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get("email");
        const password = searchParams.get("password");
        if (!email || !password) {
            return NextResponse.json({ message: "Campos obrigatórios ausentes"}, { status: 400 });
        }
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user) return NextResponse.json({ message: "Usuário não encontrado" }, { status: 404 });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return NextResponse.json({ message: "Senha invalida!" }, { status: 401 });
        return NextResponse.json({
            id: user.id,
            nome: user.nome,
            email: user.email
        });
    } catch(err) {
        return NextResponse.json({ message: "Erro ao autenticar usuário" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ message: "Usuário não autenticado" }, { status: 401 });
        }
        const { name } = await request.json();
        const data = await prisma.user.update({
            where: {
                email: session.user.email
            }, data: {
                nome: name
            }
        });
        return NextResponse.json({ message: "Usuário atualizado com sucesso!" }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Erro ao atualizar usuário" }, { status: 500 });
    }
}