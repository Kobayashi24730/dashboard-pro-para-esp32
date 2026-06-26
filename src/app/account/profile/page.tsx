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
            // Simular salvamento
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8 lg:p-10">
            <div className="max-w-4xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="space-y-3 slide-in-down">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        Meu Perfil
                    </h1>
                    <p className="text-slate-400 text-lg">Gerencie suas informações pessoais e configurações de conta</p>
                    <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-down duration-300">
                        <Shield className="w-5 h-5 flex-shrink-0" />
                        <span>Alterações salvas com sucesso!</span>
                    </div>
                )}

                {/* Profile Card */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Left - Avatar Section */}
                    <div className="lg:col-span-1">
                        <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 backdrop-blur-xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 p-6 hover:shadow-glow-lg transition-all duration-300 group">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            <div className="relative z-10 flex flex-col items-center gap-4">
                                {/* Avatar */}
                                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-glow-md transition-all">
                                    <span className="text-white font-bold text-4xl">
                                        {session?.user?.email?.charAt(0).toUpperCase() || 'U'}
                                    </span>
                                </div>

                                {/* User Info */}
                                <div className="text-center">
                                    <h2 className="text-xl font-bold text-white">{name || 'Usuário'}</h2>
                                    <p className="text-sm text-slate-400 mt-1">{email}</p>
                                </div>

                                {/* Status Badge */}
                                <div className="w-full px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                                    <p className="text-xs font-semibold text-green-400 flex items-center justify-center gap-2">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft"></span>
                                        Conta Ativa
                                    </p>
                                </div>

                                {/* Member Since */}
                                <div className="w-full pt-4 border-t border-slate-700/50">
                                    <p className="text-xs text-slate-400 flex items-center justify-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        Membro desde 2024
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right - Edit Section */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Personal Information Card */}
                        <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 backdrop-blur-xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 p-6 hover:shadow-glow-lg transition-all duration-300 group">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            <div className="relative z-10 space-y-6">
                                
                                {/* Section Title */}
                                <div className="flex items-center gap-3 pb-4 border-b border-slate-700/50">
                                    <User className="w-5 h-5 text-indigo-400" />
                                    <h3 className="text-lg font-bold text-white">Informações Pessoais</h3>
                                </div>

                                {/* Name Input */}
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Nome Completo</label>
                                    <input
                                        type="text"
                                        placeholder="Digite seu nome"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full p-3 bg-slate-950/50 rounded-xl border border-slate-700/50 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all hover:border-slate-600/50"
                                    />
                                </div>

                                {/* Email Input */}
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Email</label>
                                    <div className="relative group/input">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within/input:text-indigo-400 transition-colors" />
                                        <input
                                            type="email"
                                            placeholder="seu@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full p-3 pl-10 bg-slate-950/50 rounded-xl border border-slate-700/50 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all hover:border-slate-600/50"
                                        />
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                                    <button 
                                        type="button" 
                                        className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-2"
                                    >
                                        <Lock className="w-4 h-4" />
                                        Resetar Senha
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSave}
                                        disabled={loading}
                                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
                                    >
                                        <Save className="w-4 h-4" />
                                        {loading ? 'Salvando...' : 'Salvar Alterações'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Security Card */}
                        <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 backdrop-blur-xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 p-6 hover:shadow-glow-lg transition-all duration-300 group">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            <div className="relative z-10 space-y-4">
                                
                                {/* Section Title */}
                                <div className="flex items-center gap-3 pb-4 border-b border-slate-700/50">
                                    <Shield className="w-5 h-5 text-purple-400" />
                                    <h3 className="text-lg font-bold text-white">Segurança</h3>
                                </div>

                                {/* Security Info */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg border border-slate-700/50">
                                        <div>
                                            <p className="text-sm font-medium text-white">Autenticação em Dois Fatores</p>
                                            <p className="text-xs text-slate-400">Adicione segurança extra à sua conta</p>
                                        </div>
                                        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors">
                                            Ativar
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg border border-slate-700/50">
                                        <div>
                                            <p className="text-sm font-medium text-white">Sessões Ativas</p>
                                            <p className="text-xs text-slate-400">Gerencie seus dispositivos conectados</p>
                                        </div>
                                        <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold rounded-lg transition-colors">
                                            Gerenciar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Logout Section */}
                <div className="relative overflow-hidden rounded-2xl border border-red-500/20 backdrop-blur-xl bg-gradient-to-br from-red-950/20 to-red-900/10 p-6 hover:shadow-glow-lg transition-all duration-300 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-white">Sair da Conta</h3>
                            <p className="text-sm text-slate-400 mt-1">Você será desconectado de todos os dispositivos</p>
                        </div>
                        <button
                            onClick={() => signOut({ redirect: true, callbackUrl: '/account/login' })}
                            className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition-all active:scale-[0.98] flex items-center gap-2 shadow-lg shadow-red-600/20"
                        >
                            <LogOut className="w-5 h-5" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
