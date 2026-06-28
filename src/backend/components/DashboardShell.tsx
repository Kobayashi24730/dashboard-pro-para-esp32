'use client';

import { useState, useEffect } from "react";
import Sidebar from "@/backend/components/Headers";
import Notifications from "@/backend/components/notifications";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Bell, Search, Settings } from "lucide-react";
import getValues from "@/backend/data/useTextValues";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
    const [openMenu, setOpenMenu] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [notificCount, setNotificCount] = useState(0);
    const { data: session, status } = useSession();

    useEffect(() => {
        const fetchNotific = async () => {
            try {
                const arrayData = await getValues();
                const notific = arrayData.filter(
                    (item: any) => item.device_id === "ESP32_PIR_01"
                );
                setNotificCount(notific.length);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };
        fetchNotific();
    }, []);

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            {/* Sidebar */}
            <Sidebar openMenu={openMenu} setOpenMenu={setOpenMenu} />

            {/* Main Content Area */}
            <div
                className={`flex-1 flex flex-col h-screen transition-all duration-300 ease-in-out ${
                    openMenu ? "ml-64" : "ml-16"
                }`}
            >
                {/* ─── Header (Fluent Command Bar) ─── */}
                <header className="sticky top-0 z-40 h-12 bg-card border-b border-border flex items-center px-4">
                    <div className="flex items-center justify-between w-full">
                        {/* Left — Logo & Title */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                                    <svg
                                        className="w-4 h-4 text-primary-foreground"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2.5}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 3v18h18M7 16l4-6 4 4 4-8"
                                        />
                                    </svg>
                                </div>
                                <h1 className="text-sm font-semibold text-foreground">
                                    Dashboard Pro ESP32
                                </h1>
                            </div>
                        </div>

                        {/* Center — Search */}
                        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    className="w-full pl-9 pr-4 py-1.5 text-sm rounded-md bg-muted/50 border border-transparent text-foreground placeholder:text-muted-foreground outline-none focus:bg-card focus:border-primary transition-all"
                                />
                            </div>
                        </div>

                        {/* Right — Actions */}
                        <div className="flex items-center gap-1">
                            {/* Notifications */}
                            <button
                                onClick={() => setNotificationsOpen(true)}
                                className="relative flex items-center gap-2 px-3 py-1.5 rounded-md hover-subtle text-foreground transition-all"
                                title="Notificações"
                            >
                                <Bell className="w-4 h-4" />
                                <span className="hidden lg:inline text-xs font-medium">
                                    Alertas
                                </span>
                                {notificCount > 0 && (
                                    <span className="absolute top-0.5 right-0.5 min-w-[16px] h-4 flex items-center justify-center px-1 bg-error text-primary-foreground text-[10px] font-semibold rounded-full">
                                        {notificCount}
                                    </span>
                                )}
                            </button>

                            {/* Settings */}
                            <Link
                                href="/account/settings"
                                className="hidden sm:flex items-center px-3 py-1.5 rounded-md hover-subtle text-foreground transition-all"
                                title="Configurações"
                            >
                                <Settings className="w-4 h-4" />
                            </Link>

                            {/* Divider */}
                            <div className="w-px h-5 bg-border mx-1" />

                            {/* User */}
                            <Link
                                href="/account/profile"
                                className="flex items-center gap-2 px-2 py-1.5 rounded-md hover-subtle transition-all"
                            >
                                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                    <span className="text-primary-foreground text-xs font-semibold">
                                        {session?.user?.email
                                            ? session.user.email
                                                  .charAt(0)
                                                  .toUpperCase()
                                            : "U"}
                                    </span>
                                </div>
                                <div className="hidden lg:block">
                                    {status === "loading" && (
                                        <span className="text-xs text-muted-foreground">
                                            Carregando...
                                        </span>
                                    )}
                                    {status === "unauthenticated" && (
                                        <span className="text-xs font-medium text-primary">
                                            Entrar
                                        </span>
                                    )}
                                    {status === "authenticated" && session && (
                                        <span className="text-xs font-medium text-foreground">
                                            {session.user?.email}
                                        </span>
                                    )}
                                </div>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* ─── Main Content ─── */}
                <main className="flex-1 overflow-y-auto bg-background">
                    <Notifications
                        notificationsOpen={notificationsOpen}
                        setNotificationsOpen={setNotificationsOpen}
                    />
                    {children}
                </main>
            </div>
        </div>
    );
}
