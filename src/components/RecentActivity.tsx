'use client';

import { formatTime } from "@/lib/formatTime";
import { SensorData } from "@/types/types";

function getSensorUnit(sensor: string) {
    const s = sensor?.toUpperCase() || "";
    if (s.includes("WIFI") || s.includes("RSSI")) return "dBm";
    if (s.includes("UPTIME")) return "s";
    if (s.includes("MEMORI") || s.includes("HEAP")) return "KB";
    if (s.includes("TEMP") || s.includes("RESPOSTA")) return "ms";
    if (s.includes("SOUND") || s.includes("SOM") || s.includes("ADC")) return "ADC";
    if (s.includes("HUMID") || s.includes("UMID")) return "%";
    if (s.includes("ULTRA")) return "cm";
    return "";
}

function getSensorStatusTheme(sensor: string, val: number) {
    const s = sensor?.toUpperCase() || "";

    let status: "normal" | "warning" | "critical" = "normal";

    if (s.includes("WIFI") || s.includes("RSSI")) {
        if (val < -85) status = "critical";
        else if (val < -75) status = "warning";
    } else if (s.includes("SOUND") || s.includes("SOM") || s.includes("ADC")) {
        if (val > 1000) status = "critical";
        else if (val > 700) status = "warning";
    } else if (s.includes("TEMP") || s.includes("RESPOSTA")) {
        if (val > 5000) status = "critical";
        else if (val > 2000) status = "warning";
    }

    switch (status) {
        case "critical":
            return {
                bgCard: "bg-red-50 border-red-200 text-red-900",
                badgeBg: "bg-red-200 text-red-800 font-bold",
                badgeText: "CRÍTICO",
                strokeColor: "#ef4444",
                fillColor: "#fca5a5",  
                dotColor: "bg-red-500",
            };
        case "warning":
            return {
                bgCard: "bg-amber-50 border-amber-200 text-amber-900",
                badgeBg: "bg-amber-200 text-amber-800 font-bold",
                badgeText: "ALERTA",
                strokeColor: "#f59e0b",
                fillColor: "#fde68a",  
                dotColor: "bg-amber-500",
            };
        default:
            return {
                bgCard: "bg-blue-50 border-blue-200 text-blue-900",
                badgeBg: "bg-blue-200 text-blue-800 font-bold",
                badgeText: "NORMAL",
                strokeColor: "#3b82f6",
                fillColor: "#bfdbfe",  
                dotColor: "bg-emerald-500",
            };
    }
}

function generateSparklinePaths(historyValues: number[], width = 300, height = 60) {
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
        const y = height - ((val - min) / range) * (height - 16) - 8;
        return `${x},${y}`;
    });

    const strokePath = `M ${points.join(" L ")}`;
    const areaPath = `${strokePath} L ${width} ${height} L 0 ${height} Z`;

    return { strokePath, areaPath };
}

export default function RecentActivity({ data }: { data: SensorData[] }) {
    const recentData = data.slice(-5).reverse();

    return (
        <div className="space-y-3">
            {recentData.map((item, index) => {
                const valNumber = typeof item.value === "number" ? item.value : Number(item.value) || 0;
                const unit = getSensorUnit(item.sensor);
                const theme = getSensorStatusTheme(item.sensor, valNumber);

                const history = data
                    .filter((d) => d.device_id === item.device_id)
                    .slice(-10)
                    .map((d) => (typeof d.value === "number" ? d.value : Number(d.value) || 0));

                const { strokePath, areaPath } = generateSparklinePaths(history);

                return (
                    <div
                        key={item.id || index}
                        className={`relative overflow-hidden flex items-center justify-between p-4 border rounded-2xl shadow-sm transition-all hover:shadow-md ${theme.bgCard}`}
                    >
                        <div className="absolute inset-0 pointer-events-none z-0">
                            <svg
                                className="w-full h-full"
                                viewBox="0 0 300 60"
                                preserveAspectRatio="none"
                            >
                                <path
                                    d={areaPath}
                                    fill={theme.fillColor}
                                    fillOpacity="0.45"
                                />
                                <path
                                    d={strokePath}
                                    fill="none"
                                    stroke={theme.strokeColor}
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        {/* ── Conteúdo da Esquerda ── */}
                        <div className="relative z-10 flex items-center gap-3">
                            <div className="relative flex items-center justify-center">
                                <div className={`w-3 h-3 rounded-full ${theme.dotColor}`} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-bold tracking-tight">
                                        {item.sensor}
                                    </p>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-md ${theme.badgeBg}`}>
                                        {theme.badgeText}
                                    </span>
                                </div>
                                <p className="text-xs opacity-75 font-mono">
                                    {item.device_id}
                                </p>
                            </div>
                        </div>

                        {/* ── Conteúdo da Direita ── */}
                        <div className="relative z-10 text-right">
                            <div className="flex items-baseline justify-end gap-1">
                                <p className="text-base font-extrabold tabular-nums">
                                    {valNumber.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                                </p>
                                {unit && (
                                    <span className="text-xs font-semibold opacity-75">
                                        {unit}
                                    </span>
                                )}
                            </div>
                            <p className="text-[11px] opacity-60 font-medium">
                                {formatTime(item.created_at)}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}