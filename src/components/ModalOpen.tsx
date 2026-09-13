'use client';
import { useRef } from "react";
import { DetalhesPirProps, Status, Theme, SensorData } from '@/types/types';

function getTheme(status: Status): Theme {
  switch (status) {
    case "Critical":
      return {
        bgCard: "bg-white border-red-200",
        badgeBg: "bg-red-50 text-red-700 border border-red-200",
        badgeText: "Crítico",
        strokeColor: "#D13438",
        dotColor: "bg-red-600",
        iconBg: "bg-red-50",
        iconColor: "text-red-600",
      };
    case "Warning":
      return {
        bgCard: "bg-white border-amber-200",
        badgeBg: "bg-amber-50 text-amber-800 border border-amber-200",
        badgeText: "Alerta",
        strokeColor: "#F7630C",
        dotColor: "bg-amber-500",
        iconBg: "bg-amber-50",
        iconColor: "text-amber-700",
      };
    default:
      return {
        bgCard: "bg-white border-[#E1E1E1]",
        badgeBg: "bg-[#EFF6FC] text-[#0078D4] border border-[#C7E0F4]",
        badgeText: "Normal",
        strokeColor: "#0078D4",
        dotColor: "bg-[#0078D4]",
        iconBg: "bg-[#EFF6FC]",
        iconColor: "text-[#0078D4]",
      };
  }
}

// Icon modal
function SensorIcon({ status }: { status: Status }) {
  if (status === "Critical") {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
      </svg>
    );
  }
  if (status === "Warning") {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0v-4.5zm-.75 7a.75.75 0 100 1.5.75.75 0 000-1.5z" clipRule="evenodd" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
  );
}

function getSensorUnit(sensor: string): string {
  const s = sensor.toUpperCase();
  if (s.includes("WIFI") || s.includes("RSSI")) return "dBm";
  if (s.includes("UPTIME")) return "s";
  if (s.includes("HEAP")) return "KB";
  if (s.includes("TEMP") || s.includes("RESPOSTA")) return "ms";
  if (s.includes("SOUND") || s.includes("SOM")) return "ADC";
  if (s.includes("HUMID")) return "%";
  if (s.includes("ULTRA")) return "cm";
  if (s.includes("PIR")) return "ms";
  return "";
}

function getSensorStatus(sensor: string, val: number): Status {
  const s = sensor.toUpperCase();
  if (s.includes("PIR")) {
    if (val < -85) return "Critical";
    if (val < -75) return "Warning";
  } else if (s.includes("SOUND") || s.includes("SOM")) {
    if (val > 1000) return "Critical";
    if (val > 700) return "Warning";
  } else if (s.includes("TEMP") || s.includes("RESPOSTA")) {
    if (val > 5000) return "Critical";
    if (val > 2000) return "Warning";
  }
  return "Normal";
}

function generateSparklinePaths(values: number[], width = 600, height = 100) {
  if (!values || values.length < 2) {
    const mid = height / 2;
    return {
      strokePath: `M 0 ${mid} L ${width} ${mid}`,
      areaPath: `M 0 ${mid} L ${width} ${mid} L ${width} ${height} L 0 ${height} Z`,
    };
  }
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max === min ? 1 : max - min;
  const pad = 10;
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - pad * 2) - pad;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });
  const strokePath = `M ${points.join(" L ")}`;
  const areaPath = `${strokePath} L ${width} ${height} L 0 ${height} Z`;
  return { strokePath, areaPath };
}

