import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/backend/components/AuthProvider";
import DashboardShell from "@/backend/components/DashboardShell";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Meu App Inteligente",
    description: "Monitoramento de dispositivos em tempo real",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
        <body className="h-screen w-screen bg-slate-950 text-white overflow-hidden antialiased">
        <AuthProvider>
            {/* O Shell consome os dados de sessão e gerencia os menus */}
            <DashboardShell>{children}</DashboardShell>
        </AuthProvider>
        </body>
        </html>
    );
}