import type { FastifyInstance, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma.js";
import { friendlyAzureError, uploadToAzure } from "../lib/azure.js";

// ─── Auth middleware ─────────────────────────────────────────────────────────
function requireAdmin(req: FastifyRequest, secret: string) {
  const auth = req.headers["authorization"] ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : auth;
  if (!secret || token !== secret) {
    throw { statusCode: 401, message: "Unauthorized" };
  }
}

// ─── Plugin ──────────────────────────────────────────────────────────────────
export async function adminRoutes(app: FastifyInstance) {
  const secret = process.env.ADMIN_SECRET ?? "";

  // ── Upload de imagem ──────────────────────────────────────────────────────
  app.post("/admin/upload", async (req, reply) => {
    requireAdmin(req, secret);
    const data = await req.file();
    if (!data)
      return reply.status(400).send({ error: "Nenhum arquivo enviado" });

    try {
      const buffer = await data.toBuffer();
      const url = await uploadToAzure(buffer, data.filename, data.mimetype);
      return reply.send({ url });
    } catch (err) {
      req.log.error(err, "Azure upload failed");
      const { status, message } = friendlyAzureError(err);
      return reply.status(status).send({ error: message });
    }
  });

  // ── PROJETOS ─────────────────────────────────────────────────────────────
  app.get("/admin/projects", async (req, reply) => {
    requireAdmin(req, secret);
    const projects = await prisma.project.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return reply.send({ projects });
  });

  app.post("/admin/projects", async (req, reply) => {
    requireAdmin(req, secret);
    const body = req.body as any;
    const project = await prisma.project.create({ data: body });
    return reply.status(201).send({ project });
  });

  app.put("/admin/projects/:id", async (req, reply) => {
    requireAdmin(req, secret);
    const { id } = req.params as { id: string };
    const body = req.body as any;
    const project = await prisma.project.update({
      where: { id: Number(id) },
      data: body,
    });
    return reply.send({ project });
  });

  app.delete("/admin/projects/:id", async (req, reply) => {
    requireAdmin(req, secret);
    const { id } = req.params as { id: string };
    await prisma.project.delete({ where: { id: Number(id) } });
    return reply.status(204).send();
  });

  // ── SKILLS ───────────────────────────────────────────────────────────────
  app.get("/admin/skills", async (req, reply) => {
    requireAdmin(req, secret);
    const skills = await prisma.skill.findMany({ orderBy: { order: "asc" } });
    return reply.send({ skills });
  });

  app.post("/admin/skills", async (req, reply) => {
    requireAdmin(req, secret);
    const body = req.body as any;
    const skill = await prisma.skill.create({ data: body });
    return reply.status(201).send({ skill });
  });

  app.put("/admin/skills/:id", async (req, reply) => {
    requireAdmin(req, secret);
    const { id } = req.params as { id: string };
    const body = req.body as any;
    const skill = await prisma.skill.update({
      where: { id: Number(id) },
      data: body,
    });
    return reply.send({ skill });
  });

  app.delete("/admin/skills/:id", async (req, reply) => {
    requireAdmin(req, secret);
    const { id } = req.params as { id: string };
    await prisma.skill.delete({ where: { id: Number(id) } });
    return reply.status(204).send();
  });

  // ── EXPERIÊNCIAS ──────────────────────────────────────────────────────────
  app.get("/admin/experiences", async (req, reply) => {
    requireAdmin(req, secret);
    const experiences = await prisma.experience.findMany({
      orderBy: { order: "asc" },
    });
    return reply.send({ experiences });
  });

  app.post("/admin/experiences", async (req, reply) => {
    requireAdmin(req, secret);
    const body = req.body as any;
    const experience = await prisma.experience.create({ data: body });
    return reply.status(201).send({ experience });
  });

  app.put("/admin/experiences/:id", async (req, reply) => {
    requireAdmin(req, secret);
    const { id } = req.params as { id: string };
    const body = req.body as any;
    const experience = await prisma.experience.update({
      where: { id: Number(id) },
      data: body,
    });
    return reply.send({ experience });
  });

  app.delete("/admin/experiences/:id", async (req, reply) => {
    requireAdmin(req, secret);
    const { id } = req.params as { id: string };
    await prisma.experience.delete({ where: { id: Number(id) } });
    return reply.status(204).send();
  });

  // ── CONFIGURAÇÕES DO SITE ──────────────────────────────────────────────
  app.get('/admin/settings', async (req, reply) => {
    requireAdmin(req, secret);
    const rows = await prisma.siteSetting.findMany({ orderBy: { key: 'asc' } });
    return reply.send({ settings: rows });
  });

  app.put('/admin/settings/:key', async (req, reply) => {
    requireAdmin(req, secret);
    const { key } = req.params as { key: string };
    const { value } = (req.body ?? {}) as { value?: string };
    if (typeof value !== 'string' || value.length === 0 || value.length > 2000) {
      return reply.status(400).send({ error: 'Valor inválido (1–2000 caracteres).' });
    }
    const setting = await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
    return reply.send({ setting });
  });

  // ── MENSAGENS ─────────────────────────────────────────────────────────────
  app.get("/admin/messages", async (req, reply) => {
    requireAdmin(req, secret);
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });
    return reply.send({ messages });
  });

  app.patch("/admin/messages/:id/read", async (req, reply) => {
    requireAdmin(req, secret);
    const { id } = req.params as { id: string };
    const message = await prisma.message.update({
      where: { id: Number(id) },
      data: { read: true },
    });
    return reply.send({ message });
  });

  app.delete("/admin/messages/:id", async (req, reply) => {
    requireAdmin(req, secret);
    const { id } = req.params as { id: string };
    await prisma.message.delete({ where: { id: Number(id) } });
    return reply.status(204).send();
  });
}
