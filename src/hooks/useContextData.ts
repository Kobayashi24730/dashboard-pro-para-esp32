import json from "./dados.json";
import { useState } from "react";
import { TextFormatValues, SensorData } from "@/types/types";
import { useMemo } from "react";



export default function useContextData() {
    const [data, setData] = useState<SensorData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);


    const getValues = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/data/movimento', {
                cache: "no-store"
            });
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const result: SensorData[] = await response.json();
            setError(null);
            setLastUpdate(new Date());
            setData(result);

            return await response.json();
        } catch (error) {
            console.warn("Erro ao buscar dados:", error);
            setError("Falha ao carregar dados. Verifique sua conexão.");
            const fallbackData = json as unknown as SensorData[];
            setData(fallbackData);
            return fallbackData;
        } finally {
            setLoading(false);
        }
    };

    // filters data
    const data_ultrasonic = useMemo(() => data.filter((i) => i.device_id === "ESP32_ULTRASONIC_01" || i.sensor === "ULTRASONIC"), [data]);
    const data_pir = useMemo(() => data.filter((i) => i.device_id === "ESP32_PIR_01" || i.sensor === "PIR"), [data]);
    const data_som = useMemo(() => data.filter((i) => i.device_id === "ESP32_SOUND_01" || i.sensor === "SOUND"), [data]);
    const data_umid = useMemo(() => data.filter((i) => i.device_id === "ESP32_HUMID_01" || i.sensor === "HUMIDITY"), [data]);
    const uniqueDevices = useMemo(() => new Set(data.map((i) => i.device_id )).size, [data]);


    const chartData = (d: SensorData[]) =>
        d.slice(-10).map((item) => ({
            ...item,
            valor: typeof item.value === "number" ? item.value : Number(item.value) || 0,
        }));

    return (
        {
            getValues
            , data
            , loading
            , error
            , lastUpdate
            , chartData
            , data_ultrasonic
            , data_pir
            , data_som
            , data_umid
            , uniqueDevices
        }
    );
}