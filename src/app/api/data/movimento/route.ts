import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import path from "path";

const pathDB = path.join(process.cwd(), 'backend', 'indentifier.sqlite');
const db = new sqlite3.Database(pathDB);

let ultimoEstado = {
    device_id: "ESP32_PIR_01",
    sensor: "PIR",
    estado: false
}

export async function POST(request: NextRequest){
    ultimoEstado = await request.json();
    db.run(`INSERT INTO sensor_data (device_id, sensor, estado) VALUES (?, ?, ?)`, [ultimoEstado.device_id, ultimoEstado.sensor, ultimoEstado.estado ? 1 : 0]);
    return NextResponse.json({ success: true });
}

export async function GET() {
    const rows = await new Promise((resolve, reject) =>  {
        db.all(`SELECT * FROM sensor_data ORDER BY created_at DESC LIMIT 50`, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
    return NextResponse.json(rows);
}