import React from 'react';
import Link from 'next/link';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import { skills } from '../../data/skills';
import { SectionHeading } from './SectionHeading';

export default function HabilitySection() {
  return (
    <section className="py-16">
      <SectionHeading
        kicker="Stack"
        title="Habilidades por pilar"
        subtitle="O que eu entrego de ponta a ponta: do requisito ao deploy."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((skill, i) => (
          <div
            key={skill.id}
            className="glass glass-hover p-5"
            data-aos="fade-up"
            data-aos-delay={i * 80}
          >
            <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/30 to-violet-600/30 text-blue-300">
              <BadgeCheck size={20} />
            </span>
            <h3 className="text-base font-bold text-white">{skill.title}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-400">
              {skill.desc}
            </p>
            <p className="mt-4 inline-flex rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
              {skill.level}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link href="/pages/habilidades" className="btn-ghost">
          Detalhar stack
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
