import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { projects as initialProjects } from '../../data/projetos';
import { fetchProjects, ProjectItem } from '@/lib/api';
import { SectionHeading, Tags } from './SectionHeading';

export default function ProjectSection() {
  const [items, setItems] = useState<ProjectItem[]>(initialProjects);

  useEffect(() => {
    fetchProjects().then((data) => {
      if (data && data.length > 0) {
        setItems(data);
      }
    });
  }, []);

  return (
    <section className="py-16">
      <SectionHeading
        kicker="Portfólio"
        title="Projetos em destaque"
        subtitle="Cases reais em produção no setor público e arquiteturas modernas multi-tenant."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.slice(0, 4).map((project, i) => (
          <article
            key={project.id}
            className="glass glass-hover flex flex-col overflow-hidden"
            data-aos="fade-up"
            data-aos-delay={i * 80}
          >
            <div className="relative h-40 overflow-hidden">
              <Image
                src={project.imageUrl || '/perfeito.jpg'}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 to-transparent" />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-base font-bold leading-snug text-white">
                {project.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-zinc-400">
                {project.description}
              </p>
              <Tags items={project.tags.slice(0, 4)} />
              <a
                target="_blank"
                href={project.link || '#'}
                rel="noopener noreferrer"
                className="btn-primary mt-5 !py-2 text-[13px]"
              >
                Acessar
                <ArrowUpRight size={15} />
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link href="/pages/projetos" className="btn-ghost">
          Ver todos os projetos
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
