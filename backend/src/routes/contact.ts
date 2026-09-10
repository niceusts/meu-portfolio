import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { createHash } from 'crypto';
import { prisma } from '../lib/prisma.js';
import { sendContactEmail } from '../lib/mail.js';

const ContactSchema = z.object({
  name: z.string().trim().min(2, 'Informe seu nome').max(80),
  email: z.string().trim().email('E-mail inválido').max(120),
  subject: z.string().trim().max(140).optional().default('Contato via portfólio'),
  message: z.string().trim().min(10, 'Mensagem muito curta').max(4000),
  website: z.string().max(200).optional(), // honeypot
});

export async function contactRoutes(app: FastifyInstance) {
  app.post(
    '/contact',
    { config: { rateLimit: { max: 5, timeWindow: '10 minutes' } } },
    async (req, reply) => {
      const parsed = ContactSchema.safeParse(req.body);
      if (!parsed.success) {
        return reply.code(400).send({ error: parsed.error.issues[0]?.message ?? 'Dados inválidos' });
      }
      const { name, email, subject, message, website } = parsed.data;

      // Honeypot: finge sucesso
      if (website && website.length > 0) return reply.send({ ok: true });

      const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ?? req.ip;
      const ipHash = createHash('sha256').update(ip).digest('hex').slice(0, 32);

      const saved = await prisma.message.create({
        data: { name, email, subject, body: message, ipHash },
        select: { id: true, createdAt: true },
      });

      const mail = await sendContactEmail({
        name, email, subject, message, id: saved.id, createdAt: saved.createdAt,
      });

      if (!mail.sent) return reply.code(201).send({ ok: true, id: saved.id, warning: mail.warning });
      return reply.code(201).send({ ok: true, id: saved.id });
    }
  );

  // Admin simples: GET /messages?secret=xxx
  app.get('/messages', async (req, reply) => {
    const secret = process.env.ADMIN_SECRET;
    if (!secret) return reply.code(404).send({ error: 'Admin desabilitado' });
    const { secret: q } = (req.query ?? {}) as { secret?: string };
    if (q !== secret) return reply.code(401).send({ error: 'Não autorizado' });
    const messages = await prisma.message.findMany({ orderBy: { createdAt: 'desc' }, take: 100 });
    return reply.send({ messages });
  });
}
