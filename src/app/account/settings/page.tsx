'use client';
import { useState } from "react";
import { Settings, Bell, Lock, HelpCircle, Save, AlertCircle } from "lucide-react";

interface dataType {
    id: number;
    name: string;
    inputs: Record<string, string>;
    description: string;
    icon: string;
}

const data = [
    {
        id: 1,
        name: "Geral",
        description: "Configurações gerais da sua conta",
        icon: "⚙️",
        inputs: {
            'name': 'name',
            'email': 'email',
            'language': 'language'
        }
    },
    {
        id: 2,
        name: "Segurança",
        description: "Gerencie a segurança da sua conta",
        icon: "🔒",
        inputs: {
            'password': 'password',
            'confirm_password': 'confirm_password'
        }
    },
    {
        id: 3,
        name: "Notificações",
        description: "Controle suas preferências de notificações",
        icon: "🔔",
        inputs: {
            'email_notifications': 'email_notifications',
            'push_notifications': 'push_notifications'
        }
    }
];

const category = ['geral', 'seguranca', 'notificacoes', 'ajuda'];

export default function Settings() {
    const [selectCategory, setSelectCategory] = useState('geral');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const search = data.filter((item) => {
        const mathItem = item.name.toLowerCase().includes(selectCategory.toLowerCase()) ||
            item.description.toLowerCase().includes(selectCategory.toLowerCase());
        return mathItem;
    });

    const handleSave = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8 lg:p-10">
            <div className="max-w-6xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="space-y-3 slide-in-down">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        Configurações
                    </h1>
                    <p className="text-slate-400 text-lg">Personalize sua experiência no Dashboard</p>
                    <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-down duration-300">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span>Configurações salvas com sucesso!</span>
                    </div>
                )}

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-3">
                    {category.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectCategory(cat)}
                            className={`px-4 md:px-6 py-2.5 md:py-3 rounded-lg capitalize font-medium transition-all duration-200 flex items-center gap-2 ${
                                selectCategory === cat 
                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-500/50' 
                                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/70 border border-slate-700/50 hover:border-indigo-500/30'
                            }`}
                        >
                            {cat === 'geral' && <Settings className="w-4 h-4" />}
                            {cat === 'seguranca' && <Lock className="w-4 h-4" />}
                            {cat === 'notificacoes' && <Bell className="w-4 h-4" />}
                            {cat === 'ajuda' && <HelpCircle className="w-4 h-4" />}
                            <span className="hidden sm:inline">{cat}</span>
                        </button>
                    ))}
                </div>

                {/* Settings Content */}
                <div className="space-y-6">
                    {search.length > 0 ? (
                        search.map((item, index) => (
                            <div 
                                key={item.id || index} 
                                className="group relative overflow-hidden rounded-2xl border border-slate-700/50 backdrop-blur-xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 p-6 md:p-8 hover:shadow-glow-lg transition-all duration-300 animate-in fade-in slide-in-up"
                            >
                                {/* Animated background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                <div className="relative z-10 space-y-6">
                                    
                                    {/* Header */}
                                    <div className="flex items-start gap-4 pb-6 border-b border-slate-700/50">
                                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                                            {item.icon || item.name[0]}
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-xl md:text-2xl font-bold text-white">{item.name}</h2>
                                            <p className="text-sm text-slate-400 mt-1">{item.description}</p>
                                        </div>
                                    </div>

                                    {/* Form Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {Object.keys(item.inputs).map((key) => (
                                            <div key={key} className="space-y-2">
                                                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                                                    {key.replace(/_/g, ' ')}
                                                </label>
                                                {key.includes('notification') ? (
                                                    <div className="flex items-center gap-3 p-3 bg-slate-950/50 rounded-lg border border-slate-700/50 hover:border-slate-600/50 transition-colors">
                                                        <input
                                                            type="checkbox"
                                                            id={`${item.id}-${key}`}
                                                            className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500/20 focus:ring-offset-slate-900 cursor-pointer"
                                                        />
                                                        <label 
                                                            htmlFor={`${item.id}-${key}`}
                                                            className="text-sm text-slate-300 cursor-pointer flex-1"
                                                        >
                                                            Ativar {key.replace(/_/g, ' ')}
                                                        </label>
                                                    </div>
                                                ) : (
                                                    <input
                                                        type={key === 'password' || key === 'confirm_password' ? 'password' : key === 'email' ? 'email' : 'text'}
                                                        placeholder={`Digite seu ${key.replace(/_/g, ' ')}`}
                                                        className="w-full p-3 bg-slate-950/50 rounded-lg border border-slate-700/50 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all hover:border-slate-600/50"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center justify-between pt-6 border-t border-slate-700/50">
                                        {item.name === 'Segurança' && (
                                            <button 
                                                type="button" 
                                                className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                                            >
                                                Resetar Senha
                                            </button>
                                        )}
                                        {item.name !== 'Segurança' && <div />}
                                        
                                        <button 
                                            type="button"
                                            onClick={handleSave}
                                            disabled={loading}
                                            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
                                        >
                                            <Save className="w-4 h-4" />
                                            {loading ? 'Salvando...' : 'Salvar Alterações'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-16 bg-slate-900/50 border border-dashed border-slate-700 rounded-2xl group hover:border-slate-600 transition-colors">
                            <AlertCircle className="w-12 h-12 text-slate-500 mx-auto mb-4 group-hover:text-slate-400 transition-colors" />
                            <p className="text-slate-400 text-lg font-medium">Nenhuma configuração encontrada</p>
                            <p className="text-slate-500 text-sm mt-2">Tente selecionar outra categoria</p>
                        </div>
                    )}
                </div>

                {/* Info Box */}
                <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 backdrop-blur-xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 p-6 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10 flex items-start gap-4">
                        <HelpCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-semibold text-white mb-2">Precisa de Ajuda?</h3>
                            <p className="text-sm text-slate-400">
                                Visite nossa <span className="text-indigo-400 hover:text-indigo-300 cursor-pointer">página de ajuda</span> ou entre em contato com nosso suporte para dúvidas sobre as configurações.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
