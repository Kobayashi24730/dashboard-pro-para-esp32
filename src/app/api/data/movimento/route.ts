import { NextRequest, NextResponse } from "next/server";
import Database from "better-sqlite3";
import path from "path";

const pathDB = path.join(process.cwd(), 'backend', 'identifier.sqlite');
const db = new Database(pathDB);
db.exec(`
CREATE TABLE IF NOT EXISTS sensor_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    device_id TEXT NOT NULL,
    sensor TEXT NOT NULL,
    estado INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP)
`);

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
    const rows = db.prepare(`SELECT * FROM sensor_data ORDER BY created_at DESC LIMIT 50`).all();
    return NextResponse.json(rows);
}