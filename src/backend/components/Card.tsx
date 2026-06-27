'use client';
import { AreaChart, Area, XAxis, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

interface DateProps {
    themeColor: 'verde' | 'roxo' | 'azul' | 'vermelho' | 'cyan' | 'magenta';
    title: string;
    values: {  device_id: string; sensor: string; estado: boolean; valor?: number; name?: string }[];
    bestValue: number;
}

const themes = {
    verde: "bg-gradient-to-br from-emerald-500 to-teal-700",
    roxo: "bg-gradient-to-br from-violet-500 to-purple-700",
    azul: "bg-gradient-to-br from-blue-500 to-indigo-700",
    vermelho: "bg-gradient-to-br from-orange-500 to-red-700",
    cyan: "bg-gradient-to-br from-cyan-500 to-blue-700",
    magenta: "bg-gradient-to-br from-magenta-500 to-pink-700"
};

const glowEffects = {
    verde: "shadow-lg shadow-emerald-500/40",
    roxo: "shadow-lg shadow-violet-500/40",
    azul: "shadow-lg shadow-blue-500/40",
    vermelho: "shadow-lg shadow-orange-500/40",
    cyan: "shadow-lg shadow-cyan-500/40",
    magenta: "shadow-lg shadow-magenta-500/40"
};

const borderStyles = {
    verde: "border-emerald-500/40 hover:border-emerald-400/60",
    roxo: "border-violet-500/40 hover:border-violet-400/60",
    azul: "border-blue-500/40 hover:border-blue-400/60",
    vermelho: "border-orange-500/40 hover:border-orange-400/60",
    cyan: "border-cyan-500/40 hover:border-cyan-400/60",
    magenta: "border-magenta-500/40 hover:border-magenta-400/60"
};

const overlayBg = {
    verde: "bg-emerald-500/15",
    roxo: "bg-violet-500/15",
    azul: "bg-blue-500/15",
    vermelho: "bg-orange-500/15",
    cyan: "bg-cyan-500/15",
    magenta: "bg-magenta-500/15"
};

const gradientFills = {
    verde: "url(#colorValor-verde)",
    roxo: "url(#colorValor-roxo)",
    azul: "url(#colorValor-azul)",
    vermelho: "url(#colorValor-vermelho)",
    cyan: "url(#colorValor-cyan)",
    magenta: "url(#colorValor-magenta)"
};

export default function Card({themeColor, title, values, bestValue}: DateProps) {
    let themeIndex = themes[themeColor] || themes.azul;
    let glowEffect = glowEffects[themeColor] || glowEffects.azul;
    let borderColor = borderStyles[themeColor] || borderStyles.azul;
    let overlayColor = overlayBg[themeColor] || overlayBg.azul;
    let gradientFill = gradientFills[themeColor] || gradientFills.azul;
    
    const chartData = values.map((value, index) => ({
        name: `${index + 1}`,
        valor: value.valor != null ? Number(value.valor) : Number(value.estado),
    }));

    return (
        <div className={`relative w-full max-w-sm rounded-2xl overflow-hidden text-white flex flex-col justify-between pt-6 ${themeIndex} border ${borderColor} backdrop-blur-xl transition-smooth group hover-scale ${glowEffect}`}>
            {/* Animated gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
            
            <div className="px-6 flex justify-between items-start mb-2 z-10">
                <div>
                    <p className="text-sm font-medium text-white/85 opacity-95">{title}</p>
                    <h2 className="text-2xl font-extrabold tracking-tight mt-2">{values[0]?.name || "Sem Dispositivo"}</h2>
                    <div className="mt-4">
                        <p className="text-xs text-white/75 opacity-85">
                            Resultado: {values[0]?.valor ? "1 (Detectado)" : "0 (Normal)"}
                        </p>
                        <p className="text-lg font-bold text-white mt-0.5">{values[0]?.name || "Desconhecido"}</p>
                    </div>
                </div>

                <div className={`p-3 ${overlayColor} rounded-xl backdrop-blur-sm border border-white/30 group-hover:scale-110 transition-smooth`}>
                    <TrendingUp className="text-white w-6 h-6" />
                </div>
            </div>

            <div className="w-full h-40 mt-6 relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                        <defs>
                            <linearGradient id={`colorValor-${themeColor}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ffffff" stopOpacity={0.5} />
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
