'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Menu,
    X,
    Home,
    BarChart3,
    Settings,
    HelpCircle,
    LogOut,
} from "lucide-react";

interface SidebarProps {
    openMenu: boolean;
    setOpenMenu: (open: boolean) => void;
}

const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: BarChart3, label: "Dashboard", href: "/dashboard" },
    { icon: Settings, label: "Configurações", href: "/account/settings" },
    { icon: HelpCircle, label: "Ajuda", href: "/help" },
];

export default function Sidebar({ openMenu, setOpenMenu }: SidebarProps) {
    const pathname = usePathname();

    return (
        <>
            <aside
                className={`fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col z-50 transition-all duration-300 ease-in-out ${
                    openMenu ? "w-64" : "w-16"
                }`}
            >
                {/* Brand */}
                <div className="flex items-center justify-between h-12 px-4 border-b border-sidebar-border">
                    {openMenu && (
                        <span className="text-sm font-semibold text-sidebar-foreground">
                            NEX Academy
                        </span>
                    )}
                    <button
                        onClick={() => setOpenMenu(!openMenu)}
                        className="p-1.5 rounded-md hover-subtle text-sidebar-foreground transition-all"
                    >
                        {openMenu ? <X size={16} /> : <Menu size={16} />}
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto py-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-2 mx-2 rounded-md text-sm transition-all relative group ${
                                    isActive
                                        ? "bg-primary text-primary-foreground font-semibold"
                                        : "text-sidebar-foreground hover:bg-sidebar-accent"
                                } ${openMenu ? "" : "justify-center"}`}
                            >
                                <Icon size={16} className="flex-shrink-0" />
                                {openMenu && <span>{item.label}</span>}
                                {!openMenu && (
                                    <div className="absolute left-full ml-2 px-2 py-1 rounded bg-popover border border-border text-foreground text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-elevation1">
                                        {item.label}
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="border-t border-sidebar-border py-2">
                    <button
                        className={`w-full flex items-center gap-3 px-4 py-2 mx-2 rounded-md text-sm text-sidebar-foreground hover:bg-error/10 hover:text-error transition-all ${
                            openMenu ? "" : "justify-center"
                        }`}
                    >
                        <LogOut size={16} className="flex-shrink-0" />
                        {openMenu && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Mobile overlay */}
            {openMenu && (
                <div
                    className="fixed inset-0 bg-black/20 z-40 md:hidden"
                    onClick={() => setOpenMenu(false)}
                />
            )}
        </>
    );
}
