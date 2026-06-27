'use client';

import { useState, useEffect } from "react";
import Sidebar from "@/backend/components/Headers";
import Notifications from "@/backend/components/notifications";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Bell, LogOut, User, Search } from "lucide-react";
import getValues from "@/backend/data/useTextValues";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
    const [openMenu, setOpenMenu] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);
    const [notificCount, setNotificCount] = useState(0);
    const { data: session, status } = useSession();

    useEffect(() => {
        const fetchNotific = async () => {
            const arrayData = await getValues();
            const notific = arrayData.filter((item: any) => item.device_id === "ESP32_PIR_01");
            setNotificCount(notific.length);
        };
        fetchNotific();
    }, []);

    return (
        <div className="flex h-screen bg-gradient-to-br from-slate-950 via-blue-900 to-slate-950">
            {/* Sidebar */}
            <Sidebar openMenu={openMenu} setOpenMenu={setOpenMenu} />
            
            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col h-screen transition-all duration-300 ease-in-out ${openMenu ? "ml-64" : "ml-20"}`}>
                
                {/* Header */}
                <header className="sticky top-0 z-40 border-b border-blue-500/20 bg-gradient-to-r from-slate-900/95 via-blue-900/95 to-slate-900/95 backdrop-blur-xl shadow-lg">
                    <div className="grid grid-cols-12 gap-4 px-6 md:px-8 py-4 md:py-6">
                        
                        {/* Left Section - Title & Search */}
                        <div className="col-span-6 flex items-center gap-4">
                            <div className="hidden sm:flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                                    <span className="text-white font-bold text-lg">📊</span>
                                </div>
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-white">
                                        Dashboard
                                    </h1>
                                    <p className="text-xs text-slate-400">User</p>
                                </div>
                            </div>
                            <div className="sm:hidden">
                                <h1 className="text-xl font-bold text-white">Dashboard</h1>
                            </div>
                        </div>

                        {/* Center Section - Search */}
                        <div className="col-span-3 hidden md:flex items-center">
                            <div className="relative w-full group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Pesquisar..."
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-blue-500/30 rounded-lg text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                                />
                            </div>
                        </div>

                        {/* Right Section - Actions */}
                        <div className="col-span-6 md:col-span-3 flex items-center justify-end gap-3 md:gap-4">
                            
                            {/* Notifications Button */}
                            <button 
                                onClick={() => setNotificationsOpen(true)} 
                                className="relative group flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 bg-slate-800/50 hover:bg-slate-700/70 border border-blue-500/30 hover:border-cyan-400/50 rounded-lg transition-all duration-200 cursor-pointer"
                                title="Notificações"
                            >
                                <Bell className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                                <span className="hidden md:inline font-semibold text-white text-sm">Notificações</span>
                                <span className="absolute -top-1 -right-1 px-2 py-1 bg-gradient-to-r from-magenta-600 to-pink-600 text-white text-xs font-bold rounded-full shadow-lg">
                                    {notificCount}
                                </span>
                            </button>

                            {/* User Profile Section */}
                            <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 bg-slate-800/50 hover:bg-slate-700/70 border border-blue-500/30 hover:border-cyan-400/50 rounded-lg transition-all duration-200 cursor-pointer group">
                                
                                {/* Avatar */}
                                <div className="w-8 h-8 bg-gradient-to-br from-magenta-500 to-pink-600 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                                    <span className="text-white font-bold text-sm">
                                        {session?.user?.email ? session.user.email.charAt(0).toUpperCase() : "U"}
                                    </span>
                                </div>

                                {/* User Info */}
                                <div className="hidden md:flex flex-col text-left min-w-0">
                                    {status === "loading" && (
                                        <span className="text-xs font-medium text-slate-400 animate-pulse">Carregando...</span>
                                    )}
                                    {status === "unauthenticated" && (
                                        <Link href="/account/login" className="text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
                                            Fazer Login
                                        </Link>
                                    )}
                                    {status === "authenticated" && session && (
                                        <>
                                            <span className="text-xs text-slate-400">Conectado como:</span>
                                            <Link href="/account/profile" className="text-sm font-medium text-cyan-400 hover:text-cyan-300 truncate transition-colors">
                                                {session.user?.email}
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-950 via-blue-900 to-slate-950">
                    <Notifications notificationsOpen={notificationsOpen} setNotificationsOpen={setNotificationsOpen} />
                    {children}
                </main>
            </div>
        </div>
    );
}
