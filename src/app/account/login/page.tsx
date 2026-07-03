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
                const response = await fetch('/api/user/settings', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });
                const data = await response.json();
                if (!response.ok) throw new Error(data.message || 'Erro ao registrar usuário.');

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
        <section className="flex items-center justify-center min-h-screen bg-background">
            <div className="w-full max-w-sm mx-4">
                <div className="fluent-card p-6 space-y-5">
                    {/* Header */}
                    <div className="space-y-2 text-center">
                        <div className="flex justify-center">
                            <div className="w-10 h-10 rounded bg-primary flex items-center justify-center">
                                <svg className="w-5 h-5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M7 16l4-6 4 4 4-8" />
                                </svg>
                            </div>
                        </div>
                        <h1 className="text-title text-center">
                            {auth === 'login' ? 'Bem-vindo' : 'Criar Conta'}
                        </h1>
                        <p className="text-caption text-center">
                            {auth === 'login'
                                ? 'Acesse sua conta para continuar'
                                : 'Preencha os dados para começar'}
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="flex items-start gap-2 p-3 rounded-md bg-error/10 border border-error/20 text-error text-xs animate-slide-down">
                            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-foreground">
                                Email
                            </label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <input
                                    type="email"
                                    placeholder="seu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-md border border-border bg-card pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:shadow-[0_0_0_1px_var(--color-primary)] transition-all"
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-foreground">
                                Senha
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-md border border-border bg-card pl-10 pr-11 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:shadow-[0_0_0_1px_var(--color-primary)] transition-all"
                                    required
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    disabled={loading}
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Terms (register) */}
                        {auth === 'register' && (
                            <div className="flex items-start gap-2 pt-1">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    required
                                    className="w-4 h-4 mt-0.5 rounded border-border bg-card text-primary focus:ring-primary cursor-pointer"
                                />
                                <label
                                    htmlFor="terms"
                                    className="text-xs text-muted-foreground select-none cursor-pointer hover:text-foreground transition-colors"
                                >
                                    Concordo com os{' '}
                                    <span className="text-primary hover:underline">termos de uso</span>
                                    {' '}e{' '}
                                    <span className="text-primary hover:underline">política de privacidade</span>
                                </label>
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-3 rounded-md bg-primary hover:bg-primary-hover py-2 text-sm font-semibold text-primary-foreground transition-colors disabled:opacity-50 disabled:pointer-events-none"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                    Processando...
                                </span>
                            ) : (
                                auth === 'login' ? 'Entrar' : 'Cadastrar'
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-3 text-xs text-muted-foreground bg-card">ou</span>
                        </div>
                    </div>

                    {/* Toggle */}
                    <button
                        type="button"
                        onClick={() => {
                            setAuth(auth === 'login' ? 'register' : 'login');
                            setError(null);
                            setShowPassword(false);
                        }}
                        className="w-full px-4 py-2 rounded-md border border-border bg-card hover:bg-muted text-foreground text-sm font-semibold transition-colors"
                    >
                        {auth === 'login' ? 'Criar conta' : 'Fazer login'}
                    </button>
                </div>

                <p className="text-caption text-center mt-4">
                    Dashboard Pro ESP32 &middot; Seguro e Confiável
                </p>
            </div>
        </section>
    );
}
