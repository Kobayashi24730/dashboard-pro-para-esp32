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
            'É uma aplicação web (Next.js 16 + React 19 + TypeScript) que recebe leituras enviadas por dispositivos ESP32 via HTTP POST, armazena em SQLite (Prisma / better-sqlite3) e exibe em tempo quase real através de gráficos Recharts. Foi construído como projeto NEX Academy e está hospedado em dashboard-pro-para-esp32.onrender.com.',
    },
    {
        id: 2,
        category: 'Geral',
        question: 'Quais sensores o dashboard suporta hoje?',
        answer:
            'Nove tipos de leitura, todos vindos do firmware do repositório platformio-wokwi-cpp-esp32: PIR (movimento), DHT22 (temperatura e umidade), HC-SR04 (distância ultrassônica), leitura ADC de som (GPIO 34), estado do LED e três métricas de sistema — RSSI do WiFi, uptime e heap livre. Cada leitura chega identificada por device_id + sensor.',
    },
    {
        id: 3,
        category: 'Geral',
        question: 'Como começo a usar?',
        answer:
            'Crie uma conta em /account/register, faça login e você cai direto no /dashboard. O ESP32 (simulado no Wokwi ou físico) precisa estar programado para fazer POST em https://dashboard-pro-para-esp32.onrender.com/api/data/movimento com o JSON de leitura. Assim que a primeira leitura chega, o cartão do sensor correspondente aparece automaticamente.',
    },
    {
        id: 4,
        category: 'Técnico',
        question: 'Qual é o formato exato do JSON que o ESP32 deve enviar?',
        answer:
            'Um POST application/json em /api/data/movimento com os campos: device_id (ex: "ESP32_PIR_01"), sensor (ex: "PIR", "DHT22", "HUMIDITY", "ULTRASONIC", "SOUND", "WiFi", "UPTIME", "memori"), estado (boolean), value (número) e timestamp (ISO 8601). Retorna 200/201 em caso de sucesso.',
    },
    {
        id: 5,
        category: 'Técnico',
        question: 'Com que frequência os dados são atualizados?',
        answer:
            'A frequência é definida pelo firmware do ESP32, não pelo dashboard. No firmware de referência: métricas de sistema e DHT22 a cada 10 s, ultrassônico a cada 5 s, som a cada 3 s e PIR event-driven (envia apenas quando muda de estado). O front consulta a API e re-renderiza os cartões automaticamente.',
    },
    {
        id: 6,
        category: 'Técnico',
        question: 'Como conecto vários ESP32 ao mesmo dashboard?',
        answer:
            'Basta usar device_ids diferentes no payload (ex: ESP32_PIR_01, ESP32_PIR_02). Cada combinação única de device_id + sensor vira uma série própria no banco e ganha seu próprio cartão/gráfico. Não há limite fixo — o gargalo é o SQLite local.',
    },
    {
        id: 7,
        category: 'Técnico',
        question: 'Como executo o projeto localmente?',
        answer:
            'Dentro de src/: npm install, npx prisma generate, npm run dev. O app sobe em http://localhost:3000 usando o SQLite identifier.sqlite. Para build de produção use npm run build && npm start (o script build já executa prisma generate).',
    },
    {
        id: 8,
        category: 'Segurança',
        question: 'Como funciona a autenticação?',
        answer:
            'Usamos NextAuth v4 com JWT e bcrypt para hash das senhas. Sessões são stateless (cookie assinado), e as rotas privadas do dashboard checam a sessão pelo middleware do Next. Nunca armazenamos senha em texto puro.',
    },
    {
        id: 9,
        category: 'Segurança',
        question: 'A comunicação ESP32 → API é criptografada?',
        answer:
            'Sim, o endpoint público está atrás de HTTPS (TLS) do Render. No firmware de exemplo usamos WiFiClientSecure com setInsecure() apenas para simplificar a simulação no Wokwi; para produção recomenda-se pinar o certificado ou usar o CA raiz apropriado.',
    },
    {
        id: 10,
        category: 'Segurança',
        question: 'Como recupero minha senha?',
        answer:
            'No momento não existe fluxo automático de recuperação. Se você perdeu o acesso, apague o registro do usuário direto no SQLite (tabela User) e cadastre-se novamente, ou abra uma issue no repositório para ajuda manual.',
    },
    {
        id: 11,
        category: 'Suporte',
        question: 'Onde reporto bugs ou sugiro features?',
        answer:
            'Abra uma issue em github.com/Kobayashi24730/dashboard-pro-para-esp32/issues. Se o bug for do firmware do ESP32, use o repositório github.com/Kobayashi24730/platformio-wokwi-cpp-esp32. Pull requests são bem-vindos.',
    },
    {
        id: 12,
        category: 'Suporte',
        question: 'Onde fica a documentação do projeto?',
        answer:
            'O README.md na raiz do repositório é a documentação primária. Comentários no código (src/app/api/data/*) descrevem os endpoints, e o firmware do ESP32 tem seu próprio README no repositório platformio-wokwi-cpp-esp32.',
    },
];

const categories = ['Todos', 'Geral', 'Técnico', 'Segurança', 'Suporte'];

const quickLinks = [
    {
        icon: Lightbulb,
        label: 'Dicas & Truques',
        desc: 'Boas práticas para o firmware do ESP32 e o payload',
    },
    {
        icon: Zap,
        label: 'Guia Rápido',
        desc: 'Suba o dashboard localmente em poucos comandos',
    },
    {
        icon: BookOpen,
        label: 'Documentação',
        desc: 'README, esquema Prisma e código dos endpoints',
    },
    {
        icon: MessageCircle,
        label: 'Suporte',
        desc: 'Abra uma issue no GitHub para bugs e dúvidas',
    },
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
                    Abra uma issue no GitHub — é o canal oficial de suporte do projeto.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <a
                        href="https://github.com/Kobayashi24730/dashboard-pro-para-esp32/issues/new"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary-hover transition-colors"
                    >
                        <MessageCircle className="w-4 h-4" />
                        Abrir Issue
                    </a>
                    <a
                        href="https://github.com/Kobayashi24730/platformio-wokwi-cpp-esp32"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-card border border-border text-foreground text-xs font-semibold hover:bg-muted transition-colors"
                    >
                        <Zap className="w-4 h-4" />
                        Firmware ESP32
                    </a>
                    <a
                        href="https://github.com/Kobayashi24730/dashboard-pro-para-esp32#readme"
                        target="_blank"
                        rel="noopener noreferrer"
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
