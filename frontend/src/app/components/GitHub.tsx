import React from 'react';
import Link from 'next/link';
import { ArrowRight, Github, Star } from 'lucide-react';
import { githubProjects } from '../../../data/githubProjects';
import { SectionHeading, Tags } from './SectionHeading';

export default function GitHubProjetos() {
  return (
    <section className="py-16">
      <SectionHeading
        kicker="Open source"
        title="No GitHub"
        subtitle="Estudos, TCC e projetos que mostram evolução contínua."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {githubProjects.slice(0, 4).map((project, i) => (
          <article
            key={project.id}
            className="glass glass-hover flex flex-col p-5"
            data-aos="fade-up"
            data-aos-delay={i * 80}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800 text-zinc-300">
                <Github size={18} />
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-300">
                <Star size={12} />
                {project.stars}
              </span>
            </div>
            <h3 className="text-base font-bold text-white">{project.title}</h3>
            <p className="mt-1.5 line-clamp-3 flex-1 text-[13px] leading-relaxed text-zinc-400">
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
      <div className="mt-8 flex justify-center">
        <Link href="/pages/projetos" className="btn-ghost">
          Explorar mais
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
