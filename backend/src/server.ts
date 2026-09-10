import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import { contactRoutes } from './routes/contact.js';
import { contentRoutes } from './routes/content.js';

const app = Fastify({ logger: true });

await app.register(cors, {
  origin: (process.env.FRONTEND_URL ?? 'http://localhost:3000').split(',').map((s) => s.trim()),
  methods: ['GET', 'POST', 'OPTIONS'],
});

await app.register(rateLimit, { max: 100, timeWindow: '1 minute' });

app.get('/health', async () => ({ ok: true, time: new Date().toISOString() }));

await app.register(contactRoutes, { prefix: '/api' });
await app.register(contentRoutes, { prefix: '/api' });

const port = Number(process.env.PORT ?? 3333);
try {
  await app.listen({ port, host: '0.0.0.0' });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
