'use client';

import React, { useState } from 'react';
import { Check, Copy, Github, Linkedin } from 'lucide-react';
import { EmailOutlined, WhatsApp } from '@mui/icons-material';
import ContactForm from './ContactForm';
import { SectionHeading } from './SectionHeading';

const EMAIL = 'niceusantos1365@gmail.com';
const WHATSAPP_LINK = `https://wa.me/5579996084047?text=${encodeURIComponent('Olá Niceu! Vi seu portfólio e gostaria de conversar.')}`;

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const socialBtn =
    'inline-flex items-center gap-2 rounded-xl border border-zinc-700/80 bg-zinc-900/60 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-all hover:-translate-y-0.5 hover:border-zinc-500 hover:text-white';

  return (
    <section className="py-16" data-aos="fade-up" id="contato">
      <SectionHeading
        kicker="Contato"
        title="Vamos construir algo juntos?"
        subtitle="Respondo em até 1 dia útil. Prefere outro canal? Use os atalhos abaixo."
      />
      <div className="glass mx-auto grid max-w-4xl gap-8 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h3 className="text-lg font-bold text-white">Canais diretos</h3>
          <p className="mt-1 text-sm text-zinc-400">
            Escolha onde falar comigo — ou envie o formulário ao lado.
          </p>
          <div className="mt-5 flex flex-col gap-2.5">
            <a
              href="https://www.linkedin.com/in/niceu-santos-biriba-1055301b2/"
              target="_blank"
              rel="noopener noreferrer"
              className={socialBtn}
            >
              <Linkedin size={18} className="text-blue-400" />
              LinkedIn
            </a>
            <a
              href="https://github.com/niceusts"
              target="_blank"
              rel="noopener noreferrer"
              className={socialBtn}
            >
              <Github size={18} className="text-zinc-300" />
              GitHub
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={socialBtn}
            >
              <WhatsApp fontSize="small" className="text-emerald-400" />
              WhatsApp · (79) 99608-4047
            </a>
            <button onClick={copyEmail} className={socialBtn}>
              {copied ? (
                <Check size={18} className="text-emerald-400" />
              ) : (
                <Copy size={18} className="text-zinc-400" />
              )}
              {copied ? 'E-mail copiado!' : EMAIL}
            </button>
            <a
              href={`mailto:${EMAIL}`}
              className="text-center text-xs text-zinc-500 underline-offset-4 hover:text-zinc-300 hover:underline"
            >
              ou abrir no app de e-mail <EmailOutlined fontSize="inherit" />
            </a>
          </div>
        </div>
        <div className="border-t border-zinc-800/70 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <h3 className="text-lg font-bold text-white">Envie uma mensagem</h3>
          <p className="mt-1 text-sm text-zinc-400">
            Salva no banco Neon e chega no meu e-mail via Resend.
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
