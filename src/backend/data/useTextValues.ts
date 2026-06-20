import json from "./dados.json";

export interface TextFormatValues {
    device_id: string;
    sensor: string;
    estado: boolean;
}
export async function getValues() {
    try {
        const baseUrl =
            process.env.NEXT_PUBLIC_APP_URL ||
            "https://dashboard-pro-para-esp32.onrender.com";

        const response = await fetch(
            `${baseUrl}/api/data/movimento`,
            {
                cache: "no-store"
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error("Erro ao buscar dados:", error);

        return [
            {
                device_id: "TESTE",
                sensor: "PIR",
                estado: false,
                valor: 0
            }
        ];
    }
}

export default getValues;