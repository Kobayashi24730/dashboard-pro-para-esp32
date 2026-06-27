'use client';

import { useState, useEffect } from "react";
import Sidebar from "@/backend/components/Headers";
import Notifications from "@/backend/components/notifications";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Bell, Search, User, Settings } from "lucide-react";
import getValues from "@/backend/data/useTextValues";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
    const [openMenu, setOpenMenu] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);
    const [notificCount, setNotificCount] = useState(0);
    const { data: session, status } = useSession();

    useEffect(() => {
        const fetchNotific = async () => {
            try {
                const arrayData = await getValues();
                const notific = arrayData.filter((item: any) => item.device_id === "ESP32_PIR_01");
                setNotificCount(notific.length);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };
        fetchNotific();
    }, []);

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar openMenu={openMenu} setOpenMenu={setOpenMenu} />

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col h-screen transition-all duration-300 ease-in-out ${openMenu ? "ml-64" : "ml-20"}`}>
                
                {/* Header */}
                <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
                    <div className="grid grid-cols-12 gap-4 px-6 md:px-8 py-4 md:py-5">
                        
                        {/* Left Section - Title */}
                        <div className="col-span-6 flex items-center gap-4">
                            <div className="hidden sm:flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                                    <span className="text-white font-bold text-lg">📊</span>
                                </div>
                                <div>
                                    <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                                        Dashboard
                                    </h1>
                                    <p className="text-xs text-gray-500">NEX Academy</p>
                                </div>
                            </div>
                            <div className="sm:hidden">
                                <h1 className="text-lg font-bold text-gray-900">Dashboard</h1>
                            </div>
                        </div>

                        {/* Center Section - Search */}
                        <div className="col-span-3 hidden md:flex items-center">
                            <div className="relative w-full group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                                />
                            </div>
                        </div>

                        {/* Right Section - Actions */}
                        <div className="col-span-6 md:col-span-3 flex items-center justify-end gap-3 md:gap-4">
                            
                            {/* Notifications Button */}
                            <button 
                                onClick={() => setNotificationsOpen(true)} 
                                className="relative group flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-all duration-200 cursor-pointer"
                                title="Notifications"
                            >
                                <Bell className="w-5 h-5 text-gray-600 group-hover:text-blue-500 transition-colors" />
                                <span className="hidden md:inline font-medium text-gray-700 text-sm">Notifications</span>
                                {notificCount > 0 && (
                                    <span className="absolute -top-1 -right-1 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-sm">
                                        {notificCount}
                                    </span>
                                )}
                            </button>

                            {/* Settings Button */}
                            <Link 
                                href="/account/settings"
                                className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-all duration-200"
                                title="Settings"
                            >
                                <Settings className="w-5 h-5 text-gray-600 hover:text-blue-500 transition-colors" />
                                <span className="hidden md:inline font-medium text-gray-700 text-sm">Settings</span>
                            </Link>

                            {/* User Profile Section */}
                            <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-all duration-200 cursor-pointer group">
                                
                                {/* Avatar */}
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                                    <span className="text-white font-bold text-sm">
                                        {session?.user?.email ? session.user.email.charAt(0).toUpperCase() : "U"}
                                    </span>
                                </div>

                                {/* User Info */}
                                <div className="hidden md:flex flex-col text-left min-w-0">
                                    {status === "loading" && (
                                        <span className="text-xs font-medium text-gray-500 animate-pulse">Loading...</span>
                                    )}
                                    {status === "unauthenticated" && (
                                        <Link href="/account/login" className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
                                            Sign In
                                        </Link>
                                    )}
                                    {status === "authenticated" && session && (
                                        <>
                                            <span className="text-xs text-gray-500">Signed in as:</span>
                                            <Link href="/account/profile" className="text-sm font-medium text-gray-900 hover:text-blue-600 truncate transition-colors">
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
                <main className="flex-1 overflow-y-auto bg-gray-50">
                    <Notifications notificationsOpen={notificationsOpen} setNotificationsOpen={setNotificationsOpen} />
                    {children}
                </main>
            </div>
        </div>
    );
}
