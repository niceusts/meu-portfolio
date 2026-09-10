# Backend — Portfólio API (Fastify + Prisma + Resend + Neon)

API separada do frontend. Banco Postgres real no Neon, envio de e-mail via Resend.

## Rotas

| Método | Rota | Descrição |
|---|---|---|
| GET | `/health` | healthcheck |
| POST | `/api/contact` | salva mensagem no banco + envia e-mail (rate-limit 5/10min, honeypot) |
| GET | `/api/projects` | lista projetos publicados |
| GET | `/api/skills` | lista skills |
| GET | `/api/experiences` | lista experiências |
| GET | `/api/messages?secret=xxx` | admin simples (requer `ADMIN_SECRET`) |

## Rodar local

```bash
cd backend
cp .env.example .env   # preencha DATABASE_URL (Neon pooled) + RESEND_API_KEY
npm install
npx prisma migrate dev --name init
npx prisma db seed
npm run dev            # http://localhost:3333/health
```

## Deploy gratuito sugerido

- **Banco:** Neon (`neon.tech`) — projeto free 3GB, use a connection string pooled.
- **API:** Render / Railway / Fly.io (free tier) com envs `DATABASE_URL`, `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`, `FRONTEND_URL`, `ADMIN_SECRET`. Após deploy rode `prisma migrate deploy`.
- **Frontend:** Vercel com `NEXT_PUBLIC_API_URL=https://sua-api.onrender.com`.
