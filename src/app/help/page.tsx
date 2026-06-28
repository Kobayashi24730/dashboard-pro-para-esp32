'use client';

import { useState } from 'react';
import {
    ChevronDown,
    Search,
    AlertCircle,
    Lightbulb,
    Zap,
    BookOpen,
    MessageCircle,
} from 'lucide-react';

interface FAQItem {
    id: number;
    question: string;
    answer: string;
    category: string;
}

const faqData: FAQItem[] = [
    {
        id: 1,
        category: 'Geral',
        question: 'O que é o Dashboard Pro ESP32?',
        answer:
            'O Dashboard Pro ESP32 é uma plataforma moderna e intuitiva para monitorar e controlar dispositivos ESP32. Oferece visualização em tempo real de dados, gráficos interativos e controle remoto de componentes conectados.',
    },
    {
        id: 2,
        category: 'Geral',
        question: 'Como faço para começar?',
        answer:
            'Para começar, crie uma conta, conecte seu dispositivo ESP32 à rede e configure as credenciais no dashboard. Após isso, você poderá visualizar e controlar seus dispositivos em tempo real.',
    },
    {
        id: 3,
        category: 'Técnico',
        question: 'Qual é a velocidade de atualização dos dados?',
        answer:
            'Os dados são atualizados em tempo real com latência mínima. A frequência de atualização pode ser configurada entre 1 segundo e 1 minuto, dependendo da sua preferência e capacidade de rede.',
    },
    {
        id: 4,
        category: 'Técnico',
        question: 'Como conectar múltiplos dispositivos ESP32?',
        answer:
            'Você pode adicionar múltiplos dispositivos através do painel de configuração. Cada dispositivo recebe um ID único que permite identificação e controle independente no dashboard.',
    },
    {
        id: 5,
        category: 'Segurança',
        question: 'Meus dados estão seguros?',
        answer:
            'Sim! Utilizamos criptografia end-to-end (TLS/SSL) para todas as comunicações. Seus dados são armazenados em servidores seguros com backup automático e conformidade com padrões de segurança internacionais.',
    },
    {
        id: 6,
        category: 'Segurança',
        question: 'Como faço para resetar minha senha?',
        answer:
            'Clique em "Esqueci minha senha" na página de login. Você receberá um email com um link de recuperação. Clique no link e siga as instruções para criar uma nova senha.',
    },
    {
        id: 7,
        category: 'Suporte',
        question: 'Como entro em contato com o suporte?',
        answer:
            'Você pode entrar em contato conosco através do email support@dashboardpro.com ou usar o chat ao vivo disponível no dashboard durante o horário comercial (seg-sex, 9h-18h).',
    },
    {
        id: 8,
        category: 'Suporte',
        question: 'Existe documentação técnica disponível?',
        answer:
            'Sim! Temos documentação completa, tutoriais em vídeo e exemplos de código disponíveis em nossa base de conhecimento. Acesse docs.dashboardpro.com para mais informações.',
    },
];

const categories = ['Todos', 'Geral', 'Técnico', 'Segurança', 'Suporte'];

const quickLinks = [
    { icon: Lightbulb, label: 'Dicas & Truques', desc: 'Técnicas avançadas para maximizar seu uso' },
    { icon: Zap, label: 'Guia Rápido', desc: 'Comece em minutos com nosso guia passo a passo' },
    { icon: BookOpen, label: 'Documentação', desc: 'Acesse a documentação técnica completa' },
    { icon: MessageCircle, label: 'Suporte', desc: 'Entre em contato com nossa equipe' },
];

export default function HelpPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const filteredFAQ = faqData.filter((item) => {
        const matchesSearch =
            item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === 'Todos' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const toggleExpand = (id: number) =>
        setExpandedId(expandedId === id ? null : id);

    return (
        <div className="p-6 space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-title mb-1">Central de Ajuda</h1>
                <p className="text-caption">
                    Encontre respostas e aprenda como usar o Dashboard Pro ESP32
                </p>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {quickLinks.map((link) => (
                    <div key={link.label} className="fluent-card p-4 cursor-pointer hover-subtle">
                        <link.icon className="w-5 h-5 text-primary mb-2" />
                        <h3 className="text-sm font-semibold text-foreground mb-1">
                            {link.label}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            {link.desc}
                        </p>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Buscar por pergunta ou palavra-chave..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-md bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:shadow-[0_0_0_1px_var(--color-primary)] transition-all"
                />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                            selectedCategory === cat
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-card border border-border text-foreground hover:bg-muted'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* FAQ Items */}
            <div className="space-y-2">
                {filteredFAQ.length > 0 ? (
                    filteredFAQ.map((item) => (
                        <div
                            key={item.id}
                            className="fluent-card overflow-hidden"
                        >
                            <button
                                onClick={() => toggleExpand(item.id)}
                                className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors text-left"
                            >
                                <div className="flex-1">
                                    <h3 className="text-sm font-semibold text-foreground">
                                        {item.question}
                                    </h3>
                                    <span className="text-xs text-muted-foreground mt-0.5 inline-block">
                                        {item.category}
                                    </span>
                                </div>
                                <ChevronDown
                                    className={`w-4 h-4 text-muted-foreground transition-transform duration-200 flex-shrink-0 ml-4 ${
                                        expandedId === item.id ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {expandedId === item.id && (
                                <div className="px-4 pb-3 border-t border-border pt-2">
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {item.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 fluent-card">
                        <AlertCircle className="w-10 h-10 text-muted-foreground/50 mx-auto mb-2" />
                        <p className="text-sm font-medium text-foreground">
                            Nenhum resultado para &ldquo;{searchTerm}&rdquo;
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Tente ajustar seus filtros ou termos de busca
                        </p>
                    </div>
                )}
            </div>

            {/* Contact */}
            <div className="fluent-card p-5">
                <h2 className="text-subtitle mb-2">
                    Não encontrou o que procurava?
                </h2>
                <p className="text-caption mb-4">
                    Nossa equipe de suporte está pronta para ajudar.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <a
                        href="mailto:support@dashboardpro.com"
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary-hover transition-colors"
                    >
                        <MessageCircle className="w-4 h-4" />
                        Email
                    </a>
                    <a
                        href="#"
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-card border border-border text-foreground text-xs font-semibold hover:bg-muted transition-colors"
                    >
                        <Zap className="w-4 h-4" />
                        Chat ao Vivo
                    </a>
                    <a
                        href="#"
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-card border border-border text-foreground text-xs font-semibold hover:bg-muted transition-colors"
                    >
                        <BookOpen className="w-4 h-4" />
                        Documentação
                    </a>
                </div>
            </div>
        </div>
    );
}
