'use client';
import { useState } from "react";
import Link from "next/link";

interface HeadersProps {
    title: string;
    url: string;
    subItems?: { title: string; url: string }[];
}

const OptionsHeaders: HeadersProps[] = [
    { title: "Dashboard", url: "/dashboard" },
    { title: "Account", url: "/account",
        subItems: [
            { title: "Profile", url: "/account/profile" },
            { title: "Settings", url: "/account/settings" }
        ]
    },
    { title: "Help", url: "/help" },
];

interface SidebarProps {
    openMenu: boolean;
    setOpenMenu: (open: boolean) => void;
}

export default function Sidebar({openMenu, setOpenMenu}: SidebarProps) {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    function toggleSubMenu(title: string) {
        setActiveMenu(activeMenu === title ? null : title);
    }

    return (
        <aside className={`bg-gradient-to-b from-slate-900 via-gray-900 to-slate-950 text-white h-screen flex flex-col justify-between p-6 fixed left-0 top-0 border-r border-slate-700/50 shadow-2xl z-50 transition-all duration-300 ease-in-out $ openMenu ? "w-64" : "w-20 items-center"}`}>
            <button onClick={() => setOpenMenu(!openMenu)} className={`w-10 h-10 mb-4 bg-slate-800 hover:bg-slate-700 border border-slate-700/50 rounded-xl flex items-center justify-center shadow-lg transition-all duration-200 text-lg active:scale-95 ${!openMenu ? "mt-2" : "self-end"}`}
                    title={openMenu ? "Fechar Menu" : "Abrir Menu"}> {openMenu ? "◀" : "☰"}
            </button>
            {openMenu ? (
                <div className="flex-1 flex flex-col justify-between w-full animate-in fade-in duration-300">

                    <div className="flex flex-col gap-6">
                        {/* Header do App */}
                        <div className="flex items-center gap-3 border-b border-slate-700/50 pb-6 hover:border-indigo-500/30 transition-colors duration-200">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-lg">📊</span>
                            </div>
                            <div className="flex flex-col">
                                <Link className="text-xl font-bold tracking-wider text-white" href="/dashboard">Dashboard</Link>
                                <p className="text-xs text-slate-400">Pro ESP32</p>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="flex flex-col gap-2">
                            {OptionsHeaders.map((header) => {
                                const hasSubItems = header.subItems && header.subItems.length > 0;
                                const isOpen = activeMenu === header.title;

                                return (
                                    <div key={header.url} className="w-full">
                                        <button
                                            onClick={() => hasSubItems ? toggleSubMenu(header.title) : console.log(`Navegar para: ${header.url}`)}
                                            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex justify-between items-center font-medium group relative overflow-hidden ${
                                                isOpen
                                                    ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                                                    : "bg-slate-800/50 hover:bg-slate-700/70 text-slate-100 hover:text-white"
                                            }`}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/0 to-indigo-600/0 group-hover:from-indigo-600/10 group-hover:to-indigo-600/5 transition-all duration-300" />

                                            <Link className="relative z-10 flex items-center gap-2" href={header.url}>
                                                <span className="w-1 h-1 rounded-full bg-current opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                                    {header.title}
                                            </Link>

                                            {hasSubItems && (
                                                <span className={`text-xs transition-transform duration-300 relative z-10 ${isOpen ? "rotate-180" : ""}`}>
                                                ▼
                                            </span>
                                            )}
                                        </button>

                                        {/* Submenu */}
                                        {hasSubItems && isOpen && (
                                            <div className="bg-slate-800/30 mt-2 ml-4 border-l-2 border-indigo-500/50 flex flex-col gap-1 pl-4 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                                {header.subItems?.map((sub) => (
                                                    <button
                                                        key={sub.url}
                                                        className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:text-indigo-300 hover:bg-slate-700/50 rounded transition-all duration-200 font-medium group relative"
                                                    >
                                                        <Link className="relative z-10 flex items-center gap-2" href={sub.url}>
                                                            <span className="w-1 h-1 rounded-full bg-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                                            {sub.title}
                                                        </Link>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Footer Section */}
                    <div className="flex flex-col gap-4 border-t border-slate-700/50 pt-6">
                        <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors duration-200">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-xs text-slate-400">Sistema Online</span>
                        </div>
                        <div className="text-xs text-slate-500 text-center font-medium">
                            v1.0.0
                        </div>
                    </div>

                </div>
            ) : (
                /* MINI FOOTER / ÍCONE QUANDO FECHADO */
                <div className="flex flex-col items-center gap-4 border-t border-slate-700/50 pt-6 w-full animate-in fade-in duration-300">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" title="Sistema Online" />
                </div>
            )}
        </aside>
    );
}
