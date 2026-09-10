import type { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma.js';

const fallbackProjects = [
  {
    id: 0,
    slug: 'saas-sindical',
    title: 'Plataforma SaaS de Gestão Sindical',
    description: 'Multi-tenant com Fastify + Prisma + RBAC, Next.js + Shadcn e app RN Expo.',
    imageUrl: null,
    link: null,
    tags: ['Node.js', 'Fastify', 'Next.js'],
  },
];

export async function contentRoutes(app: FastifyInstance) {
  app.get('/projects', async (_req, reply) => {
    try {
      const projects = await prisma.project.findMany({
        where: { published: true },
        orderBy: [{ featured: 'desc' }, { order: 'asc' }],
      });
      return reply.header('Cache-Control', 'public, max-age=3600').send({ projects });
    } catch (e) {
      app.log.error(e);
      return reply.send({ projects: fallbackProjects, fallback: true });
    }
  });

  app.get('/skills', async (_req, reply) => {
    try {
      const skills = await prisma.skill.findMany({ orderBy: { order: 'asc' } });
      return reply.header('Cache-Control', 'public, max-age=3600').send({ skills });
    } catch (e) {
      app.log.error(e);
      return reply.send({ skills: [], fallback: true });
    }
  });

  app.get('/experiences', async (_req, reply) => {
    try {
      const experiences = await prisma.experience.findMany({ orderBy: { order: 'asc' } });
      return reply.send({ experiences });
    } catch (e) {
      app.log.error(e);
      return reply.send({ experiences: [], fallback: true });
    }
  });
}
