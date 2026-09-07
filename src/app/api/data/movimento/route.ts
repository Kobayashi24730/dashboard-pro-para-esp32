import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest){
    try {
        const body = await request.json();
        const parsedValue = body.value !== null && body.value !== undefined && !isNaN(Number(body.value)) ? Number(body.value) : null;
        const parsedEstado = typeof body.estado === "string" ? body.estado.toLowerCase() === "true" : Boolean(body.estado);
        const sensor = await prisma.sensorData.create({
            data: {
                device_id: body.device_id,
                sensor: body.sensor,
                estado: parsedEstado,
                value: parsedValue
            }
        });
        return NextResponse.json({ success: true, data: sensor }, { status: 201 });
    } catch (error) {
        console.error("Erro no POST /api/data:", error);
        return NextResponse.json(
            { error: "Erro ao salvar dados no banco" },
            { status: 500 }
        );
    }
}

export async function GET() {
  try {
    const rows = await prisma.sensorData.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 50, 
    });

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Erro no GET /api/data:", error);
    return NextResponse.json(
      { error: "Erro ao buscar dados do banco" },
      { status: 500 }
    );
  }
}