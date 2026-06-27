'use client';

interface DateProps {
    values?: any[];
}

function OpenView(values: string) {
    return (
        <div>
            <h2>Detalhes</h2>
            <button>Fechar</button>
        </div>
    );
}
export default function MonitoramentoPIR({values = []}: DateProps = {}){
    return (
        <div className="w-full max-w-4xl border border-slate-800 rounded-xl bg-slate-900/50 backdrop-blur-sm overflow-hidden shadow-md">
            <table className="w-full border-collapse text-left text-sm text-slate-300">
                <thead className="bg-slate-800/60 text-slate-100 font-medium uppercase tracking-wider text-xs border-b border-slate-800">
                    <tr>
                        <th className="px-6 py-3.5 font-semibold">titulo</th>
                        <th className="px-6 py-3.5 font-semibold">Mensagem</th>
                        <th className="px-6 py-3.5 font-semibold">Estado</th>
                        <th className="px-6 py-3.5 font-semibold">view</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-900/20">
                    {
                        values.map((value, index) => (
                            <tr key={index} className="hover:bg-slate-800/40 transition-colors duration-150 group">
                                <td className="px-6 py-4 font-medium text-white">{value.device_id ? "PIR" : "Operacional"}</td>
                                <td className="px-6 py-4 text-slate-400">{value.estado ? "Ativo" : "Desativado"}</td>
                                <td className="px-6 py-4">
                            <span
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
                                {value.estado ? "Ativo" : "Desativado"}
                            </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => OpenView(value)}
                                        className="inline-flex items-center justify-center rounded-lg text-xs font-medium bg-slate-800 hover:bg-indigo-600 active:bg-indigo-700 text-white px-3 py-1.5 shadow-sm transition-all cursor-pointer border border-slate-700/50 hover:border-indigo-500">Ver
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
