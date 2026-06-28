'use client';

import { useState } from "react";
import {
    Settings as SettingsIcon,
    Bell,
    Lock,
    HelpCircle,
    Save,
    AlertCircle,
} from "lucide-react";

const data = [
    {
        id: 1,
        name: "Geral",
        description: "Configurações gerais da sua conta",
        icon: "⚙️",
        inputs: {
            name: 'name',
            email: 'email',
            language: 'language',
        },
    },
    {
        id: 2,
        name: "Segurança",
        description: "Gerencie a segurança da sua conta",
        icon: "🔒",
        inputs: {
            password: 'password',
            confirm_password: 'confirm_password',
        },
    },
    {
        id: 3,
        name: "Notificações",
        description: "Controle suas preferências de notificações",
        icon: "🔔",
        inputs: {
            email_notifications: 'email_notifications',
            push_notifications: 'push_notifications',
        },
    },
];

const categories = ['geral', 'seguranca', 'notificacoes', 'ajuda'];

const catIcons: Record<string, React.ElementType> = {
    geral: SettingsIcon,
    seguranca: Lock,
    notificacoes: Bell,
    ajuda: HelpCircle,
};

export default function Settings() {
    const [selectCategory, setSelectCategory] = useState('geral');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const filtered = data.filter((item) => {
        const n = item.name.toLowerCase();
        const d = item.description.toLowerCase();
        const c = selectCategory.toLowerCase();
        return n.includes(c) || d.includes(c);
    });

    const handleSave = async () => {
        setLoading(true);
        try {
            await new Promise((r) => setTimeout(r, 1000));
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 space-y-6 animate-fade-in max-w-4xl mx-auto">
            {/* Header */}
            <div className="space-y-1">
                <h1 className="text-title">Configurações</h1>
                <p className="text-caption">
                    Personalize sua experiência no Dashboard
                </p>
            </div>

            {/* Success */}
            {success && (
                <div className="flex items-center gap-2 p-3 rounded-md bg-success/10 border border-success/20 text-success text-xs animate-slide-down">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Configurações salvas com sucesso!</span>
                </div>
            )}

            {/* Tabs */}
            <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                    const Icon = catIcons[cat];
                    const active = selectCategory === cat;
                    return (
                        <button
                            key={cat}
                            onClick={() => setSelectCategory(cat)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                                active
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-card border border-border text-foreground hover:bg-muted'
                            }`}
                        >
                            <Icon className="w-3.5 h-3.5" />
                            <span className="capitalize">{cat}</span>
                        </button>
                    );
                })}
            </div>

            {/* Content */}
            <div className="space-y-4">
                {filtered.length > 0 ? (
                    filtered.map((item) => (
                        <div key={item.id} className="fluent-card p-5 space-y-4">
                            {/* Section header */}
                            <div className="flex items-start gap-3 pb-3 border-b border-border">
                                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-lg flex-shrink-0">
                                    {item.icon}
                                </div>
                                <div>
                                    <h2 className="text-subtitle">{item.name}</h2>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            {/* Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.keys(item.inputs).map((key) => (
                                    <div key={key} className="space-y-1.5">
                                        <label className="text-xs font-semibold text-foreground">
                                            {key.replace(/_/g, ' ')}
                                        </label>
                                        {key.includes('notification') ? (
                                            <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50 border border-border">
                                                <input
                                                    type="checkbox"
                                                    id={`${item.id}-${key}`}
                                                    className="w-4 h-4 rounded border-border bg-card text-primary focus:ring-primary cursor-pointer"
                                                />
                                                <label
                                                    htmlFor={`${item.id}-${key}`}
                                                    className="text-sm text-foreground cursor-pointer flex-1"
                                                >
                                                    Ativar {key.replace(/_/g, ' ')}
                                                </label>
                                            </div>
                                        ) : (
                                            <input
                                                type={
                                                    key === 'password' || key === 'confirm_password'
                                                        ? 'password'
                                                        : key === 'email'
                                                          ? 'email'
                                                          : 'text'
                                                }
                                                placeholder={`Digite seu ${key.replace(/_/g, ' ')}`}
                                                className="w-full p-2.5 rounded-md border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:shadow-[0_0_0_1px_var(--color-primary)] transition-all"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between pt-3 border-t border-border">
                                {item.name === 'Segurança' ? (
                                    <button
                                        type="button"
                                        className="text-xs font-semibold text-primary hover:underline"
                                    >
                                        Resetar Senha
                                    </button>
                                ) : (
                                    <div />
                                )}
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary hover:bg-primary-hover text-primary-foreground text-xs font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    <Save className="w-3.5 h-3.5" />
                                    {loading ? 'Salvando...' : 'Salvar'}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 fluent-card">
                        <AlertCircle className="w-10 h-10 text-muted-foreground/50 mx-auto mb-2" />
                        <p className="text-sm font-medium text-foreground">
                            Nenhuma configuração encontrada
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Tente selecionar outra categoria
                        </p>
                    </div>
                )}
            </div>

            {/* Help Box */}
            <div className="fluent-card p-4 flex items-start gap-3">
                <HelpCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">
                        Precisa de Ajuda?
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        Visite nossa{' '}
                        <span className="text-primary cursor-pointer hover:underline">
                            página de ajuda
                        </span>{' '}
                        ou entre em contato com nosso suporte.
                    </p>
                </div>
            </div>
        </div>
    );
}
