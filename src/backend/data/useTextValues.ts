export interface TextFormatValues {
    name: string;
    pir: number;
    vibracao: number;
    status: string;
}

export const data: TextFormatValues[] = [
    { name: "10:00", pir: 0, vibracao: 45, status: "Normal" },
    { name: "10:05", pir: 1, vibracao: 680, status: "Movimento e Vibração" },
    { name: "10:10", pir: 1, vibracao: 912, status: "Alerta Crítico" },
    { name: "10:15", pir: 0, vibracao: 210, status: "Vibração Residual" },
    { name: "10:20", pir: 0, vibracao: 15, status: "Normal" },
    { name: "10:25", pir: 1, vibracao: 450, status: "Presença Detectada" },
    { name: "10:30", pir: 0, vibracao: 30, status: "Normal" },
];