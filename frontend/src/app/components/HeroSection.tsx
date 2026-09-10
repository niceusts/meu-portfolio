'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Download, MapPin } from 'lucide-react';
import { fetchSettings } from '@/lib/api';

const metrics = [
  { value: '+4 anos', label: 'Prefeitura de Estância' },
  { value: 'Full Stack', label: 'C#/.NET + Node + Next' },
  { value: 'SaaS', label: 'Multi-tenant + RBAC' },
];

const DEFAULT_PHOTO = '/perfil.JPG';

export default function HeroSection() {
  const [photo, setPhoto] = useState(DEFAULT_PHOTO);

  useEffect(() => {
    fetchSettings().then((s) => {
      if (s.hero_photo_url) setPhoto(s.hero_photo_url);
    });
  }, []);

  return (
    <section className="relative overflow-hidden pt-14" data-aos="fade-up">
      <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Disponível para projetos e oportunidades
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-zinc-400">
            Niceu Santos Biriba Oliveira
          </p>
          <h1 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Engenheiro de Software{' '}
            <span className="text-gradient">Full Stack</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
            Bacharel em Sistemas de Informação (UFS) com +4 anos construindo
            sistemas críticos no setor público — de arquiteturas monolíticas em{' '}
            <strong className="font-semibold text-zinc-200">C#/.NET 9</strong> a
            ecossistemas modernos em{' '}
            <strong className="font-semibold text-zinc-200">
              TypeScript, Fastify, Prisma e Next.js
            </strong>
            , incluindo SaaS multi-tenant com RBAC.
          </p>

          <div className="mt-4 flex items-center gap-2 text-sm text-zinc-500">
            <MapPin size={15} />
            Estância, Sergipe · Remoto / Híbrido
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/pages/contato" className="btn-primary">
              Fale comigo
              <ArrowRight size={16} />
            </Link>
            <a href="/curriculo.pdf" download className="btn-ghost">
              <Download size={16} />
              Baixar CV
            </a>
            <Link href="/pages/projetos" className="btn-ghost">
              Ver projetos
            </Link>
          </div>

          <dl className="mt-9 grid max-w-xl grid-cols-3 gap-3">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="glass px-4 py-3.5 text-center sm:text-left"
              >
                <dt className="order-2 mt-1 block text-[11px] font-medium leading-tight text-zinc-500">
                  {m.label}
                </dt>
                <dd className="order-1 text-lg font-bold text-white">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-[320px]">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-blue-600/30 via-indigo-600/20 to-violet-600/30 blur-2xl" />
          <div className="glass relative overflow-hidden p-2.5">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src={photo}
                alt="Foto de Niceu Santos Biriba Oliveira"
                width={640}
                height={760}
                priority
                className="h-auto w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent p-4 pt-10">
                <p className="text-sm font-bold text-white">Niceu Biriba</p>
                <p className="text-xs text-zinc-300">
                  C# · .NET · Node · Next · Azure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
