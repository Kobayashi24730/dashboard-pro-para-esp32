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
    title: "Dashboard Pro ESP32",
    description: "Monitoramento de dispositivos ESP32 em tempo real",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="pt-BR"
            className={`${geistSans.variable} ${geistMono.variable}`}
        >
            <body className="h-screen w-screen bg-background text-foreground overflow-hidden antialiased">
                <AuthProvider>
                    <DashboardShell>{children}</DashboardShell>
                </AuthProvider>
            </body>
        </html>
    );
}
