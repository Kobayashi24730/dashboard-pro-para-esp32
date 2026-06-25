'use client';
import { AreaChart, Area, XAxis, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

interface DateProps {
    themeColor: 'verde' | 'roxo' | 'azul' | 'vermelho';
    title: string;
    values: {  device_id: string; sensor: string; estado: boolean; valor?: number; name?: string }[];
    bestValue: number;
}

const themes = {
    verde: "bg-gradient-to-br from-green-600 to-green-900",
    roxo: "bg-gradient-to-br from-purple-600 to-purple-900",
    azul: "bg-gradient-to-br from-blue-600 to-blue-900",
    vermelho: "bg-gradient-to-br from-red-600 to-red-900"
};

const glowEffects = {
    verde: "glow-green shadow-lg shadow-green-500/30",
    roxo: "glow-purple shadow-lg shadow-purple-500/30",
    azul: "glow-blue shadow-lg shadow-blue-500/30",
    vermelho: "shadow-lg shadow-red-500/30"
};

const borderStyles = {
    verde: "border-green-500/30 hover:border-green-400/50",
    roxo: "border-purple-500/30 hover:border-purple-400/50",
    azul: "border-blue-500/30 hover:border-blue-400/50",
    vermelho: "border-red-500/30 hover:border-red-400/50"
};

const overlayBg = {
    verde: "bg-green-500/10",
    roxo: "bg-purple-500/10",
    azul: "bg-blue-500/10",
    vermelho: "bg-red-500/10"
};

export default function Card({themeColor, title, values, bestValue}: DateProps) {
    //console.log(values);
    let themeIndex = themes[themeColor] || themes.azul;
    let glowEffect = glowEffects[themeColor] || glowEffects.azul;
    let borderColor = borderStyles[themeColor] || borderStyles.azul;
    let overlayColor = overlayBg[themeColor] || overlayBg.azul;
    
    const chartData = values.map((value, index) => ({
        name: `${index + 1}`,
        valor: value.valor != null ? Number(value.valor) : Number(value.estado),
    }));

    return (
        <div className={`relative w-full max-w-sm rounded-2xl overflow-hidden text-white flex flex-col justify-between pt-6 ${themeIndex} border ${borderColor} backdrop-blur-xl transition-smooth group hover-scale ${glowEffect}`}>
            {/* Animated gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            
            <div className="px-6 flex justify-between items-start mb-2 z-10">
                <div>
                    <p className="text-sm font-medium text-white/80 opacity-90">{title}</p>
                    <h2 className="text-2xl font-extrabold tracking-tight mt-2">{values[0]?.name || "Sem Dispositivo"}</h2>
                    <div className="mt-4">
                        <p className="text-xs text-white/70 opacity-80">
                            Resultado: {values[0]?.valor ? "1 (Detectado)" : "0 (Normal)"}
                        </p>
                        <p className="text-lg font-bold text-white mt-0.5">{values[0]?.name || "Desconhecido"}</p>
                    </div>
                </div>

                <div className={`p-3 ${overlayColor} rounded-xl backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-smooth`}>
                    <TrendingUp className="text-white w-6 h-6" />
                </div>
            </div>

            <div className="w-full h-40 mt-6 relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                        <defs>
                            <linearGradient id={`colorValor-${themeColor}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ffffff" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#ffffff" stopOpacity={0.0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#ffffff", fontSize: 11, opacity: "0.7" }} dy={8} />
                        <Area type="monotone" dataKey="valor" stroke="#ffffff" strokeWidth={2.5} fillOpacity={1} fill={`url(#colorValor-${themeColor})`} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
