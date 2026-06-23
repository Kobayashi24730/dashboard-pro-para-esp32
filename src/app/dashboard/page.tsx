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
            createdAt: new Date(item.createdAt || Date.now()).toLocaleTimeString("pt-BR",{ hour: '2-digit', minute: '2-digit' }),
            name: item.device_id,
            valor: item.valor != null ? Number(item.valor) : Number(item.estado)
        }));
    }

    return (
        <section className="flex flex-col gap-8 p-6">
            {/* Header Section */}
            <div className="mb-4 slide-in-down">
                <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-slate-400 text-lg">Monitoramento em tempo real dos seus dispositivos ESP32</p>
            </div>

            {/* Cards Grid - Com Tailwind Melhorado */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 p-6 bg-slate-900/40 rounded-xl border border-slate-700/50 backdrop-blur-xl shadow-inner-glow transition-smooth hover:shadow-lg">
                {data_sound.length > 0 &&
                    <div className="hover-scale fade-in">
                        <Card themeColor="verde" title="Sensor de Som" values={formataDadosGraficos(data_sound)} bestValue={1000}/>
                    </div>
                }
                {data_pir.length > 0 &&
                    <div className="hover-scale fade-in">
                        <Card themeColor="roxo" title="Sensor PIR" values={formataDadosGraficos(data_pir)} bestValue={1000}/>
                    </div>
                }
                {data_humid.length > 0 &&
                    <div className="hover-scale fade-in">
                        <Card themeColor="azul" title="Umidade" values={formataDadosGraficos(data_humid)} bestValue={1000}/>
                    </div>
                }
                {data_temp.length > 0 &&
                    <div className="hover-scale fade-in">
                        <Card themeColor="vermelho" title="Temperatura" values={formataDadosGraficos(data_temp)} bestValue={1000}/>
                    </div>
                }
                {data_ultra.length > 0 &&
                    <div className="hover-scale fade-in">
                        <Card themeColor="verde" title="Ultrassônico" values={formataDadosGraficos(data_ultra)} bestValue={1000}/>
                    </div>
                }
            </div>

            {/* Monitoramento PIR Section */}
            <div className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl border border-slate-700/50 backdrop-blur-xl shadow-lg hover:shadow-glow-md transition-smooth">
                <h2 className="text-2xl font-bold text-white mb-4 slide-in-down">Monitoramento PIR</h2>
                <MonitoramentoPIR/>
            </div>
        </section>
    )
}
