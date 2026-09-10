# Guia Prático de Deploy e Configuração de Ambiente (100% Grátis)

Este guia orienta o passo a passo para colocar o portfólio no ar com infraestrutura moderna, desacoplada e com custo zero.

---

## 1. Banco de Dados — Neon (PostgreSQL)

1. Acesse **[neon.tech](https://neon.tech)** e crie uma conta gratuita.
2. Crie um novo projeto (sugestão de região: `US East (N. Virginia)` ou `Ohio`).
3. No painel principal do Neon (Dashboard):
   - Localize a caixa **Connection Details**.
   - Marque a opção **Pooled connection** (o host conterá algo como `-pooler` no subdomínio).
   - Copie a connection string completa no formato:
     ```
     postgresql://usuario:senha@ep-exemplo-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require
     ```
4. Guarde esta URL: ela será o valor de `DATABASE_URL` no seu backend.

---

## 2. Inicialização do Banco (Migrações e Seed)

Antes ou logo após o primeiro deploy, execute os comandos do Prisma a partir da pasta `backend/`:

```bash
cd backend

# Crie seu arquivo .env com a URL do Neon
# DATABASE_URL="postgresql://..."

# 1. Gerar os clientes tipados do Prisma
npx prisma generate

# 2. Criar e aplicar a migração inicial no Neon
npx prisma migrate dev --name init

# 3. Popular o banco com projetos, skills e histórico profissional
npm run prisma:seed
```

---

## 3. E-mail Transacional — Resend

1. Acesse **[resend.com](https://resend.com)** e crie sua conta gratuita.
2. No menu **API Keys**, clique em **Create API Key** e copie o token (inicia com `re_...`).
3. Para testes imediatos sem domínio próprio:
   - Remetente padrão: `Portfolio <onboarding@resend.dev>`
   - Destinatário: use o mesmo e-mail cadastrado na conta do Resend (`niceusantos1365@gmail.com`).
4. (Opcional) Quando tiver domínio próprio, adicione em **Domains** e faça a verificação dos registros DNS (DKIM/SPF) para poder enviar a partir de `@seudominio.com`.

---

## 4. Deploy do Back-end (Fastify)

Você pode escolher **Render** ou **Railway**. Ambas as plataformas são excelentes.

### Opção A: Render (Web Service Gratuito)
1. Acesse **[dashboard.render.com](https://dashboard.render.com)**.
2. Clique em **New +** → **Web Service**.
3. Conecte o repositório `meu-portfolio`.
4. Preencha as configurações:
   - **Name:** `portfolio-api`
   - **Region:** `US East (Ohio)`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install && npx prisma generate && npm run build`
   - **Start Command:** `npm run start`
   - **Instance Type:** `Free`
5. Na seção **Environment Variables**, adicione:
   | Variável | Exemplo de Valor |
   |---|---|
   | `DATABASE_URL` | `postgresql://...-pooler...neondb?sslmode=require` |
   | `PORT` | `3333` *(ou deixe o Render atribuir a porta padrão)* |
   | `FRONTEND_URL` | `https://meu-portfolio-flame-eta.vercel.app` *(ou sua URL final da Vercel)* |
   | `RESEND_API_KEY` | `re_sua_chave_aqui` |
   | `CONTACT_TO` | `niceusantos1365@gmail.com` |
   | `CONTACT_FROM` | `Portfolio <onboarding@resend.dev>` |
   | `ADMIN_SECRET` | `crie_uma_senha_forte_para_admin` |
6. Clique em **Create Web Service**. Ao finalizar, o Render fornecerá a URL pública (ex: `https://portfolio-api.onrender.com`).
7. Teste a saúde da API no navegador acessando: `https://portfolio-api.onrender.com/health` (deve retornar `{"ok":true,"time":"..."}`).

---

## 5. Deploy do Front-end (Next.js na Vercel)

1. Acesse o painel da **[Vercel](https://vercel.com)**.
2. Abra o projeto do seu portfólio (ou clique em **Add New...** → **Project** se for um novo).
3. Vá em **Settings** → **General**:
   - Localize **Root Directory**, clique em **Edit**, selecione `frontend` e clique em **Save**.
   - O Framework Preset deve permanecer **Next.js**.
4. Vá em **Settings** → **Environment Variables**:
   - Adicione a variável pública com a URL da API criada no Render:
     - **Key:** `NEXT_PUBLIC_API_URL`
     - **Value:** `https://portfolio-api.onrender.com` *(sem barra `/` no final)*
5. Vá na aba **Deployments** e solicite um **Redeploy** (ou dê um `git push` para acionar novo build).

---

## 6. Validação de Ponta a Ponta

Após o deploy:
1. Abra seu site no navegador.
2. Navegue pelas seções:
   - **Projetos:** Os cards carregarão os dados dinâmicos do banco via API (com fallback garantido).
   - **Contato:** Preencha o formulário de contato com uma mensagem de teste e envie.
   - Verifique se a notificação chega na sua caixa de entrada `niceusantos1365@gmail.com`.
3. Para consultar as mensagens recebidas diretamente na API (Admin):
   - Acesse no navegador: `https://portfolio-api.onrender.com/api/messages?secret=sua_senha_admin`
