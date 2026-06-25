import Card from "@/backend/components/Card";
import getValues from "@/backend/data/useTextValues";
import MonitoramentoPIR from "@/backend/components/MonitoramnetoPIR";

export default async function page() {
    const data: any[] = await getValues();
    const data_sound = data.filter((item) => item.device_id === "ESP32_SOUND_01");
    const data_pir = data.filter((item) => item.device_id === "ESP32_PIR_01");
    const data_humid = data.filter((item) => item.device_id === "ESP32_HUMID_01");
    const data_temp = data.filter((item) => item.device_id === "ESP32_TEMP_01");
    const data_ultra = data.filter((item) => item.device_id === "ESP32_ULTRA_01");
    
    const formataDadosGraficos = (dados: any[])=> {
        return dados.map((item) => ({
            device_id: item.device_id
            sensor: item.sensor,
            estado: item.estado,
            valor: item.valor != null
                ? Number(item.valor)
                : Number(item.estado),
            name: item.device_id,
        }));
    }

    return (
        <section className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8 lg:p-10">
            {/* Container Principal */}
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Header Section com Animação */}
                <div className="space-y-3 slide-in-down">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Dashboard
                            </h1>
                            <p className="text-slate-400 text-lg md:text-xl mt-2 font-light">
                                Monitoramento em tempo real dos seus dispositivos ESP32
                            </p>
                        </div>
                    </div>
                    <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                        <span className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></span>
                        Sensores Ativos
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 p-1">
                        {data_sound.length > 0 && (
                            <div className="group transition-all duration-300 ease-out transform hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg will-change-transform fade-in">
                                <Card themeColor="verde" title="Sensor de Som" values={formataDadosGraficos(data_sound)} bestValue={1000}/>
                            </div>
                        )}
                        {data_pir.length > 0 && (
                            <div className="group hover-scale fade-in">
                                <Card themeColor="roxo" title="Sensor PIR" values={formataDadosGraficos(data_pir)} bestValue={1000}/>
                            </div>
                        )}
                        {data_humid.length > 0 && (
                            <div className="group hover-scale fade-in">
                                <Card themeColor="azul" title="Umidade" values={formataDadosGraficos(data_humid)} bestValue={1000}/>
                            </div>
                        )}
                        {data_temp.length > 0 && (
                            <div className="group hover-scale fade-in">
                                <Card themeColor="vermelho" title="Temperatura" values={formataDadosGraficos(data_temp)} bestValue={1000}/>
                            </div>
                        )}
                        {data_ultra.length > 0 && (
                            <div className="group hover-scale fade-in">
                                <Card themeColor="verde" title="Ultrassônico" values={formataDadosGraficos(data_ultra)} bestValue={1000}/>
                            </div>
                        )}
                    </div>
                </div>

                {/* Monitoramento PIR Section */}
                <div className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                        <span className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
                        Monitoramento PIR
                    </h2>
                    
                    <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 backdrop-blur-xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 p-6 md:p-8 shadow-2xl hover:shadow-glow-lg transition-all duration-300 group">
                        {/* Animated background gradient */}
                        <div className="absolute inset-0 bg-gradient-mesh opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Content */}
                        <div className="relative z-10">
                            <MonitoramentoPIR/>
                        </div>
                    </div>
                </div>

                {/* Estatísticas Rápidas */}
                <div className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                        <span className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></span>
                        Estatísticas do Sistema
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        {/* Card 1 - Status Geral */}
                        <div className="group relative overflow-hidden rounded-xl border border-indigo-500/20 backdrop-blur-xl bg-gradient-to-br from-indigo-950/30 to-indigo-900/20 p-6 hover:border-indigo-500/40 transition-all duration-300 hover:shadow-glow-indigo">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-slate-400 text-sm font-medium">Status Geral</p>
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-soft shadow-lg shadow-green-500/50"></div>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">Online</h3>
                                <p className="text-indigo-400 text-xs font-semibold">Sistema operacional</p>
                            </div>
                        </div>

                        {/* Card 2 - Dispositivos */}
                        <div className="group relative overflow-hidden rounded-xl border border-purple-500/20 backdrop-blur-xl bg-gradient-to-br from-purple-950/30 to-purple-900/20 p-6 hover:border-purple-500/40 transition-all duration-300 hover:shadow-glow-purple">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-slate-400 text-sm font-medium">Dispositivos Conectados</p>
                                    <span className="text-2xl">📡</span>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{data.length}</h3>
                                <p className="text-purple-400 text-xs font-semibold">Sensores ativos</p>
                            </div>
                        </div>

                        {/* Card 3 - Uptime */}
                        <div className="group relative overflow-hidden rounded-xl border border-cyan-500/20 backdrop-blur-xl bg-gradient-to-br from-cyan-950/30 to-cyan-900/20 p-6 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-glow-blue">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-slate-400 text-sm font-medium">Uptime</p>
                                    <span className="text-2xl">⏱️</span>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">99.9%</h3>
                                <p className="text-cyan-400 text-xs font-semibold">Disponibilidade</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Informações Adicionais */}
                <div className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                        <span className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></span>
                        Detalhes dos Sensores
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Detalhes Sensor Som */}
                        {data_sound.length > 0 && (
                            <div className="group relative overflow-hidden rounded-xl border border-slate-700/50 backdrop-blur-xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 p-6 hover:border-green-500/30 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-bold text-white">Sensor de Som</h3>
                                        <span className="text-3xl">🔊</span>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-slate-400 text-sm">
                                            <span className="text-slate-300 font-semibold">Dispositivo:</span> {data_sound[0]?.device_id}
                                        </p>
                                        <p className="text-slate-400 text-sm">
                                            <span className="text-slate-300 font-semibold">Valor Atual:</span> {data_sound[0]?.valor || "N/A"}
                                        </p>
                                        <p className="text-slate-400 text-sm">
                                            <span className="text-slate-300 font-semibold">Última Atualização:</span> {data_sound[0]?.createdAt ? new Date(data_sound[0].createdAt).toLocaleTimeString("pt-BR") : "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Detalhes Sensor PIR */}
                        {data_pir.length > 0 && (
                            <div className="group relative overflow-hidden rounded-xl border border-slate-700/50 backdrop-blur-xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 p-6 hover:border-purple-500/30 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-bold text-white">Sensor PIR</h3>
                                        <span className="text-3xl">🔍</span>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-slate-400 text-sm">
                                            <span className="text-slate-300 font-semibold">Dispositivo:</span> {data_pir[0]?.device_id}
                                        </p>
                                        <p className="text-slate-400 text-sm">
                                            <span className="text-slate-300 font-semibold">Estado:</span> {data_pir[0]?.estado ? "Detectado" : "Normal"}
                                        </p>
                                        <p className="text-slate-400 text-sm">
                                            <span className="text-slate-300 font-semibold">Última Atualização:</span> {data_pir[0]?.createdAt ? new Date(data_pir[0].createdAt).toLocaleTimeString("pt-BR") : "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Detalhes Umidade */}
                        {data_humid.length > 0 && (
                            <div className="group relative overflow-hidden rounded-xl border border-slate-700/50 backdrop-blur-xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 p-6 hover:border-blue-500/30 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-bold text-white">Umidade</h3>
                                        <span className="text-3xl">💧</span>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-slate-400 text-sm">
                                            <span className="text-slate-300 font-semibold">Dispositivo:</span> {data_humid[0]?.device_id}
                                        </p>
                                        <p className="text-slate-400 text-sm">
                                            <span className="text-slate-300 font-semibold">Umidade:</span> {data_humid[0]?.valor || "N/A"}%
                                        </p>
                                        <p className="text-slate-400 text-sm">
                                            <span className="text-slate-300 font-semibold">Última Atualização:</span> {data_humid[0]?.createdAt ? new Date(data_humid[0].createdAt).toLocaleTimeString("pt-BR") : "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Detalhes Temperatura */}
                        {data_temp.length > 0 && (
                            <div className="group relative overflow-hidden rounded-xl border border-slate-700/50 backdrop-blur-xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 p-6 hover:border-red-500/30 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-bold text-white">Temperatura</h3>
                                        <span className="text-3xl">🌡️</span>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-slate-400 text-sm">
                                            <span className="text-slate-300 font-semibold">Dispositivo:</span> {data_temp[0]?.device_id}
                                        </p>
                                        <p className="text-slate-400 text-sm">
                                            <span className="text-slate-300 font-semibold">Temperatura:</span> {data_temp[0]?.valor || "N/A"}°C
                                        </p>
                                        <p className="text-slate-400 text-sm">
                                            <span className="text-slate-300 font-semibold">Última Atualização:</span> {data_temp[0]?.createdAt ? new Date(data_temp[0].createdAt).toLocaleTimeString("pt-BR") : "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Detalhes Ultrassônico */}
                        {data_ultra.length > 0 && (
                            <div className="group relative overflow-hidden rounded-xl border border-slate-700/50 backdrop-blur-xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 p-6 hover:border-yellow-500/30 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-bold text-white">Ultrassônico</h3>
                                        <span className="text-3xl">📏</span>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-slate-400 text-sm">
                                            <span className="text-slate-300 font-semibold">Dispositivo:</span> {data_ultra[0]?.device_id}
                                        </p>
                                        <p className="text-slate-400 text-sm">
                                            <span className="text-slate-300 font-semibold">Distância:</span> {data_ultra[0]?.valor || "N/A"} cm
                                        </p>
                                        <p className="text-slate-400 text-sm">
                                            <span className="text-slate-300 font-semibold">Última Atualização:</span> {data_ultra[0]?.createdAt ? new Date(data_ultra[0].createdAt).toLocaleTimeString("pt-BR") : "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Info */}
                <div className="mt-12 pt-8 border-t border-slate-700/50">
                    <p className="text-slate-400 text-sm text-center">
                        Dashboard atualizado em tempo real • Próxima atualização em alguns segundos
                    </p>
                </div>
            </div>
        </section>
    )
}
