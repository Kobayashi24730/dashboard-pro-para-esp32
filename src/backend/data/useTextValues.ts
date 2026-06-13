export interface TextFormatValues {
    device_id: string;
    sensor: string;
    estado: boolean;
}
export const data: TextFormatValues[] = await fetch("https://dashboard-pro-para-esp32.onrender.com/api/data/movimento").then( res => res.json() );