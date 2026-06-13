export interface TextFormatValues {
    device_id: string;
    sensor: string;
    estado: boolean;
}
export const data: TextFormatValues[] = await fetch("/api/data/movimento").then( res => res.json() );