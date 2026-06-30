# Dashboard Pro ESP32

Plataforma web para monitoramento em tempo real de sensores conectados a microcontroladores ESP32. Desenvolvido como projeto da **NEX Academy**.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Visao Geral

O Dashboard Pro ESP32 fornece uma interface web moderna para visualizar, rastrear e gerenciar dados de sensores de multiplos dispositivos ESP32 implantados em campo. A interface segue o **Microsoft Fluent Design System** com tema claro, tipografia Segoe UI e sombras elevadas.

### Sensores Monitorados

| Sensor | Device ID | Descricao |
|--------|-----------|-----------|
| Temperatura | `ESP32_TEMP_01` | Temperatura em graus Celsius (DHT11) |
| Umidade | `ESP32_HUMID_01` | Umidade relativa em % (DHT11) |
| Som | `ESP32_SOUND_01` | Nivel de ruido ambiente |
| PIR (Movimento) | `ESP32_PIR_01` | Deteccao de movimento/intrusao |
| Ultrassonico | `ESP32_ULTRA_01` | Medicao de distancia |
| WiFi | `ESP32_WiFi_01` | Forca do sinal WiFi (dBm) |
| Uptime | `ESP32_UPTIME_01` | Tempo de atividade do dispositivo |
| Memoria | `ESP32_memori_01` | Memoria livre no dispositivo |
| Tempo de Resposta | `ESP32_TepResposta_01` | Latencia da API |

---

## Tech Stack

| Camada | Tecnologia |
|--------|------------|
| Framework | Next.js 16 (App Router) |
| Linguagem | TypeScript 5 |
| UI | React 19 |
| Estilizacao | Tailwind CSS v4 + Microsoft Fluent Design System |
| Componentes | shadcn/ui v4 (Radix UI) |
| Graficos | Recharts 3 (Area charts) |
| Autenticacao | NextAuth v4 (credentials, JWT, bcrypt) |
| Banco de dados | SQLite via `better-sqlite3` |
| Icones | Lucide React |
| Toast | Sonner |
| Fontes | Segoe UI Variable / Geist |
| Deploy | Render (`dashboard-pro-para-esp32.onrender.com`) |

---

## Estrutura do Projeto

```
dashboard-pro-para-esp32/
├── src/
│   ├── app/                          # Paginas e rotas (Next.js App Router)
│   │   ├── page.tsx                  # Landing page
│   │   ├── layout.tsx                # Layout root
│   │   ├── globals.css               # Design system (Tailwind v4 + Fluent)
│   │   ├── dashboard/
│   │   │   └── page.tsx              # Dashboard principal
│   │   ├── account/
│   │   │   ├── login/page.tsx        # Login / Registro
│   │   │   ├── profile/page.tsx      # Perfil do usuario
│   │   │   └── settings/page.tsx     # Configuracoes
│   │   ├── help/
│   │   │   └── page.tsx              # Central de ajuda / FAQ
│   │   └── api/
│   │       ├── auth/[...nextauth]/   # NextAuth (sessao/JWT)
│   │       ├── data/movimento/       # API de sensores (GET/POST)
│   │       └── register/             # Registro de usuarios
│   ├── backend/
│   │   ├── components/
│   │   │   ├── DashboardShell.tsx    # Shell (header + sidebar)
│   │   │   ├── Headers.tsx           # Sidebar
│   │   │   ├── Card.tsx              # Card de sensor com grafico
│   │   │   ├── MonitoramnetoPIR.tsx  # Tabela de eventos PIR
│   │   │   ├── notifications.tsx     # Painel de notificacoes
│   │   │   ├── AuthProvider.tsx      # SessionProvider (NextAuth)
│   │   │   └── ui/                   # Componentes shadcn
│   │   └── data/
│   │       ├── useTextValues.ts      # Hook de busca de dados
│   │       └── dados.json            # Dados de fallback
│   └── lib/
│       └── utils.ts                  # Utility cn()
├── tailwind.config.ts
└── package.json
```

---

## Rotas da Aplicacao

| Rota | Descricao |
|------|-----------|
| `/` | Landing page com CTAs para Dashboard e Login |
| `/dashboard` | Dashboard principal com KPIs, graficos e tabela PIR |
| `/account/login` | Formulario de login/registro |
| `/account/profile` | Gerenciamento de perfil do usuario |
| `/account/settings` | Configuracoes (Geral, Seguranca, Notificacoes) |
| `/help` | Central de ajuda com FAQ pesquisavel |

---

## Endpoints da API

| Metodo | Endpoint | Descricao |
|--------|----------|-----------|
| `GET` | `/api/data/movimento` | Retorna ultimas 50 leituras de sensores |
| `POST` | `/api/data/movimento` | Insere nova leitura `{ device_id, sensor, estado, valor }` |
| `POST` | `/api/register` | Registra usuario `{ email, password }` |
| `GET/POST` | `/api/auth/[...nextauth]` | Sessao NextAuth |

### Esquema do Banco de Dados

```sql
CREATE TABLE sensor_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    device_id TEXT NOT NULL,
    sensor TEXT NOT NULL,
    estado INTEGER NOT NULL,
    valor REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## Como Executar

### Pre-requisitos

- Node.js 18+
- npm, yarn ou pnpm

### Instalacao

```bash
# Clone o repositorio
git clone https://github.com/Kobayashi24730/dashboard-pro-para-esp32.git
cd dashboard-pro-para-esp32/src

# Instale as dependencias
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### Build para Producao

```bash
npm run build
npm start
```

### Scripts Disponiveis

| Script | Comando |
|--------|---------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de producao |
| `npm start` | Servidor de producao |
| `npm run lint` | ESLint |

---

## Design System

O projeto utiliza **Microsoft Fluent Design System** como base visual:

- **Cores primarias**: Azul Microsoft `#0078d4`, Branco `#ffffff`, Cinza `#fafafa`
- **Status**: Sucesso `#107c10`, Alerta `#ffb900`, Erro `#d13438`
- **Tipografia**: Segoe UI Variable, pesos 400/600
- **Sombras**: 3 niveis de elevacao (elevation1, elevation2, elevation4)
- **Componentes**: Cards com bordas sutis, hover com reveal effect, inputs com focus ring
- **Todos os tokens** definidos via `@theme inline` no `globals.css` (Tailwind v4)

---

## Arquitetura

```
┌─────────────────────┐
│  Dispositivos ESP32  │ ── HTTP POST ──┐
└─────────────────────┘                  │
                                         v
                              ┌──────────────────────┐
                              │  API Remota (Render)  │
                              │  /api/data/movimento  │
                              │  SQLite + better-sqlite3│
                              └──────────┬───────────┘
                                         │ fetch (via rewrite)
                                         v
                              ┌──────────────────────┐
                              │  Next.js Frontend    │
                              │  DashboardShell      │
                              │  ├─ Sidebar          │
                              │  ├─ Header           │
                              │  └─ Pages            │
                              └──────────────────────┘
```

---

## Deploy

O projeto esta configurado para deploy na **Render**:

- **Frontend/API**: `https://dashboard-pro-para-esp32.onrender.com`
- O `next.config.ts` faz rewrite de `/api/data/movimento` para o servidor de producao

---

## Variaveis de Ambiente

```env
NEXTAUTH_SECRET=seu-secret-aqui
NEXTAUTH_URL=http://localhost:3000
```

---

## Autor

**Kobayashi24730** — [GitHub](https://github.com/Kobayashi24730)

Projeto desenvolvido como parte da **NEX Academy**.

---

## Licenca

MIT
