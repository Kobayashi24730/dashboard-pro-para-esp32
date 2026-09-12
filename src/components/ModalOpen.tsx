'use client';
import { useState, useEffect, useRef } from "react";
import { DetalhesPirProps, Status, Theme, SensorData } from '@/types/types';
import { TextFormatValues } from '../hooks/useTextValues';

function getTheme(status: Status): Theme {
  switch (status) {
    case "Critical":
      return {
        bgCard: "bg-red-500/10 border-red-500/30",
        badgeBg: "bg-red-500/20 text-red-700",
        badgeText: "Crítico",
        strokeColor: "#ef4444",
        dotColor: "bg-red-500",
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
      };
    case "Warning":
      return {
        bgCard: "bg-amber-500/10 border-amber-500/30",
        badgeBg: "bg-amber-500/20 text-amber-700",
        badgeText: "Alerta",
        strokeColor: "#f59e0b",
        dotColor: "bg-amber-500",
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
      };
    default:
      return {
        bgCard: "bg-blue-500/5 border-blue-500/20",
        badgeBg: "bg-blue-500/15 text-blue-700",
        badgeText: "Normal",
        strokeColor: "#3b82f6",
        dotColor: "bg-emerald-500",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
      };
  }
}

// Icon modal
function SensorIcon ({ status } : { status: Status }) {
  if (status === "Critical") {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
      </svg>
    );
  };
  if (status === "Warning") {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0v-4.5zm-.75 7a.75.75 0 100 1.5.75.75 0 000-1.5z" clipRule="evenodd" />
      </svg>
    );
  };
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
  );
}

function getSensorUnit(sensor: string): string {
  const s = sensor.toUpperCase();
  if (s.includes("WIFI") || s.includes("RSSI")) return "dBm"
  if (s.includes("UPTIME")) return "s"
  if (s.includes("HEAP")) return "KB"
  if (s.includes("TEMP") || s.includes("RESPOSTA")) return "ms"
  if (s.includes("SOUND") || s.includes("SOM")) return "ADC"
  if (s.includes("HUMID")) return "%"
  if (s.includes("ULTRA")) return "cm"
  if (s.includes("PIR")) return "ms"
  return ""
}

