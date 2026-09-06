'use client';

import MonitoramentoPIR from "@/components/MonitoramnetoPIR";
import useContextData from "@/hooks/useContextData";
import { useEffect, useState } from "react";
import { Activity, RefreshCw, AlertCircle } from "lucide-react";
import RecentActivity from "@/components/RecentActivity";
import LayoutContext from '@/components/layoutContext';
import ModalOpen from "@/components/ModalOpen";


export default function Dashboard() {
    const { getValues, data, loading, error, lastUpdate, data_pir } = useContextData();
    const [isModalOpen, isSetModalOpen] = useState(false);

    useEffect(() => {
        getValues();
    }, []);

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
                        onClick={getValues}
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
                        <div className="text-stone-900 flex items-center gap-2 mb-2">
                            <Activity className="w-4 h-4" />
                            <span className="text-xs font-semibold uppercase tracking-wider opacity-80">
                                Monitoramento ao vivo
                            </span>
                        </div>
                        <h1 className="text-2xl font-semibold mb-1">
                            Dashboard ESP32
                        </h1>
                        <p className="text-stone-800 opacity-80 max-w-lg">
                            Visualize e gerencie seus sensores em tempo real.
                            Dados atualizados automaticamente a cada 30 segundos.
                        </p>
                        {lastUpdate && (
                            <p className="text-stone-800 opacity-60 mt-2">
                                Última atualização:{" "}
                                {lastUpdate.toLocaleTimeString("pt-BR")}
                            </p>
                        )}
                    </div>
                    <div className="hidden md:flex items-start gap-3">
                        <button
                            onClick={getValues}
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
                                onClick={getValues}
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
                    <div className="">
                        <LayoutContext/>
                    </div>

                    {/* ── PIR Monitoring ── */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                                <span className="w-1 h-4 rounded-full bg-purple-600" />
                                Monitoramento PIR
                            </h2>
                            <button onClick={() => isSetModalOpen(true)} className="px-3 py-1.5 text-xs font-semibold rounded-md bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                                Ver todos
                            </button>
                        </div>
                        <div className="fluent-card p-4 bg-white border rounded-xl shadow-sm">
                            <MonitoramentoPIR values={data_pir} />
                        </div>
                    </div>

                    {/* ── Monitoring Modal ── */}
                    <ModalOpen isOpen={isModalOpen} onClose={() => isSetModalOpen(false)}/>

                    {/* ── Recent Activity ── */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <span className="w-1 h-4 rounded-full bg-info" />
                            Atividade Recente
                        </h2>
                        <div className="fluent-card p-4 bg-white border rounded-xl shadow-sm">
                            <RecentActivity data={data} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}