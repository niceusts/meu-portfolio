import React from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/app/components/navbar';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Niceu Biriba — Engenheiro de Software Full Stack',
  description:
    'Portfólio de Niceu Santos Biriba Oliveira: Full Stack com C#/.NET 9, Node.js, Fastify, Prisma, Next.js. SaaS multi-tenant, RBAC, Azure DevOps.',
  metadataBase: new URL('https://meu-portfolio-flame-eta.vercel.app'),
  openGraph: {
    title: 'Niceu Biriba — Engenheiro de Software Full Stack',
    description:
      'SaaS multi-tenant, .NET 9, Node.js, Next.js. +4 anos construindo sistemas críticos no setor público.',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative flex min-h-screen flex-col">
          <div className="bg-grid pointer-events-none absolute inset-0" />
          <Navbar />
          <main className="relative mx-auto w-full max-w-6xl flex-grow px-4 pb-16 text-zinc-100 sm:px-6">
            {children}
          </main>
          <footer className="relative border-t border-zinc-800/80 bg-zinc-950/80 py-6 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 text-center text-xs text-zinc-500 sm:flex-row sm:px-6 sm:text-left">
              <p>
                © 2026 Niceu Santos Biriba Oliveira. Todos os direitos
                reservados.
              </p>
              <p className="text-zinc-600">
                C#/.NET 9 · Node.js · Next.js · PostgreSQL · Azure
              </p>
            </div>
          </footer>
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
