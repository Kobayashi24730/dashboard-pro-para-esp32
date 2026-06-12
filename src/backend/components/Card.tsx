'use client';
import { AreaChart, Area, XAxis, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

const data = [
    { name: "jan", value: 300 },
    { name: "fev", value: 500 },
    { name: "mar", valor: 550 },
    { name: "abr", valor: 620 },
    { name: "mai", valor: 580 },
    { name: "jun", valor: 640 },
    { name: "jul", valor: 680 },
    { name: "ago", valor: 730 },
    { name: "set", valor: 790 },
    { name: "out", valor: 850 },
    { name: "nov", valor: 950 },
    { name: "dez", valor: 900 },
];
export default function Card(color: any){
    return (
        <div className="relative w-full max-w-sm rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-900 text-white shadow-xl flex flex-col justify-between pt-6">
            <div className="px-6 flex justify-between items-start mb-2 z-10">
                <div>
                    <p className="text-sm font-medium text-blue-100 opacity-90">Receita Operational</p>
                    <h2 className="text-3xl font-extrabold tracking-tight mt-1">R$ 1.000,00</h2>
                    <div className="mt-4">
                        <p className="text-xs text-blue-200 opacity-80">Melhor resultado: R$ 1.000,00</p>
                        <p className="text-lg font-bold text-white mt-0.5">20%</p>
                    </div>
                </div>

                <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                    <TrendingUp className="text-white" />
                </div>
            </div>
            <div className="w-full h-36 mt-4 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                        <defs>
                            <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#ffffff" stopOpacity={0.0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#ffffff", fontSize: 12, opacity: "0.8" }} dy={10} />
                        <Area type="monotone" dataKey="valor" stroke="#ffffff" strokeWidth={2.5} fillOpacity={1} fill="url(#colorValor)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}