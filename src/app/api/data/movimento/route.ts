import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

let ultimoEstado = {
    device_id: "ESP32_PIR_01",
    sensor: "PIR",
    estado: false,
    valor: null
}

export async function POST(request: NextRequest){
    ultimoEstado = await request.json();
    const sensor = await prisma.sensorData.create({
        data: {
            device_id: ultimoEstado.device_id,
            sensor: ultimoEstado.sensor,
            estado: Boolean(ultimoEstado.estado),
            valor: Number(ultimoEstado.valor)
        }
    });
    return NextResponse.json({ success: true });
}

export async function GET() {
    const rows = await prisma.sensorData.findMany({
        orderBy: {
            created_at: "desc"
        }
    });
    return NextResponse.json(rows);
}