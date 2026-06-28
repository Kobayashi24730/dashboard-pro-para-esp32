'use client';

import Card from "@/backend/components/Card";
import MonitoramentoPIR from "@/backend/components/MonitoramnetoPIR";
import getValues from "@/backend/data/useTextValues";
import { useState, useEffect } from "react";
import {
    Wifi,
    Thermometer,
    Droplets,
    TrendingUp,
    Activity,
} from "lucide-react";

interface SensorData {
    device_id: string;
    sensor: string;
    estado: boolean;
    valor?: number;
    name?: string;
}
const kpiIcons = {
    devices: Wifi,
    temp: Thermometer,
    humid: Droplets,
    pir: TrendingUp,
};
const kpiStyles = {
    devices: {
        icon: "text-success bg-success/10",
    },
    temp: {
        icon: "text-warning bg-warning/10",
    },
    humid: {
        icon: "text-info bg-info/10",
    },
    pir: {
        icon: "text-purple-600 bg-purple-100",
    },
};

export default function Dashboard() {
    const [data, setData] = useState<SensorData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const arrayData = await getValues();
                setData(arrayData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const data_temp = data.filter((i) => i.device_id === "ESP32_TEMP_01");
    const data_humid = data.filter((i) => i.device_id === "ESP32_HUMID_01");
    const data_sound = data.filter((i) => i.sensor === "SOUND");
    const data_pir = data.filter((i) => i.sensor === "PIR");

    const chartData = (d: SensorData[]) =>
        d.slice(-10).map((item) => ({ ...item, valor: item.valor || 0 }));

    /* ── Loading ── */
    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-muted-foreground">
                        Carregando dashboard...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6 animate-fade-in">
            {/* ── Hero Banner ── */}
            <div className="fluent-card p-6 bg-primary text-primary-foreground border-0">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Activity className="w-4 h-4" />
                            <span className="text-xs font-semibold uppercase tracking-wider opacity-80">
                                Monitoramento ao vivo
                            </span>
                        </div>
                        <h1 className="text-2xl font-semibold mb-1">
                            Dashboard ESP32
                        </h1>
                        <p className="text-sm opacity-80 max-w-lg">
                            Visualize e gerencie seus sensores em tempo real.
                            Dados atualizados automaticamente.
                        </p>
                    </div>
                    <div className="hidden md:flex w-12 h-12 rounded-lg bg-primary-foreground/10 items-center justify-center">
                        <Activity className="w-6 h-6 opacity-60" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {([
                    {
                        key: "devices",
                        label: "Dispositivos Ativos",
                        value: data.length,
                        sub: "Online agora",
                    },
                    {
                        key: "temp",
                        label: "Temperatura",
                        value: `${data_temp.length > 0 ? data_temp[data_temp.length - 1].valor?.toFixed(1) : "0"}°C`,
                        sub: "Leitura atual",
                    },
                    {
                        key: "humid",
                        label: "Umidade",
                        value: `${data_humid.length > 0 ? data_humid[data_humid.length - 1].valor?.toFixed(1) : "0"}%`,
                        sub: "Leitura atual",
                    },
                    {
                        key: "pir",
                        label: "Eventos PIR",
                        value: data_pir.length,
                        sub: "Detectados hoje",
                    },
                ] as const).map((kpi) => {
                    const Icon = kpiIcons[kpi.key];
                    const style = kpiStyles[kpi.key];
                    return (
                        <div key={kpi.key} className="fluent-card p-4">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    {kpi.label}
                                </span>
                                <div className={`w-8 h-8 rounded-md flex items-center justify-center ${style.icon}`}>
                                    <Icon className="w-4 h-4" />
                                </div>
                            </div>
                            <p className="text-2xl font-semibold text-foreground">
                                {kpi.value}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                {kpi.sub}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div>
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 rounded-full bg-primary" />
                    Leitura dos Sensores
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {data_temp.length > 0 && (
                        <Card
                            themeColor="vermelho"
                            title="Temperatura"
                            values={chartData(data_temp)}
                            bestValue={50}
                        />
                    )}
                    {data_humid.length > 0 && (
                        <Card
                            themeColor="azul"
                            title="Umidade"
                            values={chartData(data_humid)}
                            bestValue={100}
                        />
                    )}
                    {data_sound.length > 0 && (
                        <Card
                            themeColor="cyan"
                            title="Som"
                            values={chartData(data_sound)}
                            bestValue={1000}
                        />
                    )}
                    {data_pir.length > 0 && (
                        <Card
                            themeColor="fuchsia"
                            title="PIR"
                            values={chartData(data_pir)}
                            bestValue={1000}
                        />
                    )}
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <span className="w-1 h-4 rounded-full bg-purple-600" />
                        Monitoramento PIR
                    </h2>
                    <button className="px-3 py-1.5 text-xs font-semibold rounded-md bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                        Ver todos
                    </button>
                </div>
                <div className="fluent-card p-4">
                    <MonitoramentoPIR values={data_pir} />
                </div>
            </div>

            <div>
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 rounded-full bg-info" />
                    Atividade Recente
                </h2>
                <div className="space-y-2">
                    {data.slice(-5).map((item, index) => (
                        <div
                            key={index}
                            className="fluent-card flex items-center justify-between p-3"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-success" />
                                <div>
                                    <p className="text-sm font-medium text-foreground">
                                        {item.sensor}
                                    </p>
                                    <p className="text-xs text-muted-foreground font-mono">
                                        {item.device_id}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-semibold text-foreground tabular-nums">
                                    {item.valor?.toFixed(2) ?? "N/A"}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Agora
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
