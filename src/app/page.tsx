import Link from "next/link";
import { Activity, Shield, Zap, BarChart3 } from "lucide-react";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background px-6 animate-fade-in">
            <div className="max-w-2xl w-full text-center space-y-8">
                {/* Logo */}
                <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-lg bg-primary flex items-center justify-center shadow-elevation2">
                        <Activity className="w-8 h-8 text-primary-foreground" />
                    </div>
                </div>

                {/* Heading */}
                <div className="space-y-3">
                    <h1 className="text-display">
                        Dashboard Pro ESP32
                    </h1>
                    <p className="text-body text-muted-foreground max-w-md mx-auto">
                        Monitoramento inteligente de sensores IoT em tempo real.
                        Visualize dados, detecte eventos e controle seus dispositivos.
                    </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                    {[
                        { icon: Zap, label: "Tempo real", desc: "Dados instantâneos" },
                        { icon: BarChart3, label: "Gráficos", desc: "Visualização clara" },
                        { icon: Shield, label: "Seguro", desc: "Auth com JWT" },
                        { icon: Activity, label: "9 sensores", desc: "Monitoramento completo" },
                    ].map((f) => (
                        <div key={f.label} className="fluent-card p-4 flex flex-col items-center gap-2">
                            <f.icon className="w-5 h-5 text-primary" />
                            <span className="text-sm font-semibold text-foreground">{f.label}</span>
                            <span className="text-xs text-muted-foreground">{f.desc}</span>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <Link
                        href="/dashboard"
                        className="w-full sm:w-auto px-6 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors shadow-elevation1"
                    >
                        Ir para o Dashboard
                    </Link>
                    <Link
                        href="/account/login"
                        className="w-full sm:w-auto px-6 py-2 rounded-md bg-card border border-border text-foreground text-sm font-semibold hover:bg-muted transition-colors"
                    >
                        Fazer Login
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <p className="text-caption mt-12">
                Dashboard Pro ESP32 &middot; NEX Academy
            </p>
        </div>
    );
}
