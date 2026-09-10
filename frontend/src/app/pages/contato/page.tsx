import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ContactSection from '@/app/components/ContactSection';

export default function ContatoPage() {
  return (
    <div className="py-10">
      <Link
        href="/"
        className="mb-2 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
      >
        <ArrowLeft size={15} /> Voltar
      </Link>
      <ContactSection />
    </div>
  );
}
