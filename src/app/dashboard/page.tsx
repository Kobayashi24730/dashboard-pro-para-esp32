'use client';

import Card from "@/backend/components/Card";
import MonitoramentoPIR from "@/backend/components/MonitoramnetoPIR";
import getValues from "@/backend/data/useTextValues";
import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Wifi,
  TrendingUp,
  Activity,
  RefreshCw,
  AlertCircle,
  Vibrate, 
  Waves,   
} from "lucide-react";
import { formatTime } from "@/lib/formatTime";

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

export default function Dashboard() {



    /* ── Loading ── */
    if (loading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[400px]">
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
            <div className="flex items-center justify-center h-full p-6 min-h-[400px]">
                <div className="fluent-card p-6 max-w-md text-center space-y-3 bg-white border rounded-xl shadow-sm">
                    <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
                    <h3 className="text-lg font-semibold">Erro ao carregar dados</h3>
                    <p className="text-sm text-muted-foreground">{error}</p>
                    <button
                        onClick={fetchData}
                        className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
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
            <div className="fluent-card p-6 bg-primary text-primary-foreground border-0 rounded-xl shadow-sm">
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
                <div className="fluent-card p-4 bg-warning/10 border-warning/20 rounded-xl flex items-center gap-3">
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

            {/* ── Empty state ou Conteúdo ── */}
            {data.length === 0 ? (
                <div className="fluent-card p-12 text-center space-y-3 bg-white border rounded-xl">
                    <Activity className="w-16 h-16 text-muted-foreground/30 mx-auto" />
                    <h3 className="text-lg font-semibold">Nenhum dado disponível</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
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
                                sub: `${data.length} leituras registradas`,
                            },
                            {
                                key: "ultra",
                                label: "Sensor ultrasonico HC",
                                value: `${data_temp.length > 0 ? (Number(data_temp[data_temp.length - 1].valor)?.toFixed(1) ?? "0") : "0"}°C`,
                                sub: "Leitura atual",
                            },
                            {
                                key: "vibr",
                                label: "vibração",
                                value: `${data_humid.length > 0 ? (Number(data_humid[data_humid.length - 1].valor)?.toFixed(1) ?? "0") : "0"}%`,
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

                    {/* ── Sensor Charts ── */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <span className="w-1 h-4 rounded-full bg-primary" />
                            Leitura dos Sensores (Tempo Real)
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {data_temp.length > 0 && (
                                <Card
                                    themeColor="vermelho"
                                    title="Ultrasonico"
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

                    {/* ── PIR Monitoring ── */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                                <span className="w-1 h-4 rounded-full bg-purple-600" />
                                Monitoramento PIR
                            </h2>
                            <button className="px-3 py-1.5 text-xs font-semibold rounded-md bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                                Ver todos
                            </button>
                        </div>
                        <div className="fluent-card p-4 bg-white border rounded-xl shadow-sm">
                            <MonitoramentoPIR values={data_pir} />
                        </div>
                    </div>

                    {/* ── Recent Activity ── */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <span className="w-1 h-4 rounded-full bg-info" />
                            Atividade Recente
                        </h2>
                        <div className="space-y-2">
                            {data.slice(-5).reverse().map((item, index) => (
                                <div
                                    key={item.id || index}
                                    className="fluent-card flex items-center justify-between p-3 bg-white border rounded-xl shadow-sm"
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
                                            {typeof item.valor === "number" ? item.valor.toFixed(2) : (item.valor ?? "N/A")}
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