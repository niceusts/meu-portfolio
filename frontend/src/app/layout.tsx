import React from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
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
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
