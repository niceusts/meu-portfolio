import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Briefcase,
  Download,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { SectionHeading } from '@/app/components/SectionHeading';

const experiences = [
  {
    role: 'Desenvolvedor Full Stack',
    company: 'Prefeitura Municipal de Estância',
    period: '11/2022 — Presente',
    current: true,
    bullets: [
      'Sistemas web em C#, .NET e JavaScript com APIs RESTful',
      'Interfaces responsivas com foco em usabilidade e acessibilidade',
      'Scrum, code review, Git e deploy contínuo com Azure DevOps',
    ],
  },
  {
    role: 'Desenvolvedor Front-End',
    company: 'Prefeitura Municipal de Estância',
    period: '11/2021 — 11/2022',
    current: false,
    bullets: [
      'React.js + Next.js com SSR para SEO e performance',
      'Integração com APIs REST (segurança + tratamento de erros)',
      'Jest + React Testing Library e GitFlow',
    ],
  },
  {
    role: 'Assessor Comercial de Marketing',
    company: 'SofTeam — Empresa Júnior (UFS)',
    period: '07/2020 — 07/2021',
    current: false,
    bullets: [
      'Prospecção e campanhas que elevaram o engajamento em 30%',
      'Gestão de relacionamento com clientes locais',
    ],
  },
];

const education = [
  {
    title: 'Pós em Engenharia de Dados e IA',
    school: 'Estácio — Em andamento',
  },
  {
    title: 'Bacharelado em Sistemas de Informação',
    school: 'UFS — Concluído em 04/2026',
  },
  {
    title: 'Técnico em Manutenção e Suporte',
    school: 'IFS — Concluído em 04/2019',
  },
];

const featuredProjects = [
  'SaaS de Gestão Sindical — multi-tenant, Fastify + Prisma, JWT + RBAC granular, Next.js + Shadcn, RN Expo',
  'Estância Digital — C# 13 / .NET 9 modular, EF Core, Identity Claims/Policies, MailKit + Jasper, MVC Razor',
  'CONECTA-PPGCNUT (TCC) — Fastify v5 + Zod + Swagger + Cloudinary + Docker; Next.js 14 + React Query + Jest',
  'SAAE Agência Virtual — faturas e consumo, .NET + pagamentos, React + MUI acessível',
];

export default function CurriculumPage() {
  return (
    <div className="py-10">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
      >
        <ArrowLeft size={15} /> Voltar
      </Link>

      <SectionHeading
        kicker="Currículo"
        title="Niceu Santos Biriba Oliveira"
        subtitle="Desenvolvedor Full Stack · Engenheiro de Software — Estância/SE"
      />

      <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
        <a href="/curriculo.pdf" download className="btn-primary">
          <Download size={16} /> Baixar CV em PDF
        </a>
        <span className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-2.5 text-sm text-zinc-300">
          <MapPin size={15} /> Estância, Sergipe
        </span>
        <a
          href="mailto:niceusantos1365@gmail.com"
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-2.5 text-sm text-zinc-300 hover:border-zinc-600 hover:text-white"
        >
          <Mail size={15} /> niceusantos1365@gmail.com
        </a>
        <span className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-2.5 text-sm text-zinc-300">
          <Phone size={15} /> +55 (79) 99608-4047
        </span>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="glass p-6">
          <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-white">
            <Briefcase size={17} className="text-blue-400" /> Experiência
          </h3>
          <ol className="relative space-y-6 border-l border-zinc-800 pl-5">
            {experiences.map((e) => (
              <li key={e.role + e.period} className="relative">
                <span
                  className={`absolute -left-[26px] top-1 h-2.5 w-2.5 rounded-full ${e.current ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]' : 'bg-zinc-600'}`}
                />
                <p className="text-sm font-bold text-white">
                  {e.role}{' '}
                  {e.current && (
                    <span className="ml-2 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                      Atual
                    </span>
                  )}
                </p>
                <p className="text-xs font-medium text-zinc-400">
                  {e.company} · {e.period}
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-[13px] leading-relaxed text-zinc-400">
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <div className="space-y-5">
          <section className="glass p-6">
            <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-white">
              <GraduationCap size={17} className="text-violet-400" /> Educação
            </h3>
            <ul className="space-y-3">
              {education.map((e) => (
                <li
                  key={e.title}
                  className="rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-3.5"
                >
                  <p className="text-sm font-bold text-white">{e.title}</p>
                  <p className="text-xs text-zinc-400">{e.school}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="glass p-6">
            <h3 className="mb-3 text-base font-bold text-white">
              Projetos relevantes
            </h3>
            <ul className="list-disc space-y-2 pl-4 text-[13px] leading-relaxed text-zinc-400">
              {featuredProjects.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </section>

          <section className="glass p-6">
            <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-white">
              <Languages size={17} className="text-amber-300" /> Idiomas
            </h3>
            <p className="text-[13px] leading-relaxed text-zinc-400">
              Português nativo · Inglês avançado (leitura/escrita) e
              intermediário (conversação).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
