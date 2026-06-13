export interface TextFormatValues {
    device_id: string;
    sensor: string;
    estado: boolean;
}
export const data: TextFormatValues[] = await fetch("http://localhost:3000/api/data/movimento").then( res => res.json() );