{/* Um card individual de sensor, usado tanto no modo único quanto no modo múltiplos */}
function SensorCard({
  data,
  theme,
  status,
  unit,
  min,
  avg,
  max,
  strokePath,
  areaPath,
  gradientId,
  onClose,
}: {
  data: SensorData;
  theme: Theme;
  status: Status;
  unit: string;
  min: number;
  avg: number;
  max: number;
  strokePath: string;
  areaPath: string;
  gradientId: string;
  onClose: () => void;
}) {
  const currentValue = Number(data.value ?? 0);

  return (
    <div className={`relative overflow-hidden rounded-md border shadow-sm ${theme.bgCard}`}>
      <div className="flex items-start justify-between gap-3 px-4 pt-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-md ${theme.iconBg} ${theme.iconColor}`}>
            <SensorIcon status={status} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#201F1E] leading-tight">
              {data.sensor}
            </h2>
            <p className="text-xs text-[#605E5C] font-mono mt-0.5">
              {data.device_id}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${theme.badgeBg}`}>
            {theme.badgeText}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded text-[#605E5C] hover:text-[#201F1E] hover:bg-[#F3F2F1] transition-colors"
            aria-label="Fechar"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
              <path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="px-4 pt-3">
        <p className="text-2xl font-semibold text-[#201F1E] tabular-nums leading-none">
          {currentValue.toLocaleString('pt-BR')}
          {unit && (
            <span className="text-sm font-medium text-[#605E5C] ml-1">
              {unit}
            </span>
          )}
        </p>
        <p className="text-xs text-[#A19F9D] mt-1">Criado {data.created_at}</p>
      </div>

      {/* faixa de sparkline com altura fixa, não mais esticada pelo card inteiro */}
      <div className="relative h-14 mx-4 mt-2">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 600 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={theme.strokeColor} stopOpacity="0.35" />
              <stop offset="100%" stopColor={theme.strokeColor} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill={`url(#${gradientId})`} />
          <path d={strokePath} fill="none" stroke={theme.strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* stats rows */}
      <div className="grid grid-cols-3 divide-x divide-[#EDEBE9] border-y border-[#EDEBE9] mt-3">
        {[
          { label: "Min", value: `${min.toLocaleString('pt-BR')}${unit}` },
          { label: "Média", value: `${avg.toFixed(1)}${unit}` },
          { label: "Max", value: `${max.toLocaleString('pt-BR')}${unit}` },
        ].map((s) => (
          <div key={s.label} className="px-3 py-2.5 text-center">
            <p className="text-[10px] text-[#A19F9D] uppercase tracking-widest mb-0.5">{s.label}</p>
            <p className="text-sm font-semibold text-[#201F1E] font-mono tabular-nums">{s.value}</p>
          </div>
        ))}
      </div>

      {/* infos rows */}
      <div className="px-4 pb-4 divide-y divide-[#EDEBE9]">
        {[
          { label: "Localização", value: data.id },
          { label: "Firmware", value: data.device_id },
          { label: "Name", value: data.sensor },
        ].map((s) => (
          <div key={s.label} className="flex items-center justify-between py-2">
            <span className="text-xs text-[#A19F9D]">{s.label}</span>
            <span className="text-xs font-medium text-[#323130] font-mono">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ModalOpen({ isOpen, onClose, values, bestValue = 1000 }: DetalhesPirProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  if (!isOpen) return null;

  const isMultiple = Array.isArray(values);
  const dataArray: SensorData[] = Array.isArray(values) ? values : [values];
  const currentData = dataArray[dataArray.length - 1] || ({} as SensorData);
  const currentValue = Number(currentData.value ?? 0);
  const status = getSensorStatus(currentData.sensor, currentValue);
  const theme = getTheme(status);
  const unit = getSensorUnit(currentData.sensor);
  const numericValues = dataArray.map((d) => Number(d.value ?? 0));
  const min = numericValues.length > 0 ? Math.min(...numericValues) : 0;
  const max = numericValues.length > 0 ? Math.max(...numericValues) : 0;
  const avg = numericValues.length > 0 ? numericValues.reduce((a, b) => a + b, 0) / numericValues.length : 0;
  const { strokePath, areaPath } = generateSparklinePaths(numericValues);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      style={{ fontFamily: '"Segoe UI", "Segoe UI Web", -apple-system, BlinkMacSystemFont, Roboto, sans-serif' }}
    >
      <div className={`w-full ${isMultiple ? "max-w-3xl" : "max-w-md"} max-h-[90vh] overflow-y-auto rounded-md bg-white border border-[#E1E1E1] shadow-2xl`}>
        <div className="p-4 space-y-4">
          {isMultiple && (
            <div className="grid grid-cols-3 divide-x divide-[#C7E0F4] border border-[#C7E0F4] rounded-md bg-[#EFF6FC] p-2">
              <div className="text-center">
                <p className="text-[10px] text-[#0078D4] uppercase font-semibold tracking-wide">Mínimo</p>
                <p className="text-sm font-semibold text-[#201F1E] font-mono">{min.toLocaleString('pt-BR')}{unit}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-[#0078D4] uppercase font-semibold tracking-wide">Média</p>
                <p className="text-sm font-semibold text-[#201F1E] font-mono">{avg.toFixed(1)}{unit}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-[#0078D4] uppercase font-semibold tracking-wide">Máximo</p>
                <p className="text-sm font-semibold text-[#201F1E] font-mono">{max.toLocaleString('pt-BR')}{unit}</p>
              </div>
            </div>
          )}

          {isMultiple ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dataArray.map((item, index) => (
                <SensorCard
                  key={item.id ?? index}
                  data={item}
                  theme={theme}
                  status={status}
                  unit={unit}
                  min={min}
                  avg={avg}
                  max={max}
                  strokePath={strokePath}
                  areaPath={areaPath}
                  gradientId={`gradient-${item.id ?? index}`}
                  onClose={onClose}
                />
              ))}
            </div>
          ) : (
            <SensorCard
              data={currentData}
              theme={theme}
              status={status}
              unit={unit}
              min={min}
              avg={avg}
              max={max}
              strokePath={strokePath}
              areaPath={areaPath}
              gradientId={`gradient-${currentData.id}`}
              onClose={onClose}
            />
          )}

          {/* footer */}
          <button
            type="button"
            onClick={onClose}
            className="w-full px-4 py-2 text-sm font-semibold text-white bg-[#0078D4] hover:bg-[#106EBE] active:bg-[#005A9E] rounded transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}