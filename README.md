# Portfólio — Niceu Santos Biriba Oliveira

Portfólio profissional de **Desenvolvedor Full Stack / Engenheiro de Software**. Arquitetura desacoplada em monorepo com **Next.js 14** no Front-end e **Fastify 5 + Prisma + PostgreSQL** no Back-end.

---

## Estrutura do Projeto

```
meu-portfolio/
├── frontend/             # Next.js 14, React 18, Tailwind CSS, Axios
├── backend/              # Fastify 5, Prisma 6, PostgreSQL (Neon), Resend
├── PADRAO-PROJETO.md     # Diretrizes arquiteturais e padrões de código
├── PLANO-PROFISSIONALIZACAO.md # Diagnóstico e roadmap de evolução
└── README.md             # Este arquivo
```

---

## 1. Como Rodar o Projeto Localmente

### Pré-requisitos
- **Node.js** 20 ou superior
- **Git**
- Conta gratuita no [Neon](https://neon.tech) (PostgreSQL)
- Conta gratuita no [Resend](https://resend.com) (E-mail transacional)

### Passo 1: Clonar e instalar dependências

```bash
# Clone o repositório
git clone https://github.com/niceusts/meu-portfolio.git
cd meu-portfolio

# Instalar todas as dependências (raiz, front e back)
npm run install:all
```

### Passo 2: Configurar o Backend

Crie o arquivo `backend/.env` baseado no exemplo:

```bash
cd backend
cp .env.example .env
```

Preencha as variáveis em `backend/.env`:
```env
DATABASE_URL="postgresql://seu_usuario:senha@ep-xxx.neon.tech/neondb?sslmode=require"
PORT=3333
FRONTEND_URL="http://localhost:3000"
RESEND_API_KEY="re_sua_chave_resend"
CONTACT_TO="niceusantos1365@gmail.com"
CONTACT_FROM="Portfólio <onboarding@resend.dev>"
ADMIN_SECRET="sua_chave_secreta_admin"
```

Execute as migrações e o seed no Neon:
```bash
# Executar as migrações do Prisma
npx prisma migrate dev --name init

# Popular o banco com projetos, skills e experiências
npx prisma db seed
```

Inicie o servidor backend (porta 3333):
```bash
npm run dev
```

### Passo 3: Configurar e Rodar o Frontend

Em outro terminal, crie `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL="http://localhost:3333"
```

Inicie o frontend (porta 3000):
```bash
cd frontend
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## 2. Deploy em Produção (100% Gratuito)

### 2.1 Banco de Dados — Neon (PostgreSQL)
1. Crie um projeto no [Neon](https://neon.tech) na região **US East (N. Virginia)**.
2. Copie a connection string no modo **Pooled** (contém `-pooler` no host).
3. Essa será a sua `DATABASE_URL`.

---

### 2.2 Deploy do Backend — Opção A: Render (Web Service Grátis)
1. No [Render Dashboard](https://dashboard.render.com/), clique em **New +** → **Web Service**.
2. Conecte o repositório `meu-portfolio`.
3. Configure os campos:
   - **Name:** `portfolio-api`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install && npx prisma generate && npm run build`
   - **Start Command:** `npm run start`
4. Na aba **Environment Variables**, adicione:
   - `DATABASE_URL`: URL pooled do Neon
   - `PORT`: `3333` (ou deixe o Render injetar a porta padrão)
   - `FRONTEND_URL`: `https://meu-portfolio-flame-eta.vercel.app` (sua URL da Vercel)
   - `RESEND_API_KEY`: sua chave `re_...`
   - `CONTACT_TO`: `niceusantos1365@gmail.com`
   - `CONTACT_FROM`: remetente verificado (ou `onboarding@resend.dev`)
   - `ADMIN_SECRET`: senha para consultar `/api/messages`
5. Após o primeiro deploy, abra o shell no Render ou execute localmente:
   ```bash
   npx prisma migrate deploy
   ```

---

### 2.3 Deploy do Backend — Opção B: Railway
1. No [Railway](https://railway.app), clique em **New Project** → **Deploy from GitHub repo**.
2. Selecione `meu-portfolio`.
3. Em **Settings**:
   - **Root Directory:** `/backend`
   - **Build Command:** `npm install && npx prisma generate && npm run build`
   - **Start Command:** `npm run start`
4. Em **Variables**, configure as mesmas variáveis citadas no Render.
5. Em **Networking**, clique em **Generate Domain** para obter a URL pública (ex: `https://portfolio-api-production.up.railway.app`).

---

### 2.4 Deploy do Frontend — Vercel
1. No painel da [Vercel](https://vercel.com), vá no seu projeto existente ou crie um novo a partir do repo.
2. Em **Settings** → **General**:
   - **Root Directory:** Clique em `Edit` e selecione `frontend`.
   - **Framework Preset:** Next.js.
3. Em **Settings** → **Environment Variables**, adicione:
   - `NEXT_PUBLIC_API_URL`: URL da sua API no Render ou Railway (ex: `https://sua-api.onrender.com`).
4. Realize um novo Deploy (**Redeploy**).

---

## 3. Endpoints da API

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/health` | Verificação de status da API |
| `POST` | `/api/contact` | Envia mensagem (salva no banco e dispara e-mail via Resend) |
| `GET` | `/api/projects` | Lista projetos publicados |
| `GET` | `/api/skills` | Lista habilidades técnicas |
| `GET` | `/api/experiences` | Lista histórico profissional |
| `GET` | `/api/messages?secret=xxx` | Painel rápido de leitura de contatos (requer `ADMIN_SECRET`) |

---

## 4. Scripts Rápidos da Raiz

Na raiz do monorepo, você pode usar os comandos centralizados:

```bash
npm run install:all    # Instala dependências do front e back
npm run dev:frontend   # Inicia apenas o frontend
npm run dev:backend    # Inicia apenas o backend
npm run build:frontend # Valida build de produção do front
npm run build:backend  # Compila o TypeScript do backend
```
