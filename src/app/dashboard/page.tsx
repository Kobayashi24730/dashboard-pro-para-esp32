'use client';

import Card from "@/backend/components/Card";
import { Activity, Zap, Wifi, Thermometer } from "lucide-react";
import getValues from "@/backend/data/useTextValues";
import MonitoramentoPIR from "@/backend/components/MonitoramnetoPIR";
import jsonLocal from "@/backend/data/dados.json"; // Importando os dados locais como garantia
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [apiData, setApiData] = useState<any>(null);

    useEffect(() => {
        async function Values() {
            const data = await getValues();

            // Validação precisa se o retorno está vazio ou inválido
            const dataEstaVazio = !data ||
                (Array.isArray(data) && data.length === 0) ||
                (typeof data === 'object' && Object.keys(data).length === 0);

            if (dataEstaVazio) {
                console.warn('⚠️ API retornou dados vazios ou falhou. Injetando simulação local.');
                setApiData(jsonLocal); // Usa o JSON local para alimentar toda a tela
            } else {
                setApiData(data); // Usa os dados reais e estruturados vindos do Render
            }
        }
        Values();
    }, []);

    // 1. Barreira de segurança contra propriedades lidas de 'null' antes do useEffect finalizar
    if (!apiData) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 font-medium">
                <p className="animate-pulse">Conectando ao servidor e sincronizando dados...</p>
            </div>
        );
    }

    // 2. Filtro seguro para o componente PIR
    const data_pir = Array.isArray(apiData)
        ? apiData.filter((item) => item.device_id === "ESP32_PIR_01")
        : apiData?.data_pir || [];

    const iconMap = {
        dispositivos: Activity,
        energia: Zap,
        sinal: Wifi,
        temperatura: Thermometer,
    };

    return (
        <div className="space-y-8 p-6 bg-slate-950 min-h-screen">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-slate-400 text-lg">Bem-vindo ao seu painel de controle. Monitore seus dispositivos em tempo real.</p>
            </div>

            {/* KPI Cards Grid (Corrigido de device_id para kpis) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {(apiData?.kpis || []).map((kpi: any, index: number) => {
                    const Icon = iconMap[kpi.iconKey as keyof typeof iconMap] || Activity;

                    return (
                        <div
                            key={index}
                            className={`relative rounded-xl overflow-hidden bg-gradient-to-br ${kpi.color || 'from-slate-800 to-slate-900'} text-white shadow-lg border ${kpi.borderColor || 'border-slate-700/50'} backdrop-blur-xl p-6 hover:shadow-2xl transition-all duration-300 group`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                        kpi.change?.includes('+') || !kpi.change?.includes('-')
                                            ? 'bg-green-500/20 text-green-300'
                                            : 'bg-red-500/20 text-red-300'
                                    }`}>
                                        {kpi.change}
                                    </span>
                                </div>

                                <p className="text-sm font-medium text-white/80 mb-1">{kpi.label}</p>
                                <h3 className="text-2xl font-bold tracking-tight">{kpi.value}</h3>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Monitoramento PIR Container */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4">
                <MonitoramentoPIR values={data_pir} />
            </div>

            {/* Gráficos e Métricas Detalhadas */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Métricas Detalhadas</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Receita Operacional</h3>
                        <div className="flex justify-center w-full">
                            <Card
                                themeColor="indigo"
                                title="Receita Operacional"
                                values={apiData?.charts?.receita || [{ name: "Sistema", valor: 0, estado: false }]}
                                bestValue={1000}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Consumo de Energia</h3>
                        <div className="flex justify-center w-full">
                            <Card
                                themeColor="vermelho"
                                title="Consumo de Energia"
                                values={apiData?.charts?.energia || [{ name: "Energia", valor: 0, estado: false }]}
                                bestValue={1000}
                            />
                        </div>
                    </div>
                </div>

                {/* Additional Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card
                        themeColor="azul"
                        title="Taxa de Uptime"
                        values={apiData?.metrics?.uptime || [{ name: "Uptime", valor: 0, estado: true }]}
                        variant="metric"
                    />
                    <Card
                        themeColor="roxo"
                        title="Requisições/min"
                        values={apiData?.metrics?.requisicoes || [{ name: "Req", valor: 0, estado: true }]}
                        variant="metric"
                    />
                    <Card
                        themeColor="verde"
                        title="Taxa de Sucesso"
                        values={apiData?.metrics?.sucesso || [{ name: "Sucesso", valor: 0, estado: true }]}
                        variant="metric"
                    />
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-800 backdrop-blur-xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-white mb-4">Atividade Recente</h2>
                <div className="space-y-3">
                    {(apiData?.activities || []).map((activity: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-950/40 rounded-lg border border-slate-800/60 hover:bg-slate-900 transition-colors">
                            <div className="flex items-center gap-3 flex-1">
                                <div className={`w-2 h-2 rounded-full ${
                                    activity.status === 'success' ? 'bg-green-500' :
                                        activity.status === 'warning' ? 'bg-yellow-500' :
                                            'bg-blue-500'
                                }`} />
                                <div>
                                    <p className="text-white font-medium">{activity.device}</p>
                                    <p className="text-slate-400 text-sm">{activity.action}</p>
                                </div>
                            </div>
                            <span className="text-slate-400 text-sm">{activity.time}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Stats Footer */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-indigo-950/40 to-indigo-900/20 rounded-xl border border-indigo-500/20 p-6 backdrop-blur-xl">
                    <p className="text-slate-400 text-sm mb-2">Tempo de Resposta Médio</p>
                    <h3 className="text-3xl font-bold text-white">{apiData?.stats?.responseTime || "0ms"}</h3>
                    <p className="text-green-400 text-xs mt-2">↓ 12% vs semana anterior</p>
                </div>

                <div className="bg-gradient-to-br from-purple-950/40 to-purple-900/20 rounded-xl border border-purple-500/20 p-6 backdrop-blur-xl">
                    <p className="text-slate-400 text-sm mb-2">Total de Eventos</p>
                    <h3 className="text-3xl font-bold text-white">{apiData?.stats?.totalEvents || "0"}</h3>
                    <p className="text-green-400 text-xs mt-2">↑ 8% vs semana anterior</p>
                </div>

                <div className="bg-gradient-to-br from-cyan-950/40 to-cyan-900/20 rounded-xl border border-cyan-500/20 p-6 backdrop-blur-xl">
                    <p className="text-slate-400 text-sm mb-2">Armazenamento Usado</p>
                    <h3 className="text-3xl font-bold text-white">{apiData?.stats?.storageUsed || "0 GB"}</h3>
                    <p className="text-yellow-400 text-xs mt-2">Capacidade atual</p>
                </div>
            </div>
        </div>
    );
}