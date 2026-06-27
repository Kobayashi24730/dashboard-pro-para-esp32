'use client';
import { AreaChart, Area, XAxis, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

interface DateProps {
    themeColor?: 'verde' | 'roxo' | 'azul' | 'vermelho' | 'cyan' | 'fuchsia';
    title: string;
    values?: {  device_id: string; sensor: string; estado: boolean; valor?: number; name?: string }[];
    bestValue?: number;
}

const themes = {
    verde: "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200",
    roxo: "bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200",
    azul: "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200",
    vermelho: "bg-gradient-to-br from-orange-50 to-red-50 border-orange-200",
    cyan: "bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200",
    fuchsia: "bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200"
};

const accentColors = {
    verde: { text: "text-green-700", badge: "bg-green-100 text-green-700", line: "#10b981" },
    roxo: { text: "text-purple-700", badge: "bg-purple-100 text-purple-700", line: "#a855f7" },
    azul: { text: "text-blue-700", badge: "bg-blue-100 text-blue-700", line: "#3b82f6" },
    vermelho: { text: "text-orange-700", badge: "bg-orange-100 text-orange-700", line: "#f97316" },
    cyan: { text: "text-cyan-700", badge: "bg-cyan-100 text-cyan-700", line: "#06b6d4" },
    fuchsia: { text: "text-pink-700", badge: "bg-pink-100 text-pink-700", line: "#ec4899" }
};

export default function Card({themeColor = 'azul', title, values = [], bestValue = 1000}: DateProps) {
    const theme = themes[themeColor] || themes.azul;
    const accent = accentColors[themeColor] || accentColors.azul;
    
    const chartData = (values || []).map((value, index) => ({
        name: `${index + 1}`,
        valor: value.valor != null ? Number(value.valor) : Number(value.estado),
    }));

    const maxValue = Math.max(...chartData.map(d => d.valor), bestValue);
    const currentValue = chartData.length > 0 ? chartData[chartData.length - 1].valor : 0;
    const percentageChange = chartData.length > 1 
        ? ((chartData[chartData.length - 1].valor - chartData[0].valor) / chartData[0].valor * 100).toFixed(1)
        : 0;

    return (
        <div className={`fluent-card ${theme} border-2 relative overflow-hidden group hover:shadow-lg`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
                    <p className={`text-sm font-medium ${accent.text}`}>
                        {currentValue.toFixed(1)} {values?.[0]?.sensor || 'units'}
                    </p>
                </div>
                <div className={`p-2 rounded-lg ${accent.badge}`}>
                    <TrendingUp size={18} />
                </div>
            </div>

            {/* Value Display */}
            <div className="mb-4">
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">{currentValue.toFixed(0)}</span>
                    <span className={`text-sm font-semibold ${percentageChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {percentageChange >= 0 ? '+' : ''}{percentageChange}%
                    </span>
                </div>
            </div>

            {/* Chart */}
            <div className="w-full h-32 mt-4 relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                        <defs>
                            <linearGradient id={`colorValor-${themeColor}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={accent.line} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={accent.line} stopOpacity={0.0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="#d1d5db" style={{ fontSize: '12px' }} />
                        <Area 
                            type="monotone" 
                            dataKey="valor" 
                            stroke={accent.line} 
                            strokeWidth={2}
                            fill={`url(#colorValor-${themeColor})`}
                            dot={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Footer Stats */}
            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between text-xs text-gray-600">
                <div>
                    <p className="font-medium text-gray-900">Max</p>
                    <p>{maxValue.toFixed(0)}</p>
                </div>
                <div>
                    <p className="font-medium text-gray-900">Avg</p>
                    <p>{(chartData.reduce((a, b) => a + b.valor, 0) / chartData.length || 0).toFixed(0)}</p>
                </div>
                <div>
                    <p className="font-medium text-gray-900">Min</p>
                    <p>{Math.min(...chartData.map(d => d.valor), bestValue).toFixed(0)}</p>
                </div>
            </div>
        </div>
    );
}
