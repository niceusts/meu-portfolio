import React from 'react';
import Navbar from '@/app/components/navbar';

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <Navbar />
      <main className="relative mx-auto w-full max-w-6xl flex-grow px-4 pb-16 text-zinc-100 sm:px-6">
        {children}
      </main>
      <footer className="relative border-t border-zinc-800/80 bg-zinc-950/80 py-6 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 text-center text-xs text-zinc-500 sm:flex-row sm:px-6 sm:text-left">
          <p>
            © 2026 Niceu Santos Biriba Oliveira. Todos os direitos reservados.
          </p>
          <p className="text-zinc-600">
            C#/.NET 9 · Node.js · Next.js · PostgreSQL · Azure
          </p>
        </div>
      </footer>
    </div>
  );
}
