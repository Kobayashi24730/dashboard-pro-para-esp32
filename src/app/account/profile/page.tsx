export default function profile() {
    return(
        <section>
            <div>
                <h2></h2>
                <div>
                    <div className="space-y-3">
                        <div className="space-y-1">
                            <label className="text-xs text-slate-400 capitalize px-1">Nome</label>
                            <input
                                type="password"
                                placeholder="Digite seu nome"
                                className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-800/60 pt-4">
                            <button type="button" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 hover:underline transition-all">
                                Resetar password
                            </button>
                        <button type="button" className="bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/10 transition-all">
                            Salvar Alterações
                        </button>
                    </div>
                </div>
                <div className="">
                    <button>Logout</button>
                </div>
            </div>
        </section>
    );
}