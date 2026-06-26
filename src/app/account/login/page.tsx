'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Mail, Lock, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function Auth() {
    const [auth, setAuth] = useState<'login' | 'register'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (auth === 'login') {
                const result = await signIn('credentials', {
                    redirect: false,
                    email,
                    password,
                });

                if (result?.error) {
                    setError("Credenciais inválidas. Verifique seu e-mail e senha.");
                } else {
                    router.refresh();
                    router.push('/dashboard');
                }
            } else {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Erro ao registrar usuário.');
                }

                await signIn('credentials', {
                    redirect: false,
                    email,
                    password,
                });

                router.refresh();
                router.push('/dashboard');
            }
        } catch (err: any) {
            setError(err.message || "Ocorreu um erro inesperado.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 text-slate-100 relative overflow-hidden">
            
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse-soft"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse-soft"></div>

            {/* Main Card */}
            <div className="w-full max-w-md relative z-10">
                
                {/* Card Container */}
                <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/60 backdrop-blur-xl border border-slate-700/50 shadow-2xl p-8 rounded-2xl space-y-6 hover:shadow-glow-lg transition-all duration-300">
                    
                    {/* Header */}
                    <div className="space-y-2 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-xl">📊</span>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            {auth === 'login' ? 'Bem-vindo' : 'Criar Conta'}
                        </h1>
                        <p className="text-sm text-slate-400">
                            {auth === 'login' 
                                ? 'Acesse sua conta para continuar' 
                                : 'Preencha os dados para começar'}
                        </p>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-4 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-down duration-300">
                            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        
                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                <input
                                    type="email"
                                    placeholder="seu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-xl border border-slate-700/50 bg-slate-950/50 pl-10 pr-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-600/50"
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Senha</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-xl border border-slate-700/50 bg-slate-950/50 pl-10 pr-12 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-600/50"
                                    required
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-400 transition-colors"
                                    disabled={loading}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Terms Checkbox (Register only) */}
                        {auth === 'register' && (
                            <div className="flex items-start gap-3 pt-2">
                                <input
                                    type="checkbox"
                                    id="checkbox"
                                    required
                                    className="w-4 h-4 mt-1 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500/20 focus:ring-offset-slate-900 cursor-pointer"
                                />
                                <label htmlFor="checkbox" className="text-xs text-slate-400 select-none cursor-pointer hover:text-slate-300 transition-colors">
                                    Concordo com os <span className="text-indigo-400 hover:text-indigo-300">termos de uso</span> e <span className="text-indigo-400 hover:text-indigo-300">política de privacidade</span>
                                </label>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 p-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none group"
                        >
                            <span className="flex items-center justify-center gap-2">
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Processando...
                                    </>
                                ) : (
                                    auth === 'login' ? 'Entrar' : 'Cadastrar'
                                )}
                            </span>
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-700/50"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-2 bg-gradient-to-br from-slate-900/80 to-slate-800/60 text-slate-400">ou</span>
                        </div>
                    </div>

                    {/* Toggle Auth Mode */}
                    <div className="text-center space-y-3">
                        <p className="text-sm text-slate-400">
                            {auth === 'login' ? 'Não tem uma conta?' : 'Já possui uma conta?'}
                        </p>
                        <button
                            type="button"
                            className="w-full px-4 py-3 rounded-xl border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 text-slate-300 hover:text-white font-medium transition-all"
                            onClick={() => {
                                setAuth(auth === 'login' ? 'register' : 'login');
                                setError(null);
                                setShowPassword(false);
                            }}
                        >
                            {auth === 'login' ? 'Criar conta' : 'Fazer login'}
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-slate-500 mt-6">
                    Dashboard Pro ESP32 • Seguro e Confiável
                </p>
            </div>
        </section>
    );
}
