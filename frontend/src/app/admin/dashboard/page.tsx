'use client';
import { useEffect, useState } from 'react';
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
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    {
      label: 'Projetos',
      value: stats.projects,
      href: '/admin/projetos',
      icon: '🗂️',
      color: 'blue',
    },
    {
      label: 'Skills',
      value: stats.skills,
      href: '/admin/skills',
      icon: '⚡',
      color: 'yellow',
    },
    {
      label: 'Experiências',
      value: stats.experiences,
      href: '/admin/experiencias',
      icon: '💼',
      color: 'green',
    },
    {
      label: 'Mensagens',
      value: `${stats.messages} (${stats.unread} não lidas)`,
      href: '/admin/mensagens',
      icon: '📬',
      color: 'purple',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-400 mb-8">
        Bem-vindo ao painel de administração do portfolio.
      </p>

      {loading ? (
        <p className="text-gray-400">Carregando...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card) => (
            <a
              key={card.label}
              href={card.href}
              className="bg-gray-900 rounded-2xl p-6 hover:bg-gray-800 transition flex flex-col gap-2"
            >
              <span className="text-3xl">{card.icon}</span>
              <span className="text-gray-400 text-sm">{card.label}</span>
              <span className="text-2xl font-bold">{card.value}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
