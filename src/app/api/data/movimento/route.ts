import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({ success: true, message: "API funcionando" });
}
export async function POST(request: NextRequest){
    const data = await request.json();
    console.log(data);
    return NextResponse.json({ success: true, message: "Movimento registrado" });
}