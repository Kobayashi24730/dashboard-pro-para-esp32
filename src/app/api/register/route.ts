import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) {
            return NextResponse.json({ message: "Campos obrigatórios ausentes" }, { status: 400 });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        return NextResponse.json({ message: "Usuário criado com sucesso!" }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "Erro ao criar usuário" }, { status: 500 });
    }
}
