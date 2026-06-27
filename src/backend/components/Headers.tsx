'use client';

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Home, BarChart3, Users, Settings, HelpCircle, LogOut } from "lucide-react";

interface SidebarProps {
    openMenu: boolean;
    setOpenMenu: (open: boolean) => void;
}

const menuItems = [
    { icon: Home, label: "Home", href: "/", color: "text-blue-500" },
    { icon: BarChart3, label: "Analytics", href: "/analytics", color: "text-green-500" },
    { icon: Users, label: "Users", href: "/users", color: "text-purple-500" },
    { icon: Settings, label: "Settings", href: "/account/settings", color: "text-orange-500" },
    { icon: HelpCircle, label: "Help", href: "/help", color: "text-blue-400" },
];

export default function Sidebar({ openMenu, setOpenMenu }: SidebarProps) {
    const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

    return (
        <>
            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-50 flex flex-col ${
                    openMenu ? "w-64" : "w-20"
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    {openMenu && (
                        <h2 className="text-lg font-bold text-gray-900">NEX Academy</h2>
                    )}
                    <button
                        onClick={() => setOpenMenu(!openMenu)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                    >
                        {openMenu ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200 group relative"
                            >
                                <Icon size={20} className={`flex-shrink-0 ${item.color}`} />
                                {openMenu && (
                                    <span className="text-sm font-medium text-gray-900 group-hover:text-gray-600">
                                        {item.label}
                                    </span>
                                )}
                                {!openMenu && (
                                    <div className="absolute left-full ml-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                        {item.label}
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="border-t border-gray-200 p-4">
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200">
                        <LogOut size={20} className="flex-shrink-0" />
                        {openMenu && <span className="text-sm font-medium">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Overlay */}
            {openMenu && (
                <div
                    className="fixed inset-0 bg-black/20 z-40 md:hidden"
                    onClick={() => setOpenMenu(false)}
                />
            )}
        </>
    );
}
