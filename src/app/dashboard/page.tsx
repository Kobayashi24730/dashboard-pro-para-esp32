'use client';

import Card from "@/backend/components/Card";
import { Activity, Zap, Wifi, Thermometer } from "lucide-react";
import getValues from "@/backend/data/useTextValues";
import MonitoramentoPIR from "@/backend/components/MonitoramnetoPIR";
import jsonLocal from "@/backend/data/dados.json"; // Importando os dados locais como garantia
import { useEffect, useState } from "react";

const metrics: any[] = [
    { device_id: "ESP32_WiFi_01"},
    { device_id: "ESP32_UPTIME_01"},
    { device_id: "ESP32_memori_01"},
    { device_id: "ESP32_TepResposta_01"},
    { device_id: "ESP32_Sucesso_01"},
];

export default function DashboardPage() {
    const [apiData, setApiData] = useState<any>(null);

    useEffect(() => {
        async function Values() {
            const data = await getValues();
            const dataEstaVazio = !data ||
                (Array.isArray(data) && data.length === 0) ||
                (typeof data === 'object' && Object.keys(data).length === 0);

            if (dataEstaVazio) {
                console.warn('⚠️ API retornou dados vazios ou falhou. Injetando simulação local.');
                setApiData(jsonLocal);
            } else {
                setApiData(data);
            }
        }
        Values();
    }, []);

    if (!apiData) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 font-medium">
                <p className="animate-pulse">Conectando ao servidor e sincronizando dados...</p>
            </div>
        );
    }

    const iconMap = {
        dispositivos: Activity,
        energia: Zap,
        sinal: Wifi,
        temperatura: Thermometer,
    };
    const data_pir = Array.isArray(apiData)
        ? apiData.filter((item) => item.device_id === "ESP32_PIR_01")
        : apiData?.data_pir || [];
    const data_metrics = Array.isArray(apiData)
        ? apiData.filter((item) => metrics.some(m => m.device_id === item.device_id))
        : apiData?.data_metrics || [];
    const data_activities = Array.isArray(apiData) ? [...apiData].sort((a: any, b: any) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) : [];
    const uptime = data_metrics.find((item: any) => item.device_id === "ESP32_UPTIME_01");
    const storage = data_metrics.find((item: any) => item.device_id === "ESP32_memori_01");
    const uptimeHistorico = data_metrics.filter((item: any) => item.device_id === "ESP32_UPTIME_01");
    const storageHistorico = data_metrics.filter((item: any) => item.device_id === "ESP32_memori_01");
    const uptimeMesAtual = uptimeHistorico[0]?.valor != null ? Number(uptimeHistorico[0]?.valor) : null;
    const uptimeMesAnterior = uptimeHistorico[1]?.valor != null ? Number(uptimeHistorico[1]?.valor) : null;
    let porcentagemUptime = null;
    if (uptimeMesAtual !== null && uptimeMesAnterior !== null) {
        if (uptimeMesAnterior === 0) {
            porcentagemUptime = uptimeMesAtual > 0 ? 100 : null;
        } else {
            const variacao = ((uptimeMesAtual - uptimeMesAnterior) / uptimeMesAnterior) * 100;
            porcentagemUptime = Number(variacao.toFixed(2));
        }
    }
    const storageMesAtual = storageHistorico[0]?.valor != null ? Number(storageHistorico[0]?.valor) : null;
    const storageMesAnterior = storageHistorico[1]?.valor != null ? Number(storageHistorico[1]?.valor) : null;
    let porcentagemStorage = null;
    if (storageMesAtual !=  null && storageMesAnterior != null){
        if (storageMesAnterior === 0) {
            porcentagemStorage = storageMesAtual > 0 ? 100 : null;
        } else {
            const variacao = ((storageMesAtual - storageMesAnterior) / storageMesAnterior) * 100;
            porcentagemStorage = Number(variacao.toFixed(2));
        }
    }
    let total: number = apiData.length;
    function signal(data: any) {
        if (Number(data) > 0) {
            return "↑";
        } else if (Number(data) < 0) {
            return "↓";
        } else {
            return "";
        }
    }
    return (
        <div className="space-y-8 p-6 bg-slate-950 min-h-screen">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-slate-400 text-lg">Bem-vindo ao seu painel de controle. Monitore seus dispositivos em tempo real.</p>
            </div>

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

            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4">
                <MonitoramentoPIR values={data_pir} />
            </div>

            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Métricas Detalhadas</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Receita Operacional</h3>
                        <div className="flex justify-center w-full">
                            <Card
                                themeColor="indigo"
                                title="Receita Operacional"
                                values={data_metrics.filter((item: any) => item.device_id === "ESP32_Sucesso_01") || [{ name: "Sistema", valor: 0, estado: false }]}
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
                                values={data_metrics.filter((item: any) => item.device_id === "ESP32_memori_01") || [{ name: "Energia", valor: 0, estado: false }]}
                                bestValue={1000}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card
                        themeColor="azul"
                        title="Taxa de Uptime"
                        values={data_metrics.filter((item: any) => item.device_id === "ESP32_UPTIME_01") || [{ name: "Uptime", valor: 0, estado: true }]}
                        variant="metric"
                    />
                    <Card
                        themeColor="roxo"
                        title="Requisições/min"
                        values={data_metrics.filter((item: any) => item.device_id === "ESP32_TepResposta_01") || [{ name: "Req", valor: 0, estado: true }]}
                        variant="metric"
                    />
                    <Card
                        themeColor="verde"
                        title="Taxa de Sucesso"
                        values={data_metrics.filter((item: any) => item.device_id === "ESP32_Sucesso_01") || [{ name: "Sucesso", valor: 0, estado: true }]}
                        variant="metric"
                    />
                </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-800 backdrop-blur-xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-white mb-4">Atividade Recente</h2>
                <div className="space-y-3 max-h-[400px] overflow-y-auto overflow-x-hidden">
                    {data_activities.map((activity: any) => (
                        <div key={activity.id} className="flex items-center justify-between p-3 bg-slate-950/40 rounded-lg border border-slate-800/60 hover:bg-slate-900 transition-colors">
                            <div className="flex items-center gap-3 flex-1">
                                <div
                                    className={`w-2 h-2 rounded-full ${
                                        activity.estado == 1
                                            ? "bg-green-500"
                                            : "bg-red-500"
                                    }`}
                                />
                                <div>
                                    <p className="text-white font-medium">{activity.sensor}</p>
                                    <p className="text-slate-400 text-sm">Valor: {activity.valor}</p>
                                </div>
                            </div>
                            <span className="text-slate-400 text-sm">
                                {new Date(activity.created_at).toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-indigo-950/40 to-indigo-900/20 rounded-xl border border-indigo-500/20 p-6 backdrop-blur-xl">
                    <p className="text-slate-400 text-sm mb-2">Tempo de Resposta Médio</p>
                    <h3 className="text-3xl font-bold text-white">{uptime?.valor ?? 0} ms</h3>
                    <p className="text-green-400 text-xs mt-2">{signal(porcentagemUptime)}{porcentagemUptime}% vs semana anterior</p>
                </div>

                <div className="bg-gradient-to-br from-purple-950/40 to-purple-900/20 rounded-xl border border-purple-500/20 p-6 backdrop-blur-xl">
                    <p className="text-slate-400 text-sm mb-2">Total de Eventos</p>
                    <h3 className="text-3xl font-bold text-white">{total ?? 0}</h3>
                    <p className="text-green-400 text-xs mt-2">{signal(porcentagemStorage)}{porcentagemStorage}% vs semana anterior</p>
                </div>

                <div className="bg-gradient-to-br from-cyan-950/40 to-cyan-900/20 rounded-xl border border-cyan-500/20 p-6 backdrop-blur-xl">
                    <p className="text-slate-400 text-sm mb-2">Armazenamento Usado</p>
                    <h3 className="text-3xl font-bold text-white">{storage?.valor ?? 0}GB</h3>
                    <p className="text-yellow-400 text-xs mt-2">Capacidade atual</p>
                </div>
            </div>

        </div>
    );
}