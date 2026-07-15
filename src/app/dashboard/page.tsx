'use client';

import Card from "@/backend/components/Card";
import MonitoramentoPIR from "@/backend/components/MonitoramnetoPIR";
import getValues from "@/backend/data/useTextValues";
import { useState, useEffect, useCallback } from "react";
import {
    Wifi,
    Thermometer,
    Droplets,
    TrendingUp,
    Activity,
    RefreshCw,
    AlertCircle,
} from "lucide-react";

interface SensorData {
    id?: number;
    device_id: string;
    sensor: string;
    estado: number | boolean;
    valor?: number | string | null;
    created_at?: string;
}

/* ── KPI config ── */
const kpiIcons = {
    devices: Wifi,
    temp: Thermometer,
    humid: Droplets,
    pir: TrendingUp,
};

const kpiStyles = {
    devices: { icon: "text-success bg-success/10" },
    temp: { icon: "text-warning bg-warning/10" },
    humid: { icon: "text-info bg-info/10" },
    pir: { icon: "text-purple-600 bg-purple-100" },
};

/* ── Filter helpers (based on device_id from dados.json) ── */
const filterByDevice = (data: SensorData[], deviceId: string) =>
    data.filter((i) => i.device_id === deviceId);

export default function Dashboard() {
    const [data, setData] = useState<SensorData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setError(null);
            const arrayData = await getValues();
            setData(arrayData);
            setLastUpdate(new Date());
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Falha ao carregar dados. Verifique sua conexão.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
        // Auto-refresh a cada 30 segundos
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, [fetchData]);

    // Filtrar dados por device_id (conforme estrutura real dos dados)
    const data_temp = filterByDevice(data, "ESP32_TEMP_01");
    const data_humid = filterByDevice(data, "ESP32_HUMID_01");
    const data_sound = filterByDevice(data, "ESP32_SOUND_01");
    const data_pir = filterByDevice(data, "ESP32_PIR_01");

    // Dispositivos únicos
    const uniqueDevices = new Set(data.map((i) => i.device_id)).size;

    // Chart data formatter
    const chartData = (d: SensorData[]) =>
        d.slice(-10).map((item) => ({
            ...item,
            valor: typeof item.valor === "number" ? item.valor : 0,
        }));

    // Format timestamp
    const formatTime = (dateStr?: string) => {
        if (!dateStr) return "Agora";
        try {
            const date = new Date(dateStr.replace(" ", "T"));
            const now = new Date();
            const diffMs = now.getTime() - date.getTime();
            const diffMins = Math.floor(diffMs / 60000);

            if (diffMins < 1) return "Agora";
            if (diffMins < 60) return `${diffMins}min atrás`;
            if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h atrás`;
            return date.toLocaleDateString("pt-BR");
        } catch {
            return "Agora";
        }
    };

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

    /* ── Error state ── */
    if (error && data.length === 0) {
        return (
            <div className="flex items-center justify-center h-full p-6">
                <div className="fluent-card p-6 max-w-md text-center space-y-3">
                    <AlertCircle className="w-12 h-12 text-error mx-auto" />
                    <h3 className="text-subtitle">Erro ao carregar dados</h3>
                    <p className="text-caption">{error}</p>
                    <button
                        onClick={fetchData}
                        className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors"
                    >
                        Tentar novamente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6 animate-fade-in">
            {/* ── Hero Banner ── */}
            <div className="fluent-card p-6 bg-primary text-primary-foreground border-0">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
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
                            Dados atualizados automaticamente a cada 30 segundos.
                        </p>
                        {lastUpdate && (
                            <p className="text-xs opacity-60 mt-2">
                                Última atualização:{" "}
                                {lastUpdate.toLocaleTimeString("pt-BR")}
                            </p>
                        )}
                    </div>
                    <div className="hidden md:flex items-start gap-3">
                        <button
                            onClick={fetchData}
                            disabled={loading}
                            className="p-2 rounded-md bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors disabled:opacity-50"
                            title="Atualizar dados"
                        >
                            <RefreshCw
                                className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
                            />
                        </button>
                        <div className="w-12 h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                            <Activity className="w-6 h-6 opacity-60" />
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Alert banner ── */}
            {error && data.length > 0 && (
                <div className="fluent-card p-4 bg-warning/10 border-warning/20 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-warning flex-shrink-0" />
                    <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                            Falha ao atualizar dados
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Exibindo dados em cache.{" "}
                            <button
                                onClick={fetchData}
                                className="text-primary hover:underline font-semibold"
                            >
                                Tentar novamente
                            </button>
                        </p>
                    </div>
                </div>
            )}

            {/* ── Empty state ── */}
            {data.length === 0 ? (
                <div className="fluent-card p-12 text-center space-y-3">
                    <Activity className="w-16 h-16 text-muted-foreground/30 mx-auto" />
                    <h3 className="text-subtitle">Nenhum dado disponível</h3>
                    <p className="text-caption max-w-md mx-auto">
                        Aguardando dados dos sensores ESP32. Verifique se os dispositivos
                        estão conectados e enviando dados.
                    </p>
                </div>
            ) : (
                <>
                    {/* ── KPI Cards ── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {([
                            {
                                key: "devices",
                                label: "Dispositivos Ativos",
                                value: uniqueDevices,
                                sub: `${data.length} leituras`,
                            },
                            {
                                key: "temp",
                                label: "Temperatura",
                                value: `${data_temp.length > 0 ? data_temp[data_temp.length - 1].valor : "0"}°C`,
                                sub: "Leitura atual",
                            },
                            {
                                key: "humid",
                                label: "Umidade",
                                value: `${data_humid.length > 0 ? data_humid[data_humid.length - 1].valor : "0"}%`,
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

                    {/* ── Sensor Charts ── */}
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
                                    bestValue={1500}
                                />
                            )}
                            {data_pir.length > 0 && (
                                <Card
                                    themeColor="fuchsia"
                                    title="PIR"
                                    values={chartData(data_pir)}
                                    bestValue={10}
                                />
                            )}
                        </div>
                    </div>

                    {/* ── PIR Monitoring ── */}
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
                        <MonitoramentoPIR values={data_pir} />
                    </div>

                    {/* ── Recent Activity ── */}
                    <div>
                        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                            <span className="w-1 h-4 rounded-full bg-info" />
                            Atividade Recente
                        </h2>
                        <div className="space-y-2">
                            {data.slice(-5).reverse().map((item, index) => (
                                <div
                                    key={item.id || index}
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
                                            {item.valor ?? "N/A"}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {formatTime(item.created_at)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
