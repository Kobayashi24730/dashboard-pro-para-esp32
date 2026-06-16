'use client';
import { AreaChart, Area, XAxis, ResponsiveContainer } from "recharts";
import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface CardProps {
    themeColor?: 'verde' | 'roxo' | 'azul' | 'vermelho' | 'indigo' | 'cyan' | 'purple' | 'blue';
    title?: string;
    values?: { device_id?: string; sensor?: string; estado?: boolean; valor?: number; name?: string }[];
    bestValue?: number;
    color?: string;
    value?: string;
    trend?: number;
    variant?: 'revenue' | 'metric' | 'compact';
}

const themes = {
    verde: "bg-gradient-to-br from-green-600 to-green-900",
    roxo: "bg-gradient-to-br from-purple-600 to-purple-900",
    azul: "bg-gradient-to-br from-blue-600 to-blue-900",
    vermelho: "bg-gradient-to-br from-red-600 to-red-900",
    indigo: "bg-gradient-to-br from-indigo-600 to-indigo-900",
    cyan: "bg-gradient-to-br from-cyan-600 to-cyan-900",
    purple: "bg-gradient-to-br from-purple-600 to-purple-900",
    blue: "bg-gradient-to-br from-blue-600 to-blue-900",
};

const borderColors = {
    verde: "border-green-500/20",
    roxo: "border-purple-500/20",
    azul: "border-blue-500/20",
    vermelho: "border-red-500/20",
    indigo: "border-indigo-500/20",
    cyan: "border-cyan-500/20",
    purple: "border-purple-500/20",
    blue: "border-blue-500/20",
};

const bgColors = {
    verde: "bg-green-500/10",
    roxo: "bg-purple-500/10",
    azul: "bg-blue-500/10",
    vermelho: "bg-red-500/10",
    indigo: "bg-indigo-500/10",
    cyan: "bg-cyan-500/10",
    purple: "bg-purple-500/10",
    blue: "bg-blue-500/10",
};

export default function Card({
    themeColor = 'azul',
    title = "Receita Operacional",
    values = [],
    bestValue = 0,
    color,
    value,
    trend = 20,
    variant = 'revenue'
}: CardProps) {
    const selectedTheme = color ? themes[color as keyof typeof themes] || themes.azul : themes[themeColor];
    const selectedBorder = color ? borderColors[color as keyof typeof borderColors] || borderColors.azul : borderColors[themeColor];
    const selectedBg = color ? bgColors[color as keyof typeof bgColors] || bgColors.azul : bgColors[themeColor];
    
    const isPositive = trend >= 0;
    
    const chartData = values.length > 0 
        ? values.map((val, index) => ({
            name: `${index + 1}`,
            valor: val.valor != null ? Number(val.valor) : Number(val.estado),
        }))
        : [];

    const displayValue = value || values[0]?.name || "Sem Dispositivo";
    const displayResult = values[0]?.valor ? "1 (Detectado)" : "0 (Normal)";

    if (variant === "compact") {
        return (
            <div className={`relative w-full rounded-xl overflow-hidden ${selectedTheme} text-white shadow-lg border ${selectedBorder} backdrop-blur-xl p-6 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 group`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                    <p className="text-sm font-medium text-white/80 mb-2">{title}</p>
                    <h2 className="text-2xl font-bold tracking-tight">{displayValue}</h2>
                    <div className="mt-3 flex items-center gap-2">
                        <span className={`text-sm font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                            {isPositive ? '+' : ''}{trend}%
                        </span>
                        {isPositive ? (
                            <ArrowUpRight className="w-4 h-4 text-green-400" />
                        ) : (
                            <ArrowDownRight className="w-4 h-4 text-red-400" />
                        )}
                    </div>
                </div>
            </div>
        );
    }

    if (variant === "metric") {
        return (
            <div className={`relative w-full rounded-xl overflow-hidden ${selectedTheme} text-white shadow-lg border ${selectedBorder} backdrop-blur-xl p-6 hover:shadow-2xl transition-all duration-300 group`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-white/80 mb-2">{title}</p>
                        <h2 className="text-3xl font-bold tracking-tight">{displayValue}</h2>
                    </div>
                    <div className={`p-3 ${selectedBg} rounded-lg border ${selectedBorder}`}>
                        <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                </div>

                <div className="relative z-10 mt-4 flex items-center gap-2">
                    <span className={`text-sm font-semibold ${isPositive ? 'text-green-300' : 'text-red-300'}`}>
                        {isPositive ? '+' : ''}{trend}% vs mês anterior
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className={`relative w-full max-w-sm rounded-2xl overflow-hidden ${selectedTheme} text-white shadow-2xl border ${selectedBorder} backdrop-blur-xl flex flex-col justify-between pt-6 hover:shadow-2xl transition-all duration-300 group`}>
            {/* Animated gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="px-6 flex justify-between items-start mb-2 z-10">
                <div>
                    <p className="text-sm font-medium text-white/80 opacity-90">{title}</p>
                    <h2 className="text-3xl font-extrabold tracking-tight mt-2">{displayValue}</h2>
                    <div className="mt-4">
                        <p className="text-xs text-white/70 opacity-80">Resultado: {displayResult}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <p className="text-lg font-bold text-white">{trend}%</p>
                            {isPositive ? (
                                <ArrowUpRight className="w-5 h-5 text-green-400" />
                            ) : (
                                <ArrowDownRight className="w-5 h-5 text-red-400" />
                            )}
                        </div>
                    </div>
                </div>

                <div className={`p-3 ${selectedBg} rounded-xl backdrop-blur-sm border ${selectedBorder} group-hover:scale-110 transition-transform duration-300`}>
                    <TrendingUp className="text-white w-6 h-6" />
                </div>
            </div>

            <div className="w-full h-40 mt-6 relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData.length > 0 ? chartData : [{ name: "1", valor: 0 }]} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
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
    );
}
