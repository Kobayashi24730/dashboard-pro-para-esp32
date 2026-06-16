'use client';

import Card from "@/backend/components/Card";
import { Activity, Zap, Wifi, Thermometer } from "lucide-react";

export default function DashboardPage() {
    // Dados de exemplo para os KPIs
    const kpis = [
        {
            icon: Activity,
            label: "Dispositivos Online",
            value: "12",
            change: "+2",
            color: "from-blue-600 to-blue-900",
            borderColor: "border-blue-500/20",
        },
        {
            icon: Zap,
            label: "Consumo de Energia",
            value: "2.4 kW",
            change: "-5%",
            color: "from-yellow-600 to-yellow-900",
            borderColor: "border-yellow-500/20",
        },
        {
            icon: Wifi,
            label: "Sinal Médio",
            value: "85%",
            change: "+3%",
            color: "from-green-600 to-green-900",
            borderColor: "border-green-500/20",
        },
        {
            icon: Thermometer,
            label: "Temperatura Média",
            value: "24.5°C",
            change: "-1.2°C",
            color: "from-orange-600 to-orange-900",
            borderColor: "border-orange-500/20",
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-slate-400 text-lg">Bem-vindo ao seu painel de controle. Monitore seus dispositivos em tempo real.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpis.map((kpi, index) => {
                    const Icon = kpi.icon;
                    return (
                        <div
                            key={index}
                            className={`relative rounded-xl overflow-hidden bg-gradient-to-br ${kpi.color} text-white shadow-lg border ${kpi.borderColor} backdrop-blur-xl p-6 hover:shadow-2xl transition-all duration-300 group`}
                        >
                            {/* Animated gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                        kpi.change.includes('+') || !kpi.change.includes('-')
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

            {/* Charts Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Métricas Detalhadas</h2>

                {/* Main Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Receita Operacional</h3>
                        <div className="flex justify-center">
                            <Card
                                themeColor="indigo"
                                title="Receita Operacional"
                                values={[{ name: "Sistema", valor: 1000, estado: true }]}
                                bestValue={1000}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Consumo de Energia</h3>
                        <div className="flex justify-center">
                            <Card
                                themeColor="vermelho"
                                title="Consumo de Energia"
                                values={[{ name: "Energia", valor: 850, estado: false }]}
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
                        values={[{ name: "Uptime", valor: 99.5, estado: true }]}
                        variant="metric"
                    />
                    <Card
                        themeColor="roxo"
                        title="Requisições/min"
                        values={[{ name: "Req", valor: 245, estado: true }]}
                        variant="metric"
                    />
                    <Card
                        themeColor="verde"
                        title="Taxa de Sucesso"
                        values={[{ name: "Sucesso", valor: 98.2, estado: true }]}
                        variant="metric"
                    />
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl border border-slate-700/50 backdrop-blur-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h2 className="text-xl font-bold text-white mb-4">Atividade Recente</h2>
                <div className="space-y-3">
                    {[
                        { device: "ESP32 #01", action: "Conectado", time: "há 2 minutos", status: "success" },
                        { device: "ESP32 #02", action: "Dados Enviados", time: "há 5 minutos", status: "success" },
                        { device: "ESP32 #03", action: "Desconectado", time: "há 10 minutos", status: "warning" },
                        { device: "ESP32 #04", action: "Reiniciado", time: "há 15 minutos", status: "info" },
                    ].map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors border border-slate-600/50">
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

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-indigo-900/30 to-indigo-800/30 rounded-xl border border-indigo-500/20 p-6 backdrop-blur-xl hover:shadow-lg transition-shadow">
                    <p className="text-slate-400 text-sm mb-2">Tempo de Resposta Médio</p>
                    <h3 className="text-3xl font-bold text-white">142ms</h3>
                    <p className="text-green-400 text-xs mt-2">↓ 12% vs semana anterior</p>
                </div>

                <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 rounded-xl border border-purple-500/20 p-6 backdrop-blur-xl hover:shadow-lg transition-shadow">
                    <p className="text-slate-400 text-sm mb-2">Total de Eventos</p>
                    <h3 className="text-3xl font-bold text-white">1,234</h3>
                    <p className="text-green-400 text-xs mt-2">↑ 8% vs semana anterior</p>
                </div>

                <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-800/30 rounded-xl border border-cyan-500/20 p-6 backdrop-blur-xl hover:shadow-lg transition-shadow">
                    <p className="text-slate-400 text-sm mb-2">Armazenamento Usado</p>
                    <h3 className="text-3xl font-bold text-white">2.4 GB</h3>
                    <p className="text-yellow-400 text-xs mt-2">60% da capacidade</p>
                </div>
            </div>
        </div>
    );
}
