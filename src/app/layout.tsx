'use client';
import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/backend/components/Headers";
import Notifications from "@/backend/components/notifications";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [openMenu, setOpenMenu] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState<true | false>(false);
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-screen w-screen bg-slate-950 text-white overflow-hidden antialiased">
        <div className="flex h-full">
          {/* Sidebar */}
          <Sidebar openMenu={openMenu} setOpenMenu={setOpenMenu}/>
          
          {/* Main Content Area */}
          <div className={`flex-1 flex flex-col h-full transition-all duration-300 ease-in-out ${openMenu ? "ml-54" : "ml-20"}`}>
            {/* Header Grid */}
            <header className="grid grid-cols-12 gap-4 p-8 border-b border-gray-800 bg-gradient-to-r from-slate-900 to-slate-800 sticky top-0 z-40 shadow-lg">
              <div className="col-span-8 flex items-center">
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
              </div>
              <div className="col-span-4 flex items-center justify-end gap-4">
                {/* Cart Badge */}
                <div onClick={() => setNotificationsOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer">
                  <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1h7.586a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM5 16a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="font-semibold text-white">Notificações</span>
                  <span className="ml-2 px-2 py-1 bg-indigo-500 text-white text-xs font-bold rounded-full">0</span>
                </div>
                {/* User Profile */}
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer">
                  <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">U</span>
                  </div>
                  <span className="text-sm font-medium text-white">Usuário</span>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
              <Notifications notificationsOpen={notificationsOpen} setNotificationsOpen={setNotificationsOpen} />
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
