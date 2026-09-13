# Dashboard Pro ESP32

Plataforma web em **Next.js 16 + React 19 + TypeScript** para monitoramento em tempo quase real de dispositivos **ESP32**. Recebe leituras de sensores via HTTP POST, armazena em **SQLite** (Prisma + `better-sqlite3`) e apresenta os dados em cartões e gráficos interativos (Recharts) sob uma interface inspirada no **Microsoft Fluent Design**.

Projeto desenvolvido no âmbito da **NEX Academy** e implantado em [`dashboard-pro-para-esp32.onrender.com`](https://dashboard-pro-para-esp32.onrender.com).

O firmware que alimenta este dashboard está no repositório complementar [`platformio-wokwi-cpp-esp32`](https://github.com/Kobayashi24730/platformio-wokwi-cpp-esp32).

---

## Sumário

- [Visão geral](#visão-geral)
- [Stack](#stack)
- [Arquitetura](#arquitetura)
- [Sensores suportados](#sensores-suportados)
- [Endpoint da API](#endpoint-da-api)
- [Como rodar localmente](#como-rodar-localmente)
- [Scripts do npm](#scripts-do-npm)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Deploy](#deploy)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

---

## Visão geral

- **Landing page** (`/`) com apresentação do produto.
- **Dashboard** (`/dashboard`) com cartões por sensor e gráficos Recharts.
- **Contas** (`/account/*`) com registro, login e perfil (NextAuth v4 + JWT + bcrypt).
- **API** (`/api/*`) para ingestão de leituras e autenticação.
- **Central de Ajuda** (`/help`) com FAQ pesquisável.

---

## Stack

| Camada        | Tecnologia                                                   |
|---------------|--------------------------------------------------------------|
| Framework     | Next.js 16 (App Router)                                      |
| UI            | React 19, TypeScript 5                                       |
| Estilo        | Tailwind CSS v4, tokens Fluent Design, `tw-animate-css`      |
| Componentes   | shadcn/ui v4 sobre Radix UI                                  |
| Ícones        | lucide-react                                                 |
| Gráficos      | Recharts 3                                                   |
| Auth          | NextAuth v4, `bcryptjs`, JWT                                 |
| Banco         | SQLite via `better-sqlite3`, Prisma 6                        |
| Realtime      | `socket.io` / `ws` (preparado para push futuro)              |
| Toasts        | Sonner                                                       |
| Deploy        | Render                                                       |

---

## Arquitetura

```
+-------------------+       HTTPS POST        +--------------------------+
|  ESP32 (Wokwi ou  | ----------------------> |  Next.js API             |
|  hardware real)   |    JSON de leitura      |  /api/data/movimento     |
+-------------------+                         +-----------+--------------+
                                                          |
                                                          v
                                              +--------------------------+
                                              |  Prisma + SQLite         |
                                              |  identifier.sqlite       |
                                              +-----------+--------------+
                                                          |
                                                          v
                                              +--------------------------+
                                              |  Next.js UI (React 19)   |
                                              |  Recharts + Fluent UI    |
                                              +--------------------------+
```

---

## Sensores suportados

Os `device_id` e `sensor` abaixo seguem exatamente o firmware de referência. Cada combinação única é tratada como uma série independente.

| `device_id`             | `sensor`     | `value`                       |
|-------------------------|--------------|-------------------------------|
| `ESP32_WiFi_01`         | `WiFi`       | RSSI em dBm                   |
| `ESP32_UPTIME_01`       | `UPTIME`     | Segundos desde o boot         |
| `ESP32_memori_01`       | `memori`     | Heap livre em bytes           |
| `ESP32_PIR_01`          | `PIR`        | `1.0` / `0.0` (evento)        |
| `ESP32_SOUND_01`        | `SOUND`      | Leitura ADC bruta (0–4095)    |
| `ESP32_ULTRASONIC_01`   | `ULTRASONIC` | Distância em cm               |
| `ESP32_TEMP_01`         | `DHT22`      | Temperatura em °C             |
| `ESP32_HUMID_01`        | `HUMIDITY`   | Umidade relativa em %         |

---

## Endpoint da API

**`POST /api/data/movimento`**

Cabeçalho: `Content-Type: application/json`

```json
{
  "device_id": "ESP32_PIR_01",
  "sensor": "PIR",
  "estado": true,
  "value": 1.00,
  "timestamp": "2026-09-13T20:00:00.000Z"
}
```

Respostas: `200 OK` / `201 Created` em sucesso. Erros retornam status HTTP apropriado com mensagem JSON.

---

## Como rodar localmente

### Pré-requisitos

- Node.js 20+
- npm 10+

### Passos

```bash
git clone https://github.com/Kobayashi24730/dashboard-pro-para-esp32.git
cd dashboard-pro-para-esp32/src

npm install
npx prisma generate
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000). O banco local `identifier.sqlite` já vem no repositório e é usado por padrão.

Para simular um POST manualmente:

```bash
curl -X POST http://localhost:3000/api/data/movimento \
  -H "Content-Type: application/json" \
  -d '{
        "device_id":"ESP32_TEMP_01",
        "sensor":"DHT22",
        "estado":true,
        "value":23.45,
        "timestamp":"2026-09-13T20:00:00.000Z"
      }'
```

---

## Scripts do npm

Definidos em `src/package.json`:

| Comando         | O que faz                                     |
|-----------------|-----------------------------------------------|
| `npm run dev`   | Sobe o Next em modo desenvolvimento           |
| `npm run build` | Executa `prisma generate` e faz o build       |
| `npm start`     | Roda o build de produção                      |
| `npm run lint`  | Executa o ESLint                              |

---

## Estrutura do projeto

```
.
├── prisma/                    # schema.prisma e migrações
├── src/
│   ├── app/
│   │   ├── account/           # login, registro, perfil
│   │   ├── api/               # rotas API (auth, ingestão de dados)
│   │   ├── dashboard/         # painel principal
│   │   ├── help/              # FAQ pesquisável
│   │   ├── layout.tsx
│   │   ├── page.tsx           # landing page
│   │   └── globals.css
│   ├── components/            # DashboardShell, cartões de sensor, etc.
│   ├── hooks/
│   ├── lib/
│   ├── public/
│   ├── types/
│   └── package.json
├── identifier.sqlite          # banco SQLite local
├── tailwind.config.ts
├── LICENSE
└── README.md
```

---

## Deploy

O projeto está hospedado no **Render** em [`dashboard-pro-para-esp32.onrender.com`](https://dashboard-pro-para-esp32.onrender.com). O build de produção é acionado pelo `npm run build` (que já gera o Prisma Client) e servido por `npm start`. Rewrites do Next.js roteiam chamadas `/api/*` para os handlers do App Router.

Para replicar o deploy:

1. Conecte o fork ao Render como *Web Service*.
2. Build Command: `npm install && npm run build`
3. Start Command: `npm start`
4. Root directory: `src/`

> Para produção real, considere trocar o SQLite por um banco gerenciado (Postgres/PlanetScale) — o Render descarta o filesystem entre deploys.

---

## Contribuindo

1. Faça um fork.
2. Crie uma branch (`git checkout -b feat/minha-feature`).
3. Commit (`git commit -m "feat: descrição curta"`).
4. Push e abra um Pull Request.

Bugs e sugestões vão em [Issues](https://github.com/Kobayashi24730/dashboard-pro-para-esp32/issues).

---

## Licença

Distribuído sob a licença **MIT**. Veja o arquivo [`LICENSE`](./LICENSE) para o texto completo.
