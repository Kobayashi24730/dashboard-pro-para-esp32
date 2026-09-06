'use client';

import { formatTime } from "@/lib/formatTime";
import { SensorData } from "@/types/types";

// Retorna unidades de medida dinâmicas
function getSensorUnit(sensor: string) {
    const s = sensor?.toUpperCase() || "";
    if (s.includes("WIFI") || s.includes("RSSI")) return "dBm";
    if (s.includes("UPTIME")) return "s";
    if (s.includes("MEMORI") || s.includes("HEAP")) return "KB";
    if (s.includes("TEMP") || s.includes("RESPOSTA")) return "ms";
    if (s.includes("SOUND") || s.includes("SOM")) return "ADC";
    if (s.includes("HUMID")) return "%";
    if (s.includes("ULTRA")) return "cm";
    return "";
}

// Avalia os valores e determina o tema de cores (Normal, Alerta ou Crítico)
function getSensorStatusTheme(sensor: string, val: number) {
    const s = sensor?.toUpperCase() || "";

    let status: "normal" | "warning" | "critical" = "normal";

    // Regras de negócio por tipo de sensor
    if (s.includes("WIFI") || s.includes("RSSI")) {
        if (val < -85) status = "critical";
        else if (val < -75) status = "warning";
    } else if (s.includes("SOUND") || s.includes("SOM")) {
        if (val > 1000) status = "critical";
        else if (val > 700) status = "warning";
    } else if (s.includes("TEMP") || s.includes("RESPOSTA")) {
        if (val > 5000) status = "critical";
        else if (val > 2000) status = "warning";
    }

    // Mapeamento de estilos CSS Tailwind e cores HEX para SVG
    switch (status) {
        case "critical":
            return {
                bgCard: "bg-red-500/10 border-red-500/30 hover:border-red-500/50",
                badgeBg: "bg-red-500/20 text-red-700 dark:text-red-300",
                badgeText: "Crítico",
                strokeColor: "#ef4444", // red-500
                dotColor: "bg-red-500",
            };
        case "warning":
            return {
                bgCard: "bg-amber-500/10 border-amber-500/30 hover:border-amber-500/50",
                badgeBg: "bg-amber-500/20 text-amber-700 dark:text-amber-300",
                badgeText: "Alerta",
                strokeColor: "#f59e0b", // amber-500
                dotColor: "bg-amber-500",
            };
        default:
            return {
                bgCard: "bg-blue-500/5 border-blue-500/20 hover:border-blue-500/40",
                badgeBg: "bg-blue-500/15 text-blue-700 dark:text-blue-300",
                badgeText: "Normal",
                strokeColor: "#3b82f6", // blue-500
                dotColor: "bg-emerald-500",
            };
    }
}

// Gera a linha SVG (Stroke) e a Área FECHADA (Fill)
function generateSparklinePaths(historyValues: number[], width = 200, height = 40) {
    if (!historyValues || historyValues.length < 2) {
        const defaultLine = `M 0 ${height / 2} L ${width} ${height / 2}`;
        const defaultArea = `${defaultLine} L ${width} ${height} L 0 ${height} Z`;
        return { strokePath: defaultLine, areaPath: defaultArea };
    }

    const min = Math.min(...historyValues);
    const max = Math.max(...historyValues);
    const range = max - min === 0 ? 1 : max - min;

    const points = historyValues.map((val, idx) => {
        const x = (idx / (historyValues.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 12) - 6;
        return `${x},${y}`;
    });

    const strokePath = `M ${points.join(" L ")}`;
    const areaPath = `${strokePath} L ${width} ${height} L 0 ${height} Z`;

    return { strokePath, areaPath };
}

export default function RecentActivity({ data }: { data: SensorData[] }) {
    const recentData = data.slice(-5).reverse();

    return (
        <div className="space-y-2">
            {recentData.map((item, index) => {
                const valNumber = typeof item.valor === "number" ? item.valor : Number(item.valor) || 0;
                const unit = getSensorUnit(item.sensor);
                const theme = getSensorStatusTheme(item.sensor, valNumber);

                // Busca histórico do dispositivo para construir a onda do gráfico
                const history = data
                    .filter((d) => d.device_id === item.device_id)
                    .slice(-10)
                    .map((d) => (typeof d.valor === "number" ? d.valor : Number(d.valor) || 0));

                const { strokePath, areaPath } = generateSparklinePaths(history);
                const gradientId = `sparkline-grad-${item.id || index}`;

                return (
                    <div
                        key={item.id || index}
                        className={`fluent-card relative overflow-hidden flex items-center justify-between p-3 border rounded-xl shadow-sm transition-all hover:shadow-md ${theme.bgCard}`}
                    >
                        {/* ── Gráfico de Fundo (Linha Forte + Gradiente Preenchido) ── */}
                        <div className="absolute inset-0 pointer-events-none opacity-40 flex items-center justify-end">
                            <svg className="w-2/3 h-full overflow-visible" viewBox="0 0 200 40" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={theme.strokeColor} stopOpacity="0.4" />
                                        <stop offset="100%" stopColor={theme.strokeColor} stopOpacity="0.0" />
                                    </linearGradient>
                                </defs>

                                {/* Área de preenchimento suave sob a linha */}
                                <path d={areaPath} fill={`url(#${gradientId})`} />

                                {/* Linha do gráfico destacada */}
                                <path
                                    d={strokePath}
                                    fill="none"
                                    stroke={theme.strokeColor}
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        {/* ── Informações da Esquerda ── */}
                        <div className="relative z-10 flex items-center gap-3">
                            <div className="relative flex items-center justify-center">
                                <div className={`w-2.5 h-2.5 rounded-full ${theme.dotColor}`} />
                                <div className={`absolute w-4 h-4 rounded-full ${theme.dotColor} opacity-30 animate-ping`} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-semibold text-foreground">
                                        {item.sensor}
                                    </p>
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${theme.badgeBg}`}>
                                        {theme.badgeText}
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground font-mono">
                                    {item.device_id}
                                </p>
                            </div>
                        </div>

                        {/* ── Informações da Direita ── */}
                        <div className="relative z-10 text-right">
                            <div className="flex items-baseline justify-end gap-1">
                                <p className="text-sm font-bold text-foreground tabular-nums">
                                    {valNumber.toLocaleString("pt-BR")}
                                </p>
                                {unit && (
                                    <span className="text-xs font-medium text-muted-foreground">
                                        {unit}
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {formatTime(item.created_at)}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}