'use client';

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { User, Mail, Lock, LogOut, Save, Shield, Calendar } from "lucide-react";

export default function Profile() {
    const { data: session } = useSession();
    const [name, setName] = useState(session?.user?.name || '');
    const [email, setEmail] = useState(session?.user?.email || '');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        try {
            await new Promise((r) => setTimeout(r, 1000));
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 space-y-6 animate-fade-in max-w-4xl mx-auto">
            {/* Header */}
            <div className="space-y-1">
                <h1 className="text-title">Meu Perfil</h1>
                <p className="text-caption">
                    Gerencie suas informações pessoais e configurações de conta
                </p>
            </div>

            {/* Success */}
            {success && (
                <div className="flex items-center gap-2 p-3 rounded-md bg-success/10 border border-success/20 text-success text-xs animate-slide-down">
                    <Shield className="w-4 h-4 flex-shrink-0" />
                    <span>Alterações salvas com sucesso!</span>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Left — Avatar */}
                <div className="lg:col-span-1">
                    <div className="fluent-card p-5 flex flex-col items-center gap-4 text-center">
                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-primary-foreground font-semibold text-2xl">
                                {session?.user?.email?.charAt(0).toUpperCase() || 'U'}
                            </span>
                        </div>
                        <div>
                            <h2 className="text-subtitle">{name || 'Usuário'}</h2>
                            <p className="text-caption mt-0.5">{email}</p>
                        </div>
                        <div className="w-full px-3 py-1.5 rounded-md bg-success/10 border border-success/20">
                            <p className="text-xs font-semibold text-success flex items-center justify-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-soft" />
                                {email ? 'Conta Ativa' : 'Conta Desativada'}
                            </p>
                        </div>
                        <div className="w-full pt-3 border-t border-border">
                            <p className="text-caption flex items-center justify-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                Membro desde 2024
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right — Forms */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Personal Info */}
                    <div className="fluent-card p-5 space-y-4">
                        <div className="flex items-center gap-2 pb-3 border-b border-border">
                            <User className="w-4 h-4 text-primary" />
                            <h3 className="text-subtitle">Informações Pessoais</h3>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-foreground">Nome Completo</label>
                            <input
                                type="text"
                                placeholder="Digite seu nome"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-2.5 rounded-md border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:shadow-[0_0_0_1px_var(--color-primary)] transition-all"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-foreground">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <input
                                    type="email"
                                    placeholder="seu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-2.5 pl-10 rounded-md border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:shadow-[0_0_0_1px_var(--color-primary)] transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-border">
                            <button
                                type="button"
                                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1.5"
                            >
                                <Lock className="w-3.5 h-3.5" />
                                Resetar Senha
                            </button>
                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={loading}
                                className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary hover:bg-primary-hover text-primary-foreground text-xs font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none"
                            >
                                <Save className="w-3.5 h-3.5" />
                                {loading ? 'Salvando...' : 'Salvar'}
                            </button>
                        </div>
                    </div>

                    {/* Security */}
                    <div className="fluent-card p-5 space-y-4">
                        <div className="flex items-center gap-2 pb-3 border-b border-border">
                            <Shield className="w-4 h-4 text-primary" />
                            <h3 className="text-subtitle">Segurança</h3>
                        </div>

                        <div className="space-y-2.5">
                            {[
                                { title: 'Autenticação em Dois Fatores', desc: 'Adicione segurança extra à sua conta', action: 'Ativar' },
                                { title: 'Sessões Ativas', desc: 'Gerencie dispositivos conectados', action: 'Gerenciar' },
                            ].map((item) => (
                                <div
                                    key={item.title}
                                    className="flex items-center justify-between p-3 rounded-md bg-muted/50 border border-border"
                                >
                                    <div>
                                        <p className="text-sm font-medium text-foreground">{item.title}</p>
                                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                                    </div>
                                    <button className="px-3 py-1.5 text-xs font-semibold rounded-md bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                                        {item.action}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Logout */}
            <div className="fluent-card p-5 flex items-center justify-between">
                <div>
                    <h3 className="text-subtitle">Sair da Conta</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        Você será desconectado de todos os dispositivos
                    </p>
                </div>
                <button
                    onClick={() => signOut({ redirect: true, callbackUrl: '/account/login' })}
                    className="flex items-center gap-2 px-4 py-2 rounded-md bg-error/10 text-error border border-error/20 text-xs font-semibold hover:bg-error hover:text-error-foreground transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </div>
        </div>
    );
}
