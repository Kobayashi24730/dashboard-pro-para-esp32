'use client';
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

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
        <aside className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white flex flex-col justify-between border-r border-blue-500/20 shadow-2xl z-50 transition-all duration-300 ease-in-out ${
            openMenu ? "w-64" : "w-20"
        }`}>
            
            {/* Toggle Button */}
            <button 
                onClick={() => setOpenMenu(!openMenu)} 
                className={`w-10 h-10 m-6 bg-gradient-to-br from-blue-900 to-slate-900 hover:from-blue-800 hover:to-slate-800 border border-blue-500/30 hover:border-cyan-400/50 rounded-lg flex items-center justify-center shadow-lg transition-all duration-200 text-lg active:scale-95 ${
                    !openMenu ? "mx-auto" : "self-end"
                }`}
                title={openMenu ? "Fechar Menu" : "Abrir Menu"}
            >
                {openMenu ? (
                    <X className="w-5 h-5 text-cyan-400" />
                ) : (
                    <Menu className="w-5 h-5 text-cyan-400" />
                )}
            </button>

            {/* Content - Visible when open */}
            {openMenu && (
                <div className="flex-1 flex flex-col justify-between w-full animate-in fade-in slide-in-down duration-300 overflow-y-auto px-4 pb-4">
                    
                    {/* Top Section */}
                    <div className="flex flex-col gap-6">
                        
                        {/* App Header */}
                        <div className="flex items-center gap-3 border-b border-blue-500/20 pb-6 hover:border-cyan-400/30 transition-colors duration-200 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-200">
                                <span className="text-white font-bold text-lg">📊</span>
                            </div>
                            <div className="flex flex-col">
                                <Link className="text-lg font-bold tracking-wide text-white hover:text-cyan-400 transition-colors" href="/dashboard">
                                    Dashboard
                                </Link>
                                <p className="text-xs text-slate-400">Pro ESP32</p>
                            </div>
                        </div>

                        {/* Navigation Menu */}
                        <nav className="flex flex-col gap-2">
                            {OptionsHeaders.map((header) => {
                                const hasSubItems = header.subItems && header.subItems.length > 0;
                                const isOpen = activeMenu === header.title;

                                return (
                                    <div key={header.url} className="w-full">
                                        
                                        {/* Main Menu Item */}
                                        <button
                                            onClick={() => hasSubItems ? toggleSubMenu(header.title) : null}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex justify-between items-center font-medium group relative overflow-hidden ${
                                isOpen
                                    ? "bg-gradient-to-r from-cyan-600/40 to-blue-600/40 text-cyan-300 shadow-lg shadow-cyan-500/20 border border-cyan-500/50"
                                    : "bg-slate-800/30 hover:bg-slate-700/50 text-slate-200 hover:text-cyan-300 border border-transparent hover:border-cyan-500/30"
                            }`}
                                        >
                                            {/* Animated background */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/0 to-cyan-600/0 group-hover:from-cyan-600/10 group-hover:to-cyan-600/5 transition-all duration-300" />

                                            {/* Link */}
                                            <Link className="relative z-10 flex items-center gap-2 flex-1" href={header.url}>
                                                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                                <span>{header.title}</span>
                                            </Link>

                                            {/* Chevron for submenu */}
                                            {hasSubItems && (
                                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 relative z-10 ${isOpen ? "rotate-180" : ""}`} />
                                            )}
                                        </button>

                                        {/* Submenu */}
                                        {hasSubItems && isOpen && (
                                            <div className="bg-slate-800/20 mt-2 ml-4 border-l-2 border-cyan-500/40 flex flex-col gap-1 pl-4 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                                {header.subItems?.map((sub) => (
                                                    <button
                                                        key={sub.url}
                                                        className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:text-cyan-300 hover:bg-slate-700/40 rounded transition-all duration-200 font-medium group relative"
                                                    >
                                                        <Link className="relative z-10 flex items-center gap-2" href={sub.url}>
                                                            <span className="w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                                            <span>{sub.title}</span>
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

                    {/* Bottom Section - System Status */}
                    <div className="flex flex-col gap-4 border-t border-blue-500/20 pt-6">
                        
                        {/* Status Indicator */}
                        <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-slate-800/40 to-blue-800/30 hover:from-slate-800/60 hover:to-blue-800/50 rounded-lg transition-all duration-200 border border-blue-500/30 hover:border-cyan-400/40 group">
                            <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse-soft shadow-lg shadow-cyan-400/50 group-hover:shadow-cyan-400/70 transition-shadow" />
                            <span className="text-xs text-slate-300 font-medium">Sistema Online</span>
                        </div>

                        {/* Version */}
                        <div className="text-xs text-slate-500 text-center font-medium py-2 px-3 bg-slate-800/20 rounded-lg border border-blue-500/20">
                            v1.0.0
                        </div>
                    </div>
                </div>
            )}

            {/* Collapsed State - Icon Only */}
            {!openMenu && (
                <div className="flex flex-col items-center gap-6 border-t border-blue-500/20 pt-6 pb-6 w-full animate-in fade-in duration-300">
                    
                    {/* Mini Status Indicator */}
                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse-soft shadow-lg shadow-cyan-400/50 hover:shadow-cyan-400/70 transition-shadow" title="Sistema Online" />
                    
                    {/* Mini Version */}
                    <div className="text-xs text-slate-500 font-medium text-center">v1</div>
                </div>
            )}
        </aside>
    );
}
