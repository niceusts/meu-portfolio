'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  Briefcase,
  FolderKanban,
  Inbox,
  LayoutDashboard,
  LogOut,
  Zap,
} from 'lucide-react';

const nav = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projetos', label: 'Projetos', icon: FolderKanban },
  { href: '/admin/skills', label: 'Skills', icon: Zap },
  { href: '/admin/experiencias', label: 'Experiências', icon: Briefcase },
  { href: '/admin/mensagens', label: 'Mensagens', icon: Inbox },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== '/admin' && !localStorage.getItem('admin_secret')) {
      router.push('/admin');
    }
  }, [pathname, router]);

  function handleLogout() {
    localStorage.removeItem('admin_secret');
    router.push('/admin');
  }

  if (pathname === '/admin') return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      {/* Sidebar desktop */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-zinc-800/80 bg-zinc-900/40 p-4 md:flex">
        <Link
          href="/admin/dashboard"
          className="mb-6 flex items-center gap-2.5 px-1"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-sm font-black text-white">
            NB
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold text-white">
              Admin Panel
            </span>
            <span className="block text-[11px] text-zinc-500">
              Gerenciador do portfólio
            </span>
          </span>
        </Link>

        <nav className="flex flex-col gap-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? 'bg-blue-600/15 text-white ring-1 ring-inset ring-blue-500/40'
                    : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-white'
                }`}
              >
                <Icon size={17} className={active ? 'text-blue-400' : ''} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
          <Link
            href="/"
            className="text-xs font-medium text-zinc-400 hover:text-white"
          >
            ← Ver site público
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
        >
          <LogOut size={17} />
          Sair
        </button>
      </aside>

      {/* Coluna principal */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar mobile */}
        <header className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur md:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm font-bold text-white">Admin Panel</span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 px-2.5 py-1.5 text-xs font-medium text-red-400"
            >
              <LogOut size={14} />
              Sair
            </button>
          </div>
          <nav className="flex gap-1 overflow-x-auto px-4 pb-3">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium ${
                    active
                      ? 'bg-blue-600/15 text-white ring-1 ring-inset ring-blue-500/40'
                      : 'text-zinc-400 hover:bg-zinc-800/60'
                  }`}
                >
                  <Icon size={14} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
