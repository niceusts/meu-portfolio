import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Limpa apenas em dev para seed idempotente por slug
  const projects = [
    {
      slug: 'saas-sindical',
      title: 'Plataforma SaaS de Gestão Sindical',
      description:
        'Monorepo multi-tenant (API REST + Backoffice Web + App Mobile). Back-end Node.js + Fastify + TypeScript, Prisma + PostgreSQL, JWT + RBAC granular (Plataforma/Sindicato/Filiado). Backoffice Next.js App Router + Tailwind + Shadcn, app mobile React Native Expo + NativeWind.',
      imageUrl: '/perfeito.jpg',
      link: 'https://github.com/niceusts',
      repoUrl: 'https://github.com/niceusts',
      featured: true,
      published: true,
      order: 1,
      tags: [
        'Node.js',
        'Fastify',
        'TypeScript',
        'Prisma',
        'PostgreSQL',
        'Next.js',
        'RBAC',
        'Multi-tenant',
      ],
    },
    {
      slug: 'estancia-digital',
      title: 'Plataforma Estância Digital',
      description:
        'Arquitetura modular C# 13 / .NET 9 (Domain, Services, Identity, Infra). EF Core, ASP.NET Identity com Claims/Policies, integrações MailKit/Jasper. Apresentação em ASP.NET Core MVC + Razor Pages com Áreas (Cidadão, Gestor, DTI).',
      imageUrl: '/img1.jpg',
      link: null,
      repoUrl: null,
      featured: true,
      published: true,
      order: 2,
      tags: ['C#', '.NET 9', 'EF Core', 'SQL Server', 'Azure'],
    },
    {
      slug: 'conecta-ppgcnut',
      title: 'Framework CONECTA-PPGCNUT (TCC)',
      description:
        'API REST Node.js + Fastify v5 + TypeScript, Prisma, Zod, JWT, Cloudinary, Swagger, Docker. SPA Next.js 14 + React Query, MUI + Tailwind, React Hook Form + Zod. Qualidade com Husky, ESLint, Prettier, Jest + RTL.',
      imageUrl: '/img2.jpg',
      link: 'https://github.com/niceusts',
      repoUrl: 'https://github.com/niceusts',
      featured: true,
      published: true,
      order: 3,
      tags: ['TypeScript', 'Fastify', 'Prisma', 'Next.js', 'Zod', 'Docker'],
    },
    {
      slug: 'saae-agencia-virtual',
      title: 'SAAE — Agência Virtual',
      description:
        'Agência virtual para gestão de faturas e histórico de consumo. Back-end .NET com integração de pagamentos, front-end React + Material-UI com foco em acessibilidade.',
      imageUrl: '/SAAE-logo-header.png',
      link: 'https://saae.estancia.se.gov.br/',
      repoUrl: null,
      featured: true,
      published: true,
      order: 4,
      tags: ['C#', '.NET', 'React', 'MUI', 'SQL Server'],
    },
    {
      slug: 'siarq',
      title: 'SIARQ — Sistema de Informação de Arquivos de Estância',
      description:
        'Sistema de gestão e consulta ao acervo arquivístico municipal da Prefeitura de Estância.',
      imageUrl: '/SIARQ_logo.png',
      link: 'https://siarq.estancia.se.gov.br/',
      repoUrl: null,
      featured: false,
      published: true,
      order: 5,
      tags: ['C#', '.NET', 'SQL Server', 'JavaScript'],
    },
    {
      slug: 'sisval',
      title: 'SISVAL — Validação de Documentos',
      description:
        'Sistema de validação e autenticidade de documentos da Prefeitura de Estância.',
      imageUrl: '/Sisval.png',
      link: 'https://sisval.estancia.se.gov.br/',
      repoUrl: null,
      featured: false,
      published: true,
      order: 6,
      tags: ['C#', '.NET', 'SQL Server'],
    },
  ];

  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }

  const skills = [
    { category: 'backend', title: 'C# / .NET 9', level: 85, order: 1 },
    {
      category: 'backend',
      title: 'Node.js / Fastify / TypeScript',
      level: 85,
      order: 2,
    },
    { category: 'frontend', title: 'React / Next.js', level: 80, order: 3 },
    {
      category: 'frontend',
      title: 'Tailwind / Shadcn / MUI',
      level: 85,
      order: 4,
    },
    { category: 'database', title: 'PostgreSQL / Prisma', level: 80, order: 5 },
    {
      category: 'database',
      title: 'SQL Server / EF Core',
      level: 80,
      order: 6,
    },
    {
      category: 'arquitetura',
      title: 'SaaS Multi-tenant / RBAC / DDD',
      level: 80,
      order: 7,
    },
    {
      category: 'devops',
      title: 'Azure / Docker / CI-CD',
      level: 75,
      order: 8,
    },
  ];
  await prisma.skill.deleteMany();
  await prisma.skill.createMany({ data: skills });

  const experiences = [
    {
      company: 'Prefeitura Municipal de Estância',
      role: 'Desenvolvedor FullStack',
      location: 'Estância, Sergipe',
      startDate: new Date('2022-11-01'),
      endDate: null,
      current: true,
      summary:
        'Desenvolvimento e sustentação de sistemas web em C#, .NET e JavaScript. APIs RESTful, interfaces responsivas acessíveis, Scrum, code review, Git e deploy contínuo com Azure DevOps.',
      bullets: [
        'C# / .NET',
        'APIs RESTful',
        'Azure DevOps',
        'Scrum / Code review',
      ],
      order: 1,
    },
    {
      company: 'Prefeitura Municipal de Estância',
      role: 'Desenvolvedor Front-End',
      location: 'Estância, Sergipe',
      startDate: new Date('2021-11-01'),
      endDate: new Date('2022-11-01'),
      current: false,
      summary:
        'Interfaces responsivas com React.js / Next.js (SSR para SEO), integração com APIs REST com segurança e tratamento de erros, Jest + RTL, Gitflow.',
      bullets: ['React / Next.js SSR', 'Integração REST', 'Jest / RTL'],
      order: 2,
    },
  ];
  await prisma.experience.deleteMany();
  await prisma.experience.createMany({ data: experiences });

  console.log('Seed OK: projects, skills, experiences');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
