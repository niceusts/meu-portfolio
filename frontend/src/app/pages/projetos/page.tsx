'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projects as initialProjects } from '../../../../data/projetos';
import { githubProjects } from '../../../../data/githubProjects';
import { fetchProjects, ProjectItem } from '@/lib/api';
import { SectionHeading, Tags } from '@/app/components/SectionHeading';

export default function Projetos() {
  const [items, setItems] = useState<ProjectItem[]>(initialProjects);

  useEffect(() => {
    fetchProjects().then((data) => {
      if (data && data.length > 0) {
        setItems(data);
      }
    });
  }, []);

  return (
    <div className="py-10">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
      >
        <ArrowLeft size={15} /> Voltar
      </Link>
      <SectionHeading
        kicker="Portfólio completo"
        title="Todos os projetos"
        subtitle="Sistemas em produção, cases de arquitetura e estudos open source."
      />

      <h2 className="mb-5 text-lg font-bold text-white">Em produção</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((project, i) => (
          <article
            key={project.id}
            className="glass glass-hover flex flex-col overflow-hidden"
            data-aos="fade-up"
            data-aos-delay={(i % 3) * 80}
          >
            <div className="relative h-44 overflow-hidden">
              <Image
                src={project.imageUrl || '/perfeito.jpg'}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 to-transparent" />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-base font-bold text-white">
                {project.title}
              </h3>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-zinc-400">
                {project.description}
              </p>
              <Tags items={project.tags} />
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={project.link || '#'}
                className="btn-primary mt-5 !py-2 text-[13px]"
              >
                Acessar <ArrowUpRight size={15} />
              </a>
            </div>
          </article>
        ))}
      </div>

      <h2 className="mb-5 mt-12 text-lg font-bold text-white">No GitHub</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {githubProjects.map((project, i) => (
          <article
            key={project.id}
            className="glass glass-hover flex flex-col p-5"
            data-aos="fade-up"
            data-aos-delay={(i % 3) * 80}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-500">
              {project.language}
            </p>
            <h3 className="mt-1 text-base font-bold text-white">
              {project.title}
            </h3>
            <p className="mt-2 flex-1 text-[13px] leading-relaxed text-zinc-400">
              {project.description}
            </p>
            <Tags items={project.tags} />
            <a
              target="_blank"
              href={project.link}
              rel="noopener noreferrer"
              className="btn-ghost mt-5 !py-2 text-[13px]"
            >
              Ver repositório
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
