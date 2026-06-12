'use client';
import { useState } from "react";

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
    { title: "Logout", url: "/logout" },
];

export default function Sidebar() {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    function toggleSubMenu(title: string) {
        setActiveMenu(activeMenu === title ? null : title);
    }

    return (
        <aside className="bg-gray-900 text-white w-64 h-screen flex flex-col justify-between p-4 fixed left-0 top-0">
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2 border-b border-gray-700 pb-4">
                    <h1 className="text-xl font-bold tracking-wider text-indigo-400">Meu App</h1>
                </div>
                <nav className="flex flex-col gap-2">
                    {OptionsHeaders.map((header) => {
                        const hasSubItems = header.subItems && header.subItems.length > 0;
                        const isOpen = activeMenu === header.title;

                        return (
                            <div key={header.url} className="w-full">
                                <button
                                    onClick={() => hasSubItems ? toggleSubMenu(header.title) : console.log(`Navegar para: ${header.url}`)}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex justify-between items-center ${
                                        isOpen ? "bg-gray-700 text-indigo-300" : "bg-gray-800 hover:bg-gray-700"
                                    }`}
                                >
                                    <span>{header.title}</span>
                                    {hasSubItems && (
                                        <span className={`text-xs transition-transform ${isOpen ? "rotate-180" : ""}`}>
                                            ▼
                                        </span>
                                    )}
                                </button>

                                {hasSubItems && isOpen && (
                                    <div className="bg-gray-850 mt-1 ml-4 border-l border-gray-700 flex flex-col gap-1 pl-2 animate-fade-in">
                                        {header.subItems?.map((sub) => (
                                            <button
                                                key={sub.url}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
                                            >
                                                {sub.title}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>
            </div>

            <div className="text-xs text-gray-500 text-center border-t border-gray-800 pt-4">
                v1.0.0
            </div>
        </aside>
    );
}