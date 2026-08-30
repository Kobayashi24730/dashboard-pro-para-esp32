export interface TextFormatValues {
    device_id: string;
    sensor: string;
    estado: boolean;
}

export interface SensorData {
    id?: number;
    device_id: string;
    sensor: string;
    estado: number | boolean;
    valor?: number | string | null;
    created_at?: string;
}