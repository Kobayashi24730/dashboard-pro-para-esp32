'use client';

interface NotificationsProps{
    notificationsOpen: boolean;
    setNotificationsOpen: (open: boolean) => void;
}

export default function Notifications({notificationsOpen, setNotificationsOpen}: NotificationsProps){
    if (!notificationsOpen) return null;
    return (
        <div className="fixed top-24 right-8 w-80 h-96 z-50 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl flex flex-col justify-between animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                <h1 className="text-base font-bold text-white flex items-center gap-2"><span>🔔</span>Central de alertas.</h1>
                <button onClick={() => setNotificationsOpen(false)} title={notificationsOpen ? "Fechar" : "Abrir"} className="text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-lg w-7 h-7 flex items-center justify-center transition-all text-xs font-bold">
                    X
                </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/50 text-xs">
                    <p className="text-red-400 font-semibold mb-1">⚠️ Movimento Detectado</p>
                    <p className="text-slate-400">O sensor ESP32_PIR_01 disparou na área principal.</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/50 text-xs">
                    <p className="text-green-400 font-semibold mb-1">✅ Dispositivo Conectado</p>
                    <p className="text-slate-400">ESP32 Pro estabeleceu conexão estável</p>
                </div>
            </div>
            <div className="border-t border-slate-800 pt-3 mt-2 flex justify-end">
                <button className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                    Limpar tudo
                </button>
            </div>
        </div>
    )
}