'use client';

interface DateProps {
    values?: any[];
}

export default function MonitoramentoPIR({ values = [] }: DateProps = {}) {
    return (
        <div className="w-full overflow-hidden rounded-lg border border-border bg-card">
            <table className="w-full border-collapse text-left text-sm">
                <thead>
                    <tr className="bg-muted/50 border-b border-border">
                        <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Título
                        </th>
                        <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Mensagem
                        </th>
                        <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Estado
                        </th>
                        <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">
                            Ação
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {values.map((value, index) => (
                        <tr
                            key={index}
                            className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                        >
                            <td className="px-5 py-3.5 font-medium text-foreground">
                                {value.device_id ? "PIR" : "Operacional"}
                            </td>
                            <td className="px-5 py-3.5 text-muted-foreground">
                                {value.estado ? "Ativo" : "Desativado"}
                            </td>
                            <td className="px-5 py-3.5">
                                <span
                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                                        value.estado
                                            ? 'bg-success/10 text-success'
                                            : 'bg-muted text-muted-foreground'
                                    }`}
                                >
                                    <span
                                        className={`w-1.5 h-1.5 rounded-full ${
                                            value.estado
                                                ? 'bg-success animate-pulse-soft'
                                                : 'bg-muted-foreground'
                                        }`}
                                    />
                                    {value.estado ? "Ativo" : "Desativado"}
                                </span>
                            </td>
                            <td className="px-5 py-3.5 text-right">
                                <button className="px-3 py-1.5 rounded-md text-xs font-semibold bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                                    Ver
                                </button>
                            </td>
                        </tr>
                    ))}
                    {values.length === 0 && (
                        <tr>
                            <td
                                colSpan={4}
                                className="px-5 py-8 text-center text-xs text-muted-foreground"
                            >
                                Nenhum dado de monitoramento disponível.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
