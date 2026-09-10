// Projetos em produção / destaque — descrições revisadas a partir do CV real
export const projects = [
  {
    id: 1,
    title: 'Plataforma SaaS de Gestão Sindical',
    description:
      'Monorepo multi-tenant com API REST, backoffice web e app mobile. Fastify + Prisma + PostgreSQL, JWT + RBAC granular, Next.js + Shadcn e React Native (Expo).',
    imageUrl: '/perfeito.jpg',
    tags: ['Node.js', 'Fastify', 'Prisma', 'Next.js', 'RBAC', 'Multi-tenant'],
    link: 'https://github.com/niceusts',
  },
  {
    id: 2,
    title: 'Estância Digital (.NET 9)',
    description:
      'Arquitetura modular C# 13 / .NET 9 (Domain, Services, Identity, Infra). EF Core, Identity com Claims/Policies, integrações MailKit/Jasper e MVC Razor por áreas.',
    imageUrl: '/img1.jpg',
    tags: ['C#', '.NET 9', 'EF Core', 'SQL Server', 'Azure'],
    link: '#',
  },
  {
    id: 3,
    title: 'CONECTA-PPGCNUT (TCC)',
    description:
      'Framework acadêmico: API Fastify v5 + Zod + JWT + Swagger + Cloudinary + Docker; SPA Next.js 14 + React Query + MUI + Tailwind, Jest + RTL.',
    imageUrl: '/img2.jpg',
    tags: ['TypeScript', 'Fastify', 'Next.js', 'Prisma', 'Docker'],
    link: 'https://github.com/niceusts',
  },
  {
    id: 4,
    title: 'SAAE — Agência Virtual',
    description:
      'Agência virtual da Prefeitura de Estância: gestão de faturas e histórico de consumo. Back-end .NET com pagamentos, front React + MUI acessível.',
    imageUrl: '/SAAE-logo-header.png',
    tags: ['C#', '.NET', 'React', 'MUI', 'SQL Server'],
    link: 'https://saae.estancia.se.gov.br/',
  },
  {
    id: 5,
    title: 'SIARQ — Arquivo Municipal',
    description:
      'Sistema de gestão e consulta ao acervo arquivístico do município de Estância.',
    imageUrl: '/SIARQ_logo.png',
    tags: ['C#', '.NET', 'SQL Server', 'Razor'],
    link: 'https://siarq.estancia.se.gov.br/',
  },
  {
    id: 6,
    title: 'SISVAL — Validação de Documentos',
    description:
      'Sistema de validação e autenticidade de documentos oficiais da Prefeitura de Estância.',
    imageUrl: '/Sisval.png',
    tags: ['C#', '.NET', 'SQL Server'],
    link: 'https://sisval.estancia.se.gov.br/',
  },
];
