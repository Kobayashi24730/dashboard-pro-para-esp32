'use client';
import { useState } from "react";

export default function Auth() {
    const [auth, setAuth] = useState<'login' | 'register'>('login');

    return (
        <section className="min-h-screen w-full flex items-center justify-center bg-slate-950 p-4 text-slate-100">
            <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-md border border-slate-800/80 shadow-2xl p-6 rounded-2xl flex flex-col gap-6">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight text-white">{auth === 'login' ? 'Acesse sua conta' : 'Crie sua conta'}</h1>
                    <p className="text-sm text-slate-400">{auth === 'login' ? 'Bem-vindo de volta! Insira seus dados.' : 'Preencha os campos para começar.'}</p>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-3">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full rounded-xl border border-slate-800 bg-slate-950/50 p-3 text-sm text-slate-200 placeholder-slate-500 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            className="w-full rounded-xl border border-slate-800 bg-slate-950/50 p-3 text-sm text-slate-200 placeholder-slate-500 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                            required
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
                            <label htmlFor="checkbox" className="text-xs text-slate-400 select-none cursor-pointer hover:text-slate-300">
                                Concordo com os termos de uso
                            </label>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full mt-2 rounded-xl bg-indigo-600 p-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500 active:scale-[0.98]"
                    >
                        {auth === 'login' ? 'Entrar' : 'Cadastrar'}
                    </button>
                </form>

                <div className="text-center text-sm text-slate-400 border-t border-slate-800/60 pt-4">
                    <span>{auth === 'login' ? 'Não tem uma conta? ' : 'Já possui uma conta? '}</span>
                    <button
                        type="button"
                        className="font-medium text-indigo-400 hover:text-indigo-300 hover:underline transition-all"
                        onClick={() => setAuth(auth === 'login' ? 'register' : 'login')}
                    >
                        {auth === 'login' ? 'Criar conta' : 'Fazer login'}
                    </button>
                </div>
            </div>
        </section>
    );
}