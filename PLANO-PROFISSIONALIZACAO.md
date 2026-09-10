# Portfólio Profissional — Diagnóstico + Plano com Banco Real, E-mail e APIs Gratuitas

> Autor: Niceu Santos Biriba Oliveira — Full Stack / Engenheiro de Software
> Stack atual: Next.js 14, React 18, Tailwind 3, Vercel
> Data: 2026-09-10

---

## 1. Diagnóstico (o que hoje te impede de parecer sênior)

### 1.1 Crítico (corrige antes de divulgar)
1. **Hero desatualizado** (`src/app/components/HeroSection.tsx:12-26`):
   - Diz `Desenvolvedor Frontend` e `cursando Sistemas de Informação`.
   - Realidade do CV: Formado UFS 04/2026, Pós em Engenharia de Dados e IA, 4+ anos Prefeitura de Estância, Full Stack C#/.NET + TypeScript/Node/Next, SaaS multi-tenant + RBAC.
2. **Descrições erradas em `data/projetos.js`:**
   - `SIARQ` fala de "animais raros", `PSS Jovem Aprendiz` fala de "rede social de cães", `SISHAB` repete animais, `PSS` fala de "loja de bicicletas". Isso quebra confiança na hora.
   - `link: '#'` no SISHAB.
3. **Página currículo desatualizada** (`src/app/pages/curriculo/page.tsx`):
   - Título `Web Developer`, `previsão 2025`, sem Pós, sem SaaS Sindical, sem Estância Digital, sem CONECTA-PPGCNUT, sem skills .NET 9 / Fastify / Prisma / RBAC / Azure.
4. **SEO básico quebrado** (`src/app/layout.tsx:18-29`):
   - `title: 'Portifólio - Niceu'` (erro ortográfico), `lang="en"` com conteúdo pt-BR, sem OpenGraph, sem Twitter Card, sem JSON-LD, sem `sitemap.xml`/`robots.txt`.
5. **Contato não envia nada** (`ContactSection.tsx` + `pages/contato/page.tsx`):
   - Só `mailto:` e `wa.me`. Sem formulário real, sem persistência, sem anti-spam. Recrutador não quer abrir cliente de e-mail.

### 1.2 Estrutural
- Dados mockados em `data/*.js` (`projetos.js`, `githubProjects.js`, `habilidades.js`, `skills.js`). Sem banco, sem admin.
- GitHub section usa array estático, não a **GitHub API** real. Perde prova social (stars, linguagem, updated_at).
- `Image` com `layout="responsive"` deprecated no Next 14, `alt` genérico, sem `loading="lazy"`.
- Mix MUI + Tailwind + Bootstrap + Emotion = bundle pesado e visual inconsistente.
- Sem `.env.example`, sem validação (Zod), sem rate-limit, sem analytics.

---

## 2. Para onde ir: arquitetura alvo 100% gratuita

```
Vercel (host já usado) 
 ├─ Next.js 14 App Router (front + /api/*)
 ├─ Neon OU Supabase (Postgres real grátis)
 │   ├─ Prisma ORM
 │   └─ tabelas: projects, skills, experiences, education, messages
 ├─ Resend (envio de e-mail grátis) + Nodemailer/Gmail como fallback
 ├─ GitHub REST API (repos dinâmicos, sem mock)
 ├─ reCAPTCHA v3 ou Turnstile (anti-spam grátis)
 └─ Vercel Analytics + Speed Insights (grátis)
```

### 2.1 Comparativo gratuito (recomendação marcada)

| Necessidade | Opção A (Recomendada) | Opção B | Limite grátis |
|---|---|---|---|
| Banco Postgres real | **Neon** `neon.tech` | Supabase `supabase.com` | Neon: 3GB, 1 projeto; Supabase: 500MB + Auth + Storage |
| ORM | **Prisma** | Drizzle | — |
| E-mail transacional | **Resend** `resend.com` | Gmail + Nodemailer (App Password) | Resend: 100/dia, 3000/mês; Gmail: ~500/dia mas cai em spam |
| Anti-spam | **Cloudflare Turnstile** | reCAPTCHA v3 | grátis |
| Imagens | **Cloudinary** | Vercel Blob / Supabase Storage | Cloudinary: 25GB/mês |
| Analytics | **Vercel Analytics** | PostHog free | grátis |

**Recomendação final:** Neon + Prisma + Resend + Turnstile. Se quiser Auth + Storage + Dashboard sem código, troque Neon por Supabase (o schema abaixo funciona nos dois).

---

## 3. Banco real: schema pronto (Prisma + SQL)

