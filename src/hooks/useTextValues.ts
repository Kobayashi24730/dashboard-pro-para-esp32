import json from "./dados.json";

export interface TextFormatValues {
    device_id: string;
    sensor: string;
    estado: boolean;
}

export async function getValues() {
    try {
        const response = await fetch('https://dashboard-pro-para-esp32.onrender.com/api/data/movimento', {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        //const data = await response.json();
        //console.log(data);
        return await response.json();

    } catch (error) {
        console.warn("Erro ao buscar dados:", error);
        return json;
    }
}

export default getValues;