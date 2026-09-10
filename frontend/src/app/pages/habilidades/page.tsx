import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BadgeCheck } from 'lucide-react';
import { habilidades } from '../../../../data/habilidades';
import { SectionHeading } from '@/app/components/SectionHeading';

const groups: {
  key: keyof typeof habilidades;
  title: string;
  desc: string;
}[] = [
  {
    key: 'backend',
    title: 'Back-end & APIs',
    desc: 'Regras de negócio, auth e integrações',
  },
  {
    key: 'frontend',
    title: 'Front-end & Mobile',
    desc: 'Interfaces rápidas, acessíveis e bonitas',
  },
  {
    key: 'database',
    title: 'Bancos de dados',
    desc: 'Modelagem e performance de queries',
  },
  {
    key: 'devops',
    title: 'Arquitetura & DevOps',
    desc: 'Escala, qualidade e entrega contínua',
  },
];

export default function Habilidades() {
  return (
    <div className="py-10">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
      >
        <ArrowLeft size={15} /> Voltar
      </Link>
      <SectionHeading
        kicker="Stack técnica"
        title="Habilidades"
        subtitle="Nível por contexto de uso real em produção — sem porcentagem vazia."
      />
      {groups.map((g) => (
        <section key={g.key} className="mb-9">
          <h2 className="mb-1 text-lg font-bold text-white">{g.title}</h2>
          <p className="mb-4 text-sm text-zinc-500">{g.desc}</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {habilidades[g.key].map((s, i) => (
              <div
                key={s.id}
                className="glass glass-hover p-5"
                data-aos="fade-up"
                data-aos-delay={(i % 4) * 70}
              >
                <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/15 text-blue-300">
                  <BadgeCheck size={18} />
                </span>
                <h3 className="text-sm font-bold text-white">{s.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                  {s.desc}
                </p>
                <p className="mt-3 inline-flex rounded-full border border-blue-500/25 bg-blue-500/10 px-2.5 py-1 text-[11px] font-semibold text-blue-300">
                  {s.level}
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