### 3.1 `prisma/schema.prisma`
```prisma
generator client { provider = "prisma-client-js" }
datasource db { provider = "postgresql"; url = env("DATABASE_URL") }

model Project {
  id          Int      @id @default(autoincrement())
  slug        String   @unique
  title       String
  description String   @db.Text
  imageUrl    String?
  link        String?
  repoUrl     String?
  featured    Boolean  @default(false)
  published   Boolean  @default(true)
  order       Int      @default(0)
  tags        String[] // ex: ["C#", ".NET 9", "Next.js"]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Skill {
  id       Int     @id @default(autoincrement())
  category String  // frontend | backend | database | devops | arquitetura
  title    String
  level    Int     // 0-100
  logo     String?
  order    Int     @default(0)
}

model Experience {
  id        Int       @id @default(autoincrement())
  company   String
  role      String
  location  String?
  startDate DateTime
  endDate   DateTime?
  current   Boolean   @default(false)
  summary   String    @db.Text
  bullets   String[]
  order     Int       @default(0)
}

model Message {
  id        Int      @id @default(autoincrement())
  name      String
  email     String
  subject   String?
  body      String   @db.Text
  read      Boolean  @default(false)
  ipHash    String?
  createdAt DateTime @default(now())
}
```

### 3.2 Seed com seu CV atual (exemplo)
```ts
// prisma/seed.ts (resumo)
await db.project.createMany({ data: [
  { slug:'saas-sindical', title:'Plataforma SaaS de Gestão Sindical', description:'Monorepo multi-tenant: Fastify+Prisma+Postgres, JWT+RBAC granular, Next.js+Shadcn backoffice, RN Expo mobile.', tags:['Node.js','Fastify','Prisma','PostgreSQL','Next.js','RBAC'], featured:true },
  { slug:'estancia-digital', title:'Plataforma Estância Digital', description:'C# 13 / .NET 9 modular (Domain, Services, Identity, Infra), EF Core, Identity com Claims/Policies, MailKit+Jasper, MVC Razor Areas.', tags:['C#','.NET 9','EF Core','SQL Server','Azure'], featured:true },
  { slug:'conecta-ppgcnut', title:'Framework CONECTA-PPGCNUT (TCC)', description:'Fastify v5+Zod+JWT+Swagger+Cloudinary+Docker, Next.js 14+React Query+MUI+Tailwind, RHF+Zod, Jest+RTL, Husky.', tags:['TypeScript','Fastify','Next.js','Prisma'], featured:true },
  { slug:'saae-agencia-virtual', title:'SAAE Agência Virtual', description:'Gestão de faturas e consumo, .NET + APIs pagamento, React+MUI acessível.', tags:['.NET','React','MUI'], featured:true },
]})
```

---

## 4. E-mail real: formulário de contato end-to-end

### 4.1 `.env.example`
```bash
DATABASE_URL="postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require"
RESEND_API_KEY="re_xxx"
CONTACT_TO="niceusantos1365@gmail.com"
CONTACT_FROM="Portfólio <contato@seu-dominio.vercel.app>"
NEXT_PUBLIC_TURNSTILE_SITE_KEY="xxx"
TURNSTILE_SECRET_KEY="xxx"
GITHUB_TOKEN="ghp_xxx" # opcional, aumenta rate-limit
```

### 4.2 `src/app/api/contact/route.ts`
```ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';

const Schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(120),
  subject: z.string().max(140).optional().default('Contato via portfólio'),
  message: z.string().min(10).max(4000),
  token: z.string().optional(), // turnstile
});

export async function POST(req: Request) {
  const json = await req.json().catch(()=>null);
  const parsed = Schema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error:'Dados inválidos' },{ status:400 });

  const { name, email, subject, message } = parsed.data;

  // 1. salva no banco real
  const saved = await prisma.message.create({ data:{ name, email, subject, body:message } });

  // 2. envia e-mail via Resend (grátis)
  const resend = new Resend(process.env.RESEND_API_KEY!);
  await resend.emails.send({
    from: process.env.CONTACT_FROM!,
    to: process.env.CONTACT_TO!,
    replyTo: email,
    subject: `[Portfólio] ${subject} — ${name}`,
    html: `<p><b>${name}</b> &lt;${email}&gt;</p><p>${message.replace(/\n/g,'<br/>')}</p><p>ID: ${saved.id}</p>`
  });

  return NextResponse.json({ ok:true, id: saved.id });
}
```

> Fallback sem Resend: usar `nodemailer` com Gmail App Password. Só trocar o bloco 2. Resend é preferível por entregabilidade e não cair em spam.

### 4.3 Rate-limit simples (sem lib paga)
Usar Upstash Redis free OU em memória + `headers()` por IP (MVP). Para produção Vercel, Upstash free resolve.

---

## 5. APIs gratuitas para usar agora

1. **GitHub REST** `GET https://api.github.com/users/niceusts/repos?sort=updated&per_page=9` — troca `githubProjects.js` estático por dados vivos (stars, forks, language). Cache com `fetch(..., { next:{ revalidate: 3600 } })`.
2. **Resend** — envio do item 4.
3. **Turnstile / reCAPTCHA v3** — protege `/api/contact`.
4. **Vercel Analytics + Speed Insights** — `npm i @vercel/analytics @vercel/speed-insights`, 2 linhas no `layout.tsx`.
5. **Cloudinary free** — mover `/public/*.png` para CDN com `next/image` remoto.
6. **Open Graph + JSON-LD** — sem custo, dobra CTR no LinkedIn/WhatsApp.

