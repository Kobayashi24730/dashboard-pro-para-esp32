import json from "./dados.json";

export interface TextFormatValues {
    device_id: string;
    sensor: string;
    estado: boolean;
}

async function getValues() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
        const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
        const response = await fetch(`${cleanBaseUrl}/api/data/movimento`, {
            method: "GET",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        const data = await response.json();
        console.log(data);
        return data;

    } catch (err) {
        console.error("❌ Falha na sincronização. Aplicando dados locais (dados.json):", err);
        return json;
    }
}

export default getValues;