import { NextRequest, NextResponse } from "next/server";

let ultimoEstado = {
    device_id: "ESP32_PIR_01",
    sensor: "PIR",
    estado: false
}
export async function POST(request: NextRequest){
    ultimoEstado = await request.json();
    return NextResponse.json({ success: true });
}

export async function GET() {
    return NextResponse.json([ultimoEstado]);
}