---

## 6. Onde alocar o banco (passo a passo, 10 min, R$0)

### Opção A — Neon (recomendado p/ Prisma+Vercel)
1. Cria conta em `neon.tech` (login GitHub).
2. New Project → região `US East (N. Virginia)` (menor latência p/ Vercel free) → copia `DATABASE_URL` pooled (`-pooler`).
3. Local: `npm i prisma @prisma/client && npx prisma init`, cola URL no `.env`, `npx prisma migrate dev --name init`, `npx prisma db seed`.
4. Vercel → Project → Settings → Environment Variables → adiciona `DATABASE_URL` + `RESEND_API_KEY` + `CONTACT_TO/FROM`.
5. Deploy. Logs em Neon → Tables confirma `Message`, `Project`.

### Opção B — Supabase
1. `supabase.com` → New Project → senha DB → copia Connection String (modo Transaction + `?pgbouncer=true`).
2. Mesmo Prisma acima funciona. Bônus: Table Editor web = admin sem código, Auth pronta se quiser área `/admin`.
3. Storage bucket `portfolio` public para fotos/projetos.

---

## 7. Profissionalização do front (checklist priorizado)

- [ ] **P0 Conteúdo:** reescrever Hero: `Desenvolvedor Full Stack | Engenheiro de Software`, 4+ anos, .NET 9 + Next.js, SaaS/RBAC. Corrigir as 4 descrições erradas de projetos.
- [ ] **P0 Currículo:** nova `pages/curriculo` com timeline (2021-2022 Front, 2022-Presente FullStack), educação (UFS 2026 + Pós + IFS 2019), 4 projetos relevantes, botão `curriculo.pdf` atualizado.
- [ ] **P0 SEO:** corrigir `Portifólio→Portfólio`, `lang="pt-BR"`, metadata OG, `sitemap.ts`, `robots.ts`, `manifest`, JSON-LD Person.
- [ ] **P1 DB:** Prisma + Neon, rotas `/api/projects`, `/api/skills`, `/api/contact`, ISR `revalidate=3600`.
- [ ] **P1 Form:** `ContactForm.tsx` client com `react-hook-form+zod`, estados loading/success/error, honeypot + Turnstile.
- [ ] **P1 GitHub live:** substitui mock por fetch real com fallback estático.
- [ ] **P2 Admin:** `/admin/messages` protegida (middleware + `ADMIN_SECRET` simples ou NextAuth+Supabase) para ler mensagens do banco.
- [ ] **P2 Perf:** remove MUI/Emotion onde Tailwind resolve, `next/font`, `next/image` com `sizes`, Lighthouse ≥90.

---

## 8. Roadmap sugerido (3 sprints curtas)

**Sprint 1 — Credibilidade (1-2 dias):** corrige textos, currículo, SEO, footer 2024→2026.
**Sprint 2 — Banco + E-mail (2-3 dias):** Neon+Prisma, seed CV, `/api/contact`+Resend, form real, envs na Vercel.
**Sprint 3 — Prova viva (1-2 dias):** GitHub API, analytics, admin de mensagens, README novo.

---

## 9. Fonte única do CV (para popular DB/site/PDF)

- **Nome:** Niceu Santos Biriba Oliveira — Estância/SE — +55 79 99608-4047 — niceusantos1365@gmail.com — linkedin.com/in/niceu-santos-biriba-1055301b2
- **Headline:** Desenvolvedor Full Stack | Engenheiro de Software
- **Exp:** Prefeitura Estância FullStack 11/2022–Presente (C#, .NET, APIs REST, Azure DevOps, Scrum); Front-End 11/2021–11/2022 (React/Next SSR, Jest/RTL, Gitflow); SofTeam UFS Marketing 2020–2021 (+30% engajamento).
- **Edu:** Pós Eng. Dados e IA Estácio (andamento); Bach. SI UFS 04/2026; Técnico IFS 04/2019.
- **Skills:** C#13/.NET9/Node/TS/Fastify/REST/GraphQL/JWT/Identity; React/Next/SSR/RN Expo/MVC/Razor/Tailwind v4/Shadcn/MUI; Postgres/SQL Server/EF/Prisma; Multi-tenant/Clean/DDD/Monorepo/RBAC; Azure/CI-CD/Git/Docker; Jest/RTL/Swagger.
- **Idiomas:** PT nativo, EN leitura/escrita avançado, conversação intermediário.

---

## 10. Próximo comando para executar (quando aprovar)

```bash
npm i prisma @prisma/client zod resend react-hook-form @hookform/resolvers @vercel/analytics @vercel/speed-insights
npx prisma init
# configurar .env com DATABASE_URL Neon + RESEND_API_KEY
npx prisma migrate dev --name init
npm run dev
```

Me diga `Neon ou Supabase?` e `Resend ou Gmail+Nodemailer?` que eu já gero o PR com schema, seed, `/api/contact` e `ContactForm`.
