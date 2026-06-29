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
    const sensor = await prisma.SensorData.create({
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
    const rows = await prisma.SensorData.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });
    return NextResponse.json(rows);
}