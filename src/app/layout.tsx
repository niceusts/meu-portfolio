import React from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/app/components/navbar'; // Importa o componente de navegação

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
  title: 'Portifólio - Niceu',
  description: 'Niceu Santos Biriba - Portfólio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <Navbar /> {/* Usa o componente Navbar */}
          {/* Main Content */}
          <main className="flex-grow container mx-auto p-4">{children}</main>
          {/* Footer */}
          <footer className="bg-blue-600 text-white text-center p-2">
            <p>© 2024 Niceu Biriba. Todos os direitos reservados.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
