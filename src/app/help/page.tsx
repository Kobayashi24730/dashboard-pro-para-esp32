'use client';

import { useState } from 'react';
import { ChevronDown, Search, AlertCircle, Lightbulb, Zap, BookOpen } from 'lucide-react';

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
    answer: 'O Dashboard Pro ESP32 é uma plataforma moderna e intuitiva para monitorar e controlar dispositivos ESP32. Oferece visualização em tempo real de dados, gráficos interativos e controle remoto de componentes conectados.',
  },
  {
    id: 2,
    category: 'Geral',
    question: 'Como faço para começar?',
    answer: 'Para começar, crie uma conta, conecte seu dispositivo ESP32 à rede e configure as credenciais no dashboard. Após isso, você poderá visualizar e controlar seus dispositivos em tempo real.',
  },
  {
    id: 3,
    category: 'Técnico',
    question: 'Qual é a velocidade de atualização dos dados?',
    answer: 'Os dados são atualizados em tempo real com latência mínima. A frequência de atualização pode ser configurada entre 1 segundo e 1 minuto, dependendo da sua preferência e capacidade de rede.',
  },
  {
    id: 4,
    category: 'Técnico',
    question: 'Como conectar múltiplos dispositivos ESP32?',
    answer: 'Você pode adicionar múltiplos dispositivos através do painel de configuração. Cada dispositivo recebe um ID único que permite identificação e controle independente no dashboard.',
  },
  {
    id: 5,
    category: 'Segurança',
    question: 'Meus dados estão seguros?',
    answer: 'Sim! Utilizamos criptografia end-to-end (TLS/SSL) para todas as comunicações. Seus dados são armazenados em servidores seguros com backup automático e conformidade com padrões de segurança internacionais.',
  },
  {
    id: 6,
    category: 'Segurança',
    question: 'Como faço para resetar minha senha?',
    answer: 'Clique em "Esqueci minha senha" na página de login. Você receberá um email com um link de recuperação. Clique no link e siga as instruções para criar uma nova senha.',
  },
  {
    id: 7,
    category: 'Suporte',
    question: 'Como entro em contato com o suporte?',
    answer: 'Você pode entrar em contato conosco através do email support@dashboardpro.com ou usar o chat ao vivo disponível no dashboard durante o horário comercial (seg-sex, 9h-18h).',
  },
  {
    id: 8,
    category: 'Suporte',
    question: 'Existe documentação técnica disponível?',
    answer: 'Sim! Temos documentação completa, tutoriais em vídeo e exemplos de código disponíveis em nossa base de conhecimento. Acesse docs.dashboardpro.com para mais informações.',
  },
];

const categories = ['Todos', 'Geral', 'Técnico', 'Segurança', 'Suporte'];

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredFAQ = faqData.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Central de Ajuda</h1>
        <p className="text-slate-400 text-lg">Encontre respostas para suas dúvidas e aprenda como usar o Dashboard Pro ESP32</p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <Lightbulb className="w-6 h-6 text-blue-200" />
            <h3 className="text-white font-semibold">Dicas & Truques</h3>
          </div>
          <p className="text-blue-100 text-sm">Aprenda técnicas avançadas para maximizar seu uso</p>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-6 h-6 text-purple-200" />
            <h3 className="text-white font-semibold">Guia Rápido</h3>
          </div>
          <p className="text-purple-100 text-sm">Comece em minutos com nosso guia passo a passo</p>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="w-6 h-6 text-indigo-200" />
            <h3 className="text-white font-semibold">Documentação</h3>
          </div>
          <p className="text-indigo-100 text-sm">Acesse a documentação técnica completa</p>
        </div>

        <div className="bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="w-6 h-6 text-cyan-200" />
            <h3 className="text-white font-semibold">Suporte</h3>
          </div>
          <p className="text-cyan-100 text-sm">Entre em contato com nossa equipe</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar por pergunta ou palavra-chave..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-800 text-white pl-12 pr-4 py-3 rounded-lg border border-slate-700 focus:border-indigo-500 focus:outline-none transition-colors"
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === category
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/50'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="space-y-3">
        {filteredFAQ.length > 0 ? (
          filteredFAQ.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors overflow-hidden"
            >
              <button
                onClick={() => toggleExpand(item.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center gap-4 text-left flex-1">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg">{item.question}</h3>
                    <p className="text-slate-400 text-sm mt-1">{item.category}</p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                    expandedId === item.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedId === item.id && (
                <div className="px-6 py-4 bg-slate-700/30 border-t border-slate-700 animate-in fade-in slide-in-from-top-2 duration-200">
                  <p className="text-slate-300 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">Nenhuma pergunta encontrada para "{searchTerm}"</p>
            <p className="text-slate-500 text-sm mt-2">Tente ajustar seus filtros ou termos de busca</p>
          </div>
        )}
      </div>

      {/* Contact Section */}
      <div className="mt-12 bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-8 border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-4">Não encontrou o que procurava?</h2>
        <p className="text-slate-300 mb-6">
          Nossa equipe de suporte está pronta para ajudar. Entre em contato conosco através dos canais abaixo:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="mailto:support@dashboardpro.com"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center"
          >
            📧 Email: support@dashboardpro.com
          </a>
          <a
            href="https://chat.dashboardpro.com"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center"
          >
            💬 Chat ao Vivo
          </a>
          <a
            href="https://docs.dashboardpro.com"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center"
          >
            📚 Documentação
          </a>
        </div>
      </div>
    </div>
  );
}
