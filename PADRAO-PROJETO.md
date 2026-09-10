# Guia de Padrões e Arquitetura do Projeto

Este documento define os padrões arquiteturais, convenções de código, fluxo de trabalho e boas práticas adotadas no monorepo do portfólio de **Niceu Santos Biriba Oliveira**.

---

## 1. Visão Geral da Arquitetura

O projeto adota uma arquitetura em **Monorepo Desacoplado** com separação total de responsabilidades (SoC):

```
meu-portfolio/
├── frontend/             # SPA / SSR com Next.js 14 (App Router)
│   ├── src/
│   │   ├── app/          # Rotas e páginas (App Router)
│   │   │   ├── components/  # Componentes reutilizáveis de interface
│   │   │   ├── pages/       # Rotas adicionais (/curriculo, /projetos, etc.)
│   │   │   └── globals.css  # Regras globais de estilo e utilitários
│   │   ├── lib/          # Clientes HTTP (Axios), utilitários e types
│   │   └── fonts/        # Tipografia local (Geist)
│   ├── public/           # Ativos estáticos (fotos, logos, PDFs)
│   ├── package.json
│   └── tsconfig.json
│
├── backend/              # API RESTful com Fastify 5 + TypeScript
│   ├── src/
│   │   ├── routes/       # Handlers HTTP organizados por domínio
│   │   ├── lib/          # Singletons (PrismaClient, Resend mailer)
│   │   └── server.ts     # Ponto de entrada, plugins (CORS, Rate Limit)
│   ├── prisma/
│   │   ├── schema.prisma # Modelagem e migrations para Postgres
│   │   └── seed.ts       # População inicial idempotente
│   ├── package.json
│   └── tsconfig.json
│
├── PADRAO-PROJETO.md     # Este manual de diretrizes
├── PLANO-PROFISSIONALIZACAO.md # Diagnóstico e roadmap de evolução
└── README.md             # Instruções rápidas de execução e deploy
```

---

## 2. Padrões de Comunicação (Front ⇄ Back)

### 2.1 Uso do Axios
Todas as chamadas à API são centralizadas em `frontend/src/lib/api.ts`:
- **Instância padronizada:** `baseURL` apontando para `NEXT_PUBLIC_API_URL` com fallback para `http://localhost:3333`.
- **Timeout preventivo:** 10.000 ms para evitar chamadas pendentes infinitas.
- **Tipagem estrita:** cada endpoint possui interfaces para entrada (`InputDTO`) e retorno (`OutputDTO`).
- **Tratamento uniforme de erros:** extração automática de `err.response.data.error` nos interceptors ou blocos `catch`.

```typescript
// Exemplo em frontend/src/lib/api.ts
export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});
```

### 2.2 Contrato RESTful
- Respostas de sucesso retornam o objeto solicitado ou status booleano: `{ ok: true, id?: number }`.
- Erros retornam obrigatoriamente status HTTP semântico (400, 401, 404, 429, 500) e corpo `{ error: string }`.
- Validação no backend via **Zod** antes de qualquer operação de persistência ou integração externa.

---

## 3. Padrões de Código e Convenções

### 3.1 Nomenclatura
- **Arquivos de Componente (React):** PascalCase (ex: `ContactForm.tsx`, `HeroSection.tsx`).
- **Arquivos de Rotas / Utilitários:** camelCase ou kebab-case (ex: `api.ts`, `prisma.ts`, `server.ts`).
- **Rotas de API:** plurais, em minúsculas (ex: `/api/contact`, `/api/projects`, `/api/skills`).
- **Tabelas do Banco (Prisma):** PascalCase singular (`Project`, `Skill`, `Experience`, `Message`).
- **Variáveis de Ambiente:** SCREAMING_SNAKE_CASE (ex: `DATABASE_URL`, `RESEND_API_KEY`).

### 3.2 Validação de Dados
- Toda entrada do usuário **deve** ser sanitizada e validada via Zod tanto no front (com `@hookform/resolvers/zod`) quanto no back.
- Não confiar no front-end: sanitização de tags HTML e limitação de caracteres (ex: `min(10)`, `max(4000)`).

### 3.3 Anti-Spam e Segurança
- **Honeypot:** campo oculto `website`. Se preenchido por bots, a API simula sucesso 200/201 sem persistir nem enviar e-mail.
- **Rate Limiting:** IP rate-limit de 5 envios a cada 10 minutos para a rota `/api/contact`.
- **CORS:** liberado estritamente para o domínio do frontend especificado em `FRONTEND_URL`.
- **Hash de IP:** IPs armazenados como hash SHA-256 parcial para proteção à privacidade (LGPD).

---

## 4. Convenções de Git e Commits

Adotar o padrão **Conventional Commits**:

```
<tipo>(<escopo opcional>): <descrição curta no imperativo>
```

Tipos aceitos:
- `feat`: Nova funcionalidade (ex: `feat(contact): adiciona envio via Resend`)
- `fix`: Correção de bug (ex: `fix(hero): corrige cargo para Engenheiro de Software`)
- `refactor`: Refatoração sem alteração de comportamento externo
- `style`: Ajustes de formatação, Tailwind ou CSS
- `docs`: Modificações em documentações (.md)
- `chore`: Atualização de pacotes, dependências ou scripts

---

## 5. Estratégia de Deploy

```
                    ┌────────────────────────────┐
                    │     Vercel (Frontend)      │
                    │ Root Directory: frontend/  │
                    │  NEXT_PUBLIC_API_URL       │
                    └─────────────┬──────────────┘
                                  │ HTTPS (Axios)
                                  ▼
┌─────────────────────────┐  ┌────────────────────────────┐
│      Neon Database      │◄─┤ Render / Railway (Backend) │
│ (PostgreSQL Serverless) │  │ Fastify + Prisma + Resend │
└─────────────────────────┘  └─────────────┬──────────────┘
                                           │ API Call
                                           ▼
                             ┌────────────────────────────┐
                             │       Resend API           │
                             │  (Envio transacional)      │
                             └────────────────────────────┘
```

1. **Neon:** PostgreSQL hospedado gratuitamente em região `US East` para baixa latência.
2. **Render ou Railway:** Backend Fastify com auto-deploy na branch `main`, rodando `npm run build` e `npm run start`.
3. **Vercel:** Frontend Next.js configurado apontando para a pasta raiz `frontend`.
