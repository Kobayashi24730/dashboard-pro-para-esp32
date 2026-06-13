import { NextRequest, NextResponse } from "next/server";
import Database from "better-sqlite3";
import path from "path";

const pathDB = path.join(process.cwd(), 'backend', 'indentifier.sqlite');
const db = new Database(pathDB);

let ultimoEstado = {
    device_id: "ESP32_PIR_01",
    sensor: "PIR",
    estado: false
}

export async function POST(request: NextRequest){
    ultimoEstado = await request.json();
    db.prepare(`INSERT INTO sensor_data (device_id, sensor, estado) VALUES (?, ?, ?)`).run([ultimoEstado.device_id, ultimoEstado.sensor, ultimoEstado.estado ? 1 : 0]);
    return NextResponse.json({ success: true });
}

export async function GET() {
    const rows = await new Promise((resolve, reject) =>  {
        db.prepare(`SELECT * FROM sensor_data ORDER BY created_at DESC LIMIT 50`).all();
    return NextResponse.json(rows);
}