import json from "./dados.json";

export interface TextFormatValues {
    device_id: string;
    sensor: string;
    estado: boolean;
}
export async function getValues() {
    try {
        const response = await fetch('/api/data/movimento', {
            method: "GET",
            cache: "no-store"
        });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return await response.json();

    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return json;
    }
}

export default getValues;