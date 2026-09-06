'use client';

import getValues from "@/hooks/useTextValues";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface NotificationsProps {
    notificationsOpen: boolean;
    setNotificationsOpen: (open: boolean) => void;
}

export default function Notifications({
    notificationsOpen,
    setNotificationsOpen,
}: NotificationsProps) {
    const [alerta, setAlerta] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!notificationsOpen) return;
        async function carregaNotificacoes() {
            setLoading(true);
            try {
                const data: any[] = await getValues();
                const data_pir = data.filter(
                    (item) => item.device_id === "ESP32_PIR_01"
                );
                setAlerta(data_pir);
            } catch (err) {
                console.error("Erro ao carregar notificações:", err);
            } finally {
                setLoading(false);
            }
        }
        carregaNotificacoes();
    }, [notificationsOpen]);

    if (!notificationsOpen) return null;

    return (
        <div className="fixed top-14 right-4 w-80 max-h-[420px] z-50 bg-card rounded-lg border border-border shadow-elevation4 flex flex-col animate-slide-down">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-warning animate-pulse-soft" />
                    Central de Alertas
                </h2>
                <button
                    onClick={() => setNotificationsOpen(false)}
                    className="w-6 h-6 flex items-center justify-center rounded-md hover-subtle text-muted-foreground hover:text-foreground transition-colors"
                >
                    <X size={14} />
                </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {loading ? (
                    <p className="text-xs text-muted-foreground text-center py-8">
                        Carregando...
                    </p>
                ) : alerta.length === 0 ? (
                    <p className="text-xs text-muted-foreground text-center py-8">
                        Nenhum alerta recente.
                    </p>
                ) : (
                    alerta.map((value, index) => (
                        <div
                            key={index}
                            className="p-3 rounded-md bg-muted/50 border border-border text-xs"
                        >
                            <div className="flex justify-between items-start mb-1">
                                <p className="text-warning font-semibold flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-warning" />
                                    Movimento Detectado
                                </p>
                                <span className="text-[10px] text-muted-foreground">
                                    {value.sensor || "PIR"}
                                </span>
                            </div>
                            <p className="text-muted-foreground">
                                Dispositivo{' '}
                                <span className="text-primary font-mono">
                                    {value.device_id}
                                </span>{' '}
                                registrou atividade na área monitorada.
                            </p>
                        </div>
                    ))
                )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-border" />
        </div>
    );
}
