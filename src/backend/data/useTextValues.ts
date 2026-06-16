import json from "./dados.json";
import { process } from "process";

export interface TextFormatValues {
    device_id: string;
    sensor: string;
    estado: boolean;
}
async function getValues() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/data/movimento`,
            {
                cache: "no-store"
            });
        return response.json();
        if (!process.env.NEXT_PUBLIC_APP_URL) throw new Error("Erro env nao encontrado");
    } catch(err) {
        console.log("Erro ao buscar dados");
        return json;
    }
}

export default getValues;