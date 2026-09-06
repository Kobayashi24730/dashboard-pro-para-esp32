export interface TextFormatValues {
    device_id: string;
    sensor: string;
    estado: boolean;
}

export interface SensorData {
    id?: number;
    device_id: string;
    timestamp: string;
    sensor: string;
    estado: number | boolean;
    value?: number | string | null;
    UltimoUpdate: string;
    created_at?: string;
}