function getSensorStatus(sensor: string, val: number): Status {
  const s = sensor.toUpperCase();
  if (s.includes("PIR")) {
    if (val < -85) return "Critical"
    if (val < -75) return "Warning"
  } else if (s.includes("SOUND") || s.includes("SOM")) {
    if (val > 1000) return "Critical"
    if (val > 700) return "Warning"
  } else if (s.includes("TEMP") || s.includes("RESPOSTA")) {
    if (val > 5000) return "Critical"
    if (val > 2000) return "Warning"
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

export default function ModalOpen({isOpen, onClose, values, bestValue = 1000}: DetalhesPirProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  if(!isOpen) return null;

  const isMultiple = Array.isArray(values);
  const dataArray: SensorData[] = Array.isArray(values) ? values : [values];
  const currentData = dataArray[dataArray.length -1] || {};
  const currentValue = Number(currentData.value ?? 0);
  const status = getSensorStatus(currentData.sensor, currentValue);
  const theme = getTheme(status);
  const unit = getSensorUnit(currentData.sensor);
  const gradientId = `gradient-${currentData.id}`;
  const numericValues = dataArray.map((d) =>  Number(d.value ?? 0));
  const min = numericValues.length > 0 ? Math.min(...numericValues) : 0;
  const max = numericValues.length > 0 ? Math.max(...numericValues) : 0;
  const avg = numericValues.length > 0 ? numericValues.reduce((a, b) => a + b, 0) / numericValues.length : 0;
  const { strokePath, areaPath } = generateSparklinePaths(numericValues);

  console.log("Aqui: ", currentData);
  return (
    <div ref={overlayRef} onClick={(e) => e.target === overlayRef.current && onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      {/* Cards */}
      
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div
          className={`relative overflow-hidden ${theme.bgCard} border-b border-zinc-100 px-5 pt-5 pb-4`}
        >
          {isMultiple ? (
            <>
              <div className="grid grid-cols-3 divide-x divide-zinc-100 border border-zinc-100 rounded-xl p-2 bg-zinc-50/50">
                <div className="text-center">
                  <p className="text-[10px] text-zinc-400 uppercase">Mínimo</p>
                  <p className="text-sm font-semibold text-zinc-800 font-mono">{min.toLocaleString('pt-BR')}{unit}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-zinc-400 uppercase">Média</p>
                  <p className="text-sm font-semibold text-zinc-800 font-mono">{avg.toFixed(1)}{unit}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-zinc-400 uppercase">Máximo</p>
                  <p className="text-sm font-semibold text-zinc-800 font-mono">{max.toLocaleString('pt-BR')}{unit}</p>
                </div>
              </div>
              {dataArray.map((values, index) => {
                return (
                  <div key={index}>
                    <svg
                      className="absolute inset-0 w-full h-full opacity-30"
                      viewBox="0 0 600 100"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%"  stopColor={theme.strokeColor} stopOpacity="0.5" />
                          <stop offset="100%" stopColor={theme.strokeColor} stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="100" fill={`url(#${gradientId})`} />
                      <path d="100" fill="none" stroke={theme.strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    
                    <div className="relative z-10 flex items-start justify-between gap-3">
                      <div className="flexitems-center gap-3">
                        <div className={`p-2 rounded-xl ${theme.iconBg} ${theme.iconColor}`}>
                          <SensorIcon status={status} />
                        </div>
                        <div>
                          <h2 className="text-base font-semibold text-zinc-900 leading-tight">
                            {currentData.sensor}
                          </h2>
                          <p className="text-xs text-zinc-500 font-mono mt-0.5">
                            {currentData.device_id}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${theme.badgeBg}`}>
                        </span>
                          {theme.badgeText}
                        <button
                          onClick={onClose}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
                          aria-label="Fechar"
                        >
                          <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                            <path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="relative z-10 mt-3">
                      <p className="text-3xl font-bold text-zinc-900 tabular-nums leading-none">
                        {currentValue.toLocaleString('pt-BR')}
                        {unit && (
                          <span className="text-base font-medium text-zinc-500 ml-1">
                            {unit}
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-zinc-400 mt-1"> Criado {values.created_at}</p>
                    </div>

                    {/* stats rows */}
                    <div className="grid grid-cols-3 divide-x divide-zinc-100 border-b border-zinc-100">
                      {[
                        { label: "Min", value: `${min.toLocaleString('pt-br')}${unit}` },
                        { label: "Media", value: `${avg.toFixed(1)}${unit}`},
                        { label: "Max", value: `${max.toLocaleString('pt-br')}${unit}` },
                      ].map((s) => (
                        <div key={s.label} className="px-4 py-3 text-center">
                          <p className="text-[10px] text-zinc-400 uppercase tracking-widest mb-0.5">{s.label}</p>
                          <p className="text-sm font-semibold text-zinc-800 font-mono tabular-nums">{s.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* infos rows */}
                    <div>
                      {[
                        { label: "Localização" , value: values.id},
                        { label: "Firware", value: values.device_id},
                        { label: "Name", value: values.name}
                      ].map((s) => (
                        <div key={s.label} className="flex items-center justify-between">
                          <span className="text-xs text-zinc-400">
                            {s.label}
                          </span>
                          <span className="text-xs font-medium text-zinc-700 font-mono">
                            {s.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div>
              <svg
                className="absolute inset-0 w-full h-full opacity-30"
                viewBox="0 0 600 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"  stopColor={theme.strokeColor} stopOpacity="0.5" />
                    <stop offset="100%" stopColor={theme.strokeColor} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="100" fill={`url(#${gradientId})`} />
                <path d="100" fill="none" stroke={theme.strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              
              <div className="relative z-10 flex items-start justify-between gap-3">
                <div className="flexitems-center gap-3">
                  <div className={`p-2 rounded-xl ${theme.iconBg} ${theme.iconColor}`}>
                    <SensorIcon status={status} />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-zinc-900 leading-tight">
                      {currentData.sensor}
                    </h2>
                    <p className="text-xs text-zinc-500 font-mono mt-0.5">
                      {currentData.device_id}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${theme.badgeBg}`}>
                  </span>
                    {theme.badgeText}
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
                    aria-label="Fechar"
                  >
                    <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                      <path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="relative z-10 mt-3">
                <p className="text-3xl font-bold text-zinc-900 tabular-nums leading-none">
                  {currentValue.toLocaleString('pt-BR')}
                  {unit && (
                    <span className="text-base font-medium text-zinc-500 ml-1">
                      {unit}
                    </span>
                  )}
                </p>
                <p className="text-xs text-zinc-400 mt-1"> Criado {values.created_at}</p>
              </div>

              {/* stats rows */}
              <div className="grid grid-cols-3 divide-x divide-zinc-100 border-b border-zinc-100">
                {[
                  { label: "Min", value: `${min.toLocaleString('pt-br')}${unit}` },
                  { label: "Media", value: `${avg.toFixed(1)}${unit}`},
                  { label: "Max", value: `${max.toLocaleString('pt-br')}${unit}` },
                ].map((s) => (
                  <div key={s.label} className="px-4 py-3 text-center">
                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest mb-0.5">{s.label}</p>
                    <p className="text-sm font-semibold text-zinc-800 font-mono tabular-nums">{s.value}</p>
                  </div>
                ))}
              </div>

              {/* infos rows */}
              <div>
                {[
                  { label: "Localização" , value: values.id},
                  { label: "Firware", value: values.device_id},
                  { label: "Name", value: values.name}
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">
                      {s.label}
                    </span>
                    <span className="text-xs font-medium text-zinc-700 font-mono">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* footer */}
          <div className="px-5 pb-5 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}