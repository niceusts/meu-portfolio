'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Briefcase,
  FolderKanban,
  Inbox,
  Zap,
} from 'lucide-react';
import {
  getProjects,
  getSkills,
  getExperiences,
  getMessages,
} from '@/lib/admin-api';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    experiences: 0,
    messages: 0,
    unread: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProjects(), getSkills(), getExperiences(), getMessages()])
      .then(([projects, skills, experiences, messages]) => {
        setStats({
          projects: projects.length,
          skills: skills.length,
          experiences: experiences.length,
          messages: messages.length,
          unread: messages.filter((m: any) => !m.read).length,
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    {
      label: 'Projetos',
      value: stats.projects,
      hint: 'itens no portfólio',
      href: '/admin/projetos',
      icon: FolderKanban,
      accent: 'text-blue-400 bg-blue-500/10 border-blue-500/25',
    },
    {
      label: 'Skills',
      value: stats.skills,
      hint: 'na stack',
      href: '/admin/skills',
      icon: Zap,
      accent: 'text-amber-300 bg-amber-500/10 border-amber-500/25',
    },
    {
      label: 'Experiências',
      value: stats.experiences,
      hint: 'no currículo',
      href: '/admin/experiencias',
      icon: Briefcase,
      accent: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/25',
    },
    {
      label: 'Mensagens',
      value: stats.messages,
      hint: `${stats.unread} não ${stats.unread === 1 ? 'lida' : 'lidas'}`,
      href: '/admin/mensagens',
      icon: Inbox,
      accent: 'text-violet-300 bg-violet-500/10 border-violet-500/25',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      <p className="mt-1 text-sm text-zinc-500">
        Visão geral do conteúdo do portfólio.
      </p>

      {loading ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="glass h-36 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.label}
                href={card.href}
                className="glass glass-hover group p-5"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border ${card.accent}`}
                  >
                    <Icon size={19} />
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-zinc-600 transition group-hover:text-zinc-300"
                  />
                </div>
                <p className="mt-4 text-3xl font-extrabold text-white">
                  {card.value}
                </p>
                <p className="mt-1 text-sm font-medium text-zinc-400">
                  {card.label}
                  <span className="text-zinc-600"> · {card.hint}</span>
                </p>
              </Link>
            );
          })}
        </div>
      )}

      {stats.unread > 0 && (
        <Link
          href="/admin/mensagens"
          className="mt-4 flex items-center gap-3 rounded-2xl border border-amber-500/25 bg-amber-500/10 p-4 text-sm text-amber-200 transition hover:bg-amber-500/15"
        >
          <Inbox size={18} />
          Você tem {stats.unread} mensagem(ns) não lida(s). Ver agora
          <ArrowUpRight size={15} />
        </Link>
      )}
    </div>
  );
}
