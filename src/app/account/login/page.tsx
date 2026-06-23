'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Auth() {
    const [auth, setAuth] = useState<'login' | 'register'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        <section className="min-h-screen w-full flex items-center justify-center bg-slate-950 p-4 text-slate-100">
            <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-md border border-slate-800/80 shadow-2xl p-6 rounded-2xl flex flex-col gap-6">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight text-white">{auth === 'login' ? 'Acesse sua conta' : 'Crie sua conta'}</h1>
                    <p className="text-sm text-slate-400">{auth === 'login' ? 'Bem-vindo de volta! Insira seus dados.' : 'Preencha os campos para começar.'}</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-xl">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-3">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border border-slate-800 bg-slate-950/50 p-3 text-sm text-slate-200 placeholder-slate-500 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                            required
                            disabled={loading}
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-xl border border-slate-800 bg-slate-950/50 p-3 text-sm text-slate-200 placeholder-slate-500 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                            required
                            disabled={loading}
                        />
                    </div>

                    {auth === 'register' && (
                        <div className="flex items-center gap-2 px-1 py-1">
                            <input
                                type="checkbox"
                                id="checkbox"
                                required
                                className="h-4 w-4 rounded border-slate-800 bg-slate-950 text-indigo-600 focus:ring-indigo-500/20 focus:ring-offset-slate-900"
                            />
                            <label htmlFor="checkbox" className="text-xs text-slate-400 select-none cursor-pointer hover:text-slate-300">Concordo com os termos de uso</label>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 rounded-xl bg-indigo-600 p-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
                    >
                        {loading ? 'Processando...' : auth === 'login' ? 'Entrar' : 'Cadastrar'}
                    </button>
                </form>

                <div className="text-center text-sm text-slate-400 border-t border-slate-800/60 pt-4">
                    <span>{auth === 'login' ? 'Não tem uma conta? ' : 'Já possui uma conta? '}</span>
                    <button
                        type="button"
                        className="font-medium text-indigo-400 hover:text-indigo-300 hover:underline transition-all"
                        onClick={() => {
                            setAuth(auth === 'login' ? 'register' : 'login');
                            setError(null);
                        }}
                    >
                        {auth === 'login' ? 'Criar conta' : 'Fazer login'}
                    </button>
                </div>
            </div>
        </section>
    );
}