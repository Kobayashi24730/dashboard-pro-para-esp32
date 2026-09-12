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

export type CardValueItem = {
    device_id: string;
    sensor: string;
    estado: number | boolean;
    value?: number;
    name?: string;
};


export type Status = "Normal" | "Warning" | "Critical";

export type Theme = {
  bgCard: string;
  badgeBg: string;
  badgeText: string;
  strokeColor: string;
  dotColor: string;
  iconBg: string;
  iconColor: string;
};

export interface DetalhesPirProps {
    isOpen: boolean
    onClose: () => void
    values: any
    bestValue?: number
}