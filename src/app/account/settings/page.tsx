'use client';
import {useState} from "react";

interface dataType {
    id: number;
    name: string;
    inputs: Record<string, string>;
    description: string;
    icon: string;
}
const data = [
    {
        id: 1,
        name: "Geral",
        description: "Configurações gerais",
        icon: "",
        inputs: {
            'name': 'name',
            'email': 'email',
            'password': 'password'
        }
    }
];

const category = [ 'geral', 'seguranca', 'notificacoes', 'ajuda' ];
export default function settings(){
    const [selectCategory, setSelectCategory] = useState('geral');
    const search = data.filter((item) => {
        const mathItem = item.name.toLowerCase().includes(selectCategory.toLowerCase()) ||
            item.description.toLowerCase().includes(selectCategory.toLowerCase());
        return mathItem;
    });

    return (
        <section className="min-h-screen bg-slate-950 p-6 text-slate-100 flex flex-col gap-6">
            <div className="flex flex-wrap gap-2">
                {category.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectCategory(cat)}
                        className={`px-4 py-2 rounded-xl capitalize font-medium transition-colors ${
                            selectCategory === cat ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Container dos Resultados do Filtro */}
            <div className="w-full max-w-2xl space-y-4">
                {search.map((item, index) => ( // Corrigido de 'serch' para 'search'
                    <div key={item.id || index} className="bg-slate-900 border border-slate-800/80 p-6 rounded-2xl space-y-6 shadow-xl">
                        <div className="flex items-center gap-4 bg-slate-950/40 border border-slate-800 p-3 rounded-xl">
                            {item.icon ? (
                                <img src={item.icon} alt={item.name} className="w-10 h-10 object-contain"/>
                            ) : (
                                <div className="w-10 h-10 bg-indigo-600/20 rounded-lg flex items-center justify-center text-indigo-400 font-bold">
                                    {item.name[0]}
                                </div>
                            )}
                            <div>
                                <h2 className="text-lg font-semibold text-white">{item.name}</h2>
                                <p className="text-slate-400 text-sm">{item.description}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {Object.keys(item.inputs).map((key) => (
                                <div key={key} className="space-y-1">
                                    <label className="text-xs text-slate-400 capitalize px-1">{key}</label>
                                    <input
                                        type={key === 'password' ? 'password' : 'text'}
                                        placeholder={`Digite seu ${key}`}
                                        className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-800/60 pt-4">
                            {item.inputs.password ? (
                                <button type="button" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 hover:underline transition-all">
                                    Resetar password
                                </button>
                            ) : (
                                <div />
                            )}
                            <button type="button" className="bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/10 transition-all">
                                Salvar Alterações
                            </button>
                        </div>
                    </div>
                ))}

                {search.length === 0 && (
                    <div className="text-center py-12 bg-slate-900/50 border border-dashed border-slate-800 rounded-2xl">
                        <p className="text-slate-500 text-sm">Nenhuma configuração encontrada para esta categoria.</p>
                    </div>
                )}
            </div>
        </section>
    );
}