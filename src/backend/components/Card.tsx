'use client';

import { AreaChart, Area, XAxis, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

interface DateProps {
    themeColor?: 'verde' | 'roxo' | 'azul' | 'vermelho' | 'cyan' | 'fuchsia';
    title: string;
    values?: { device_id: string; sensor: string; estado: boolean; valor?: number; name?: string }[];
    bestValue?: number;
}

const accentColors = {
    verde:   { line: "#107c10", badge: "bg-success/10 text-success",   positive: "text-success", negative: "text-error" },
    roxo:    { line: "#8764b8", badge: "bg-purple-100 text-purple-700", positive: "text-success", negative: "text-error" },
    azul:    { line: "#0078d4", badge: "bg-info/10 text-info",         positive: "text-success", negative: "text-error" },
    vermelho:{ line: "#d13438", badge: "bg-error/10 text-error",       positive: "text-success", negative: "text-error" },
    cyan:    { line: "#00b7c3", badge: "bg-cyan-100 text-cyan-700",    positive: "text-success", negative: "text-error" },
    fuchsia: { line: "#e3008c", badge: "bg-pink-100 text-pink-700",    positive: "text-success", negative: "text-error" },
};

export default function Card({ themeColor = 'azul', title, values = [], bestValue = 1000 }: DateProps) {
    const accent = accentColors[themeColor] || accentColors.azul;

    const chartData = (values || []).map((value, index) => ({
        name: `${index + 1}`,
        valor: value.valor != null ? Number(value.valor) : Number(value.estado),
    }));

    const maxValue = Math.max(...chartData.map((d) => d.valor), bestValue);
    const currentValue = chartData.length > 0 ? chartData[chartData.length - 1].valor : 0;
    const pctChange =
        chartData.length > 1
            ? Number(
                  (
                      ((chartData[chartData.length - 1].valor - chartData[0].valor) /
                          chartData[0].valor) *
                      100
                  ).toFixed(1)
              )
            : 0;

    return (
        <div className="fluent-card p-4 overflow-hidden">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-sm font-semibold text-foreground mb-0.5">
                        {title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        {currentValue.toFixed(1)}{' '}
                        {values?.[0]?.sensor || 'units'}
                    </p>
                </div>
                <div className={`p-1.5 rounded-md ${accent.badge}`}>
                    <TrendingUp size={16} />
                </div>
            </div>

            {/* Big number */}
            <div className="flex items-baseline gap-2 mb-3">
                <span className="text-2xl font-semibold text-foreground tabular-nums">
                    {currentValue.toFixed(0)}
                </span>
                <span
                    className={`text-xs font-semibold ${
                        pctChange >= 0 ? accent.positive : accent.negative
                    }`}
                >
                    {pctChange >= 0 ? '+' : ''}
                    {pctChange}%
                </span>
            </div>

            {/* Chart */}
            <div className="w-full h-28">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chartData}
                        margin={{ top: 8, right: 8, left: -24, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient
                                id={`grad-${themeColor}`}
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop offset="5%" stopColor={accent.line} stopOpacity={0.2} />
                                <stop offset="95%" stopColor={accent.line} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="name"
                            stroke="#a19f9d"
                            style={{ fontSize: '10px' }}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Area
                            type="monotone"
                            dataKey="valor"
                            stroke={accent.line}
                            strokeWidth={2}
                            fill={`url(#grad-${themeColor})`}
                            dot={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Footer */}
            <div className="mt-3 pt-3 border-t border-border flex justify-between text-xs">
                {[
                    { label: 'Max', val: maxValue },
                    { label: 'Avg', val: chartData.reduce((a, b) => a + b.valor, 0) / (chartData.length || 1) },
                    { label: 'Min', val: Math.min(...chartData.map((d) => d.valor), bestValue) },
                ].map((s) => (
                    <div key={s.label}>
                        <p className="text-muted-foreground">{s.label}</p>
                        <p className="font-semibold text-foreground tabular-nums">
                            {s.val.toFixed(0)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
