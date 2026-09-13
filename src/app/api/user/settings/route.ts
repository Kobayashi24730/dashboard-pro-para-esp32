import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const { email, password, nome } = await request.json();
        if (!email || !password) {
            return NextResponse.json({ message: "Campos obrigatórios ausentes" }, { status: 400 });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: {
                nome: nome,
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
        const { email, password } = await request.json();
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
        const { nome, email } = await request.json();
        if (email && email !== session.user.email) {
            const emailExists = await prisma.user.findUnique({where: {email}});
            if (emailExists) {
                return NextResponse.json({ message: "E-mail ja cadastrado" }, { status: 400 });
            }
        }
        const updatedUser = await prisma.user.update({
            where: {
                email: session.user.email
            }, data: {
                nome: nome,
                ...(email && {email})

            }
        });
        return NextResponse.json({ 
            message: "Usuário atualizado com sucesso!",
            user: {
                nome: updatedUser.nome,
                email: updatedUser.email
            }
        }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Erro ao atualizar usuário" }, { status: 500 });
    }
}