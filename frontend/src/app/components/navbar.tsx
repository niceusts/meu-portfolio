'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/pages/projetos', label: 'Projetos' },
  { href: '/pages/habilidades', label: 'Habilidades' },
  { href: '/pages/curriculo', label: 'Currículo' },
  { href: '/pages/contato', label: 'Contato' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-40">
      <header className="border-b border-zinc-800/70 bg-zinc-950/70 backdrop-blur-xl">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-sm font-black text-white shadow-[0_8px_30px_-8px_rgba(59,130,246,0.8)]">
              NB
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold text-white">
                Niceu Biriba
              </span>
              <span className="block text-[11px] font-medium text-zinc-400">
                Full Stack Engineer
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    pathname === l.href
                      ? 'bg-zinc-800/80 text-white'
                      : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="ml-2">
              <Link
                href="/pages/contato"
                className="btn-primary !px-4 !py-2 text-[13px]"
              >
                Fale comigo
                <ArrowUpRight size={15} />
              </Link>
            </li>
          </ul>

          <button
            aria-label="Abrir menu"
            className="rounded-lg border border-zinc-800 p-2 text-zinc-200 md:hidden"
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {isMenuOpen && (
          <ul className="space-y-1 border-t border-zinc-800/70 px-4 py-3 md:hidden">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${
                    pathname === l.href
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-300 hover:bg-zinc-800/60'
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-1">
              <Link
                href="/pages/contato"
                onClick={() => setIsMenuOpen(false)}
                className="btn-primary w-full"
              >
                Fale comigo
                <ArrowUpRight size={15} />
              </Link>
            </li>
          </ul>
        )}
      </header>
    </div>
  );
}
