'use client';

import { useEffect } from "react";
import useContextData from "@/hooks/useContextData";
import Card from "@/components/Card";
import { Wifi, TrendingUp, Vibrate, Waves } from "lucide-react";

const kpiIcons = {
    devices: Wifi,
    ultra: Waves,
    vibr: Vibrate,
    pir: TrendingUp,
};

const kpiStyles = {
    devices: { icon: "text-success bg-success/10" },
    ultra: { icon: "text-warning bg-warning/10" },
    vibr: { icon: "text-info bg-info/10" },
    pir: { icon: "text-purple-600 bg-purple-100" },
};

export default function LayoutContext() {
    const { getValues, data, chartData, data_ultrasonic, data_pir, data_som, data_umid, uniqueDevices } = useContextData();

    useEffect(() => {
        getValues();
    }, []);

    const kpiData = [
        {
            key: "devices",
            label: "Dispositivos Ativos",
            value: uniqueDevices,
            sub: `${data.length} leituras registradas`,
        },
        {
            key: "ultra",
            label: "Sensor ultrasonico HC",
            value: `${data_ultrasonic.length > 0 ? (Number(data_ultrasonic[data_ultrasonic.length - 1].value)?.toFixed(1) ?? "0") : "0"}cm`,
            sub: "Leitura atual",
        },
        {
            key: "vibr",
            label: "vibração",
            value: `${data_som.length > 0 ? (Number(data_som[data_som.length - 1].value)?.toFixed(1) ?? "0") : "0"}g`,
            sub: "Leitura atual",
        },
        {
            key: "pir",
            label: "Eventos PIR",
            value: data_pir.length,
            sub: "Detectados hoje",
        },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpiData.map((kpi) => {
                    const Icon = kpiIcons[kpi.key as keyof typeof kpiIcons];
                    const style = kpiStyles[kpi.key as keyof typeof kpiStyles];
                    return (
                        <div key={kpi.key} className="fluent-card p-4 bg-white border rounded-xl shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    {kpi.label}
                                </span>
                                <div className={`w-8 h-8 rounded-md flex items-center justify-center ${style.icon}`}>
                                    <Icon className="w-4 h-4" />
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-foreground">
                                {kpi.value}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                {kpi.sub}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Sensor Charts */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <span className="w-1 h-4 rounded-full bg-primary" />
                    Leitura dos Sensores (Tempo Real)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {data_ultrasonic.length > 0 && (
                        <Card
                            themeColor="vermelho"
                            title="Ultrasonico"
                            values={chartData(data_ultrasonic)}
                            bestValue={50}
                        />
                    )}
                    {data_umid.length > 0 && (
                        <Card
                            themeColor="azul"
                            title="Umidade"
                            values={chartData(data_umid)}
                            bestValue={100}
                        />
                    )}
                    {data_som.length > 0 && (
                        <Card
                            themeColor="cyan"
                            title="Som"
                            values={chartData(data_som)}
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
        </div>       
    